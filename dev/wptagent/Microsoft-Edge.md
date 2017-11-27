# Microsoft Edge Agent Design
The WebPageTest agent ([wptagent](https://github.com/WPO-Foundation/wptagent)) needs to be able to do several things to automate and measure performance:
1. [Launch the browser with (optionally) a clean profile (cache, cookies, etc).](#high-level-design)
1. [Automate navigating to pages.](#page-navigation)
1. [Run Javascript in the context of the page and get the output.](#executing-javascript)
1. [Monitor the page load status and network activity.](monitoring-activity)
1. [Get detailed timing information and headers for all network requests.](request-information)
1. [Retrieve response bodies for all network requests (for optimization checks).](response-bodies)
1. [Record video of the browser viewport.](video-capture)
1. [Intercept outbound network requests to block or modify headers.](request-interception)
1. [Monitor the browser main thread interactivity.](main-thread-interactivity)

## High-level design
wptagent uses [webdriver](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/) to drive the browser. It uses [ETW](https://msdn.microsoft.com/en-us/library/windows/desktop/aa363668(v=vs.85).aspx) events captured in realtime by [wpt-etw](https://github.com/WPO-Foundation/wpt-etw) for monitoring activity, getting request details and response bodies.  For request interception and monitoring of the main thread it uses an [extension](https://github.com/WPO-Foundation/wptagent/tree/master/internal/support/edge/extension).

{insert overview diagram}

# Browser Launch
wptagent clears the cache (for first view tests) by deleting the following folders under ```%LOCALAPPDATA%\Packages\Microsoft.MicrosoftEdge_8wekyb3d8bbwe```:
* ```AC\#!*``` (all folders starting with ```#!``` in the AC directory)
* ```AC\MicrosoftEdge\Cookies```
* ```AppData```

wptagent ships with the binaries for webdriver for all released versions of Edge (each build needs to be paired with the matching webdriver server) and should auto detect which is needed for the currently version of Windows 10. If there is a MicrosoftWebDriver.exe file in internal\support\edge\current it will use that instead of auto detecting one of the installed versions.

Webdriver is used to launch the browser with the [wptagent extension sideloaded](https://docs.microsoft.com/en-us/microsoft-edge/extensions/guides/packaging/creating-and-testing-extension-packages#automated-testing-with-webdriver).  This requires copying the extension to the Edge %LOCALAPPDATA% directory as it will only run sideloaded extensions from there.

The browser is moved to 0,0 and the widow dimensions are also set through webdriver to match whatever is requested by the testing.

After launching the browser, wptagent starts wpt-etw to monitor the browser activity and passes it a directory path for storing response bodies.  After the browser is launched wptagent waits to get a message from wpt-etw indicating that it started before continuing.

Finally, wptagent also waits for the cpu utilization to drop below 20% of any individual core for 500ms to let the browser finish initializing and go idle before starting testing.

# Page Navigation
Navigation is done through webdriver by executing javascript that sets the window.location to the desired URL.  This allows for initiating the page load but not waiting for it to complete before returning.  Using the webdriver ```get``` function is a blocking operation that waits for the page load to finish before returning, limiting the flexibility of the agent.

# Executing Javascript
Javascript execution is done using the existing webdriver support, both for metrics collection and multi-step scripts.

# Monitoring Activity
Live updates from Edge for page navigation status and request activity is probably the most complicated piece of the architecture (and had the most false-starts).

wptagent uses an external app ([wpt-etw](https://github.com/WPO-Foundation/wpt-etw)) that runs in an elevated session to monitor ETW (Event Trace for Windows) events emitted by the Edge engine (WinInet and MSHtml specifically).  wpt-etw filters the trace events for the ones of interest and batches them up in 100ms bundles of events.  The event bundles are then POSTed to the http server running in wptagent (at http://127.0.0.1:8888/) as a JSON array of trace events.  The trace events trigger activity updates in the wptagent activity monitoring code and wptagent watches for the page load notifications to know when navigation is complete.

There is the potential for some additional buffering as the Windows kernel buffers trace events internally but it is not an issue in practice.  The kernel buffering is for a maximum of 3 seconds but when activity is ongoing there are enough events generated that in practice it is delayed for a much shorter period (and timely delivery within a few seconds is not critical to wptagent operation since the individual events are timestamped).

{insert etw diagram}

## Failed design #1 - extension direct to wptagent
The initial plan for detecting the browser activity for Microsoft Edge was to use the same architecture as the Firefox agent where an extension listens to [webNavigation](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/webNavigation) and [webRequest](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/webRequest) events and forwards them to wptagent using fetch to POST the data to http://127.0.0.1:8888/.

It turns out that Edge blocks all local network activity from extensions making it impossible to fetch to localhost (or even to a local server on the same network).

## Failed design #2 - extension to native messaging bridge
Building on Failed Design #1, for localhost communications Edge requires using [native messaging](https://docs.microsoft.com/en-us/microsoft-edge/extensions/guides/native-messaging).  This requires building a UWP app for the extension to talk to and the plan was to have an app that proxies the data to the http server on http://127.0.0.1:8888/ (turning native messaging messages into http POST messages).

It turns out that native messaging is locked down so the extension has to be bundled with the app that it talks to.  Unfortunately there is no way to sideload a bundled extension because they do not run in the Edge %LOCALAPPDATA% directory and there is no way to install a UWP app there making it impossible to communicate locally from a sideloaded extension.

Running the browser from a webdriver session starts with a clean profile and doesn't load installed extensions so there is also no way to load a bundled/installed extension in a webdriver session.

# Request Information
The request timing and headers are parsed out of the ETW events from wpt-etw.  Initial implementations recorded the data using xperf and post-processed it after the test but with the ability to filter and process events in realtime using wpt-etw they can now be filtered and processed live (much faster).

The event processing depends on parsing fields out of the trace messages and they are subject to change as development on Edge (or IE) continue making it the most fragile piece of the architecture (though in practice it has been quite stable).

The WinInet events in particular are not parsed correctly automatically so a good number of them are hand-processed in the code from the underlying buffers (mostly anything involving strings - DNS and request/response headers in particular).

# Response Bodies
WinInet will log the raw byte streams (post transfer-encodeing which WinInet strips out automatically) if the ```Microsoft-Windows-WinInet-Capture``` ETW category is enabled.  To minimize overhead the response bodies are processed by wpt-etw directly and written to disk in a directory provided by wptagent.  Each request is written to a file that is named based on it's request ID so they can be matched-up by wptagent when the post-processing optimization checks are done (or gathered and sent back to the server if the test requires keeping the response bodies).

The response bodies are streamed to disk as they come in. WinInet also streams the raw request and response headers but those are ignored and only the response body bytes are streamed to disk (which is consistent with how wptagent processes bodies for other browsers).

{insert etw bodies diagram}

# Video Capture
Video capture is done using the same video capture support in wptagent used for all desktop browsers (to make apples-to-apples comparisons possible).  Specifically it uses ffmpeg with gdigrab to record the region of the desktop where the browser window was placed (using webdriver).  ffmpeg is configured to record as a x264rgb video with ultrafast settings and highest quality to minimize the amount of overhead on the system from video capture.  By default it will record at 10fps but can be configured using the --fps command-line option or on a per-test basis.

To ensure that video capture has started before the testing is started the size of the video file is monitored and once it exceeds 10KB the testing is started.  If this step is skipped it is quite possible (and likely) that the video capture will start capturing after the start of the test.

To synchronize the video with the measured activity an orange overlay is placed on the page before ffmpeg recording is started (a solid-color div positioned over the page contents, even if starting from a blank page).  Immediately before navigation the div is removed and in post-processing the orange frames are removed from the captured video so the video frames ane navigation both start at the same point.  The same overlay is used for multi-step scripts and is placed over the existing page before each step.  The overlays are written into the page using the script execution support exposed by webdriver.

{insert orange page screen shot and video capture diagram}

# Request Interception
wptagent uses an extension with blocking webRequest listeners to intercept any requests that need to be blocked or modified.  The listeners are only installed if they are going to be needed.  The difficult part lies in communicating the configuration data to the extension since the extension can not communicate directly with wptagent.

As part of the startup, wptagent uses webdriver to load http://127.0.0.1:8888/config.html which is a locally-served page that has the configuration data for the request interception encoded as json in a hidden div with a well-known ID.  The extension has a content script ([config-script.js](https://github.com/WPO-Foundation/wptagent/blob/master/internal/support/edge/extension/config-script.js)) that is configured to run after that specific page has been loaded.  The content script extracts the JSON config data from the DOM and sends it to the extension's background page where it is processed.

The background page builds a list of modifications that are necessary and installs webRequest listeners if needed.

{insert config diagram}

# Main Thread Interactivity
To measure the responsiveness of the browser's main thread wptagent uses a content script ([long-tasks.js](https://github.com/WPO-Foundation/wptagent/blob/master/internal/support/edge/extension/long-tasks.js)) that attaches to every page load as soon as possible (at document_start).

The content script posts a series of requestAnimationFrame calls and measures whenever it takes more than 50ms and builds a list of the "long tasks".

Content scripts run in an isolated sandbox from the page (and from webdriver) so communicating the long tasks back to wptagent involves a few hoops:
* The content script installs a message handler and watches for a message ```{wptagent: "GetInteractivePeriods"}```.
* When the message is received the long tasks are processed and converted into idle periods (inverted basically).
* The idle periods are encoded as JSON and written into a hidden DOM element with a well-known ID.
* At the end of the test when it needs to collect the interactive periods, wptagent executes a script that posts the message to the content script and it polls the DOM waiting for the hidden DOM element to be written and extracts the timing data from it when it is available.

{insert interactive periods diagram}

# Known Issues
## Cookie Clearing
The Fall Creators Update of Windows 10 introduced a change where Edge uses a centralized cookie store that is not cleared either by using the IE clearing logic or in any of the Edge-specific application directories so cookies currently persist.  Using an extension to clear them also doesn't work as there is no way to enumerate all cookies in Edge.
