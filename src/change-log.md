---
title: WebPageTest Change Log
eleventyNavigation:
  key: WebPageTest Change Log
  order: 999
---
# WebPageTest Change Log
## September, 2021
- **September 17** Instead of exposing the Net Priority for requests, we now [map that back to Chrome's Dev Tools priorities.](https://github.com/WPO-Foundation/wptagent/pull/431)
- **September 16** The custom waterfall page has been refreshed to provide better visual hierarchy and update the [waterfall dynamically as you make adjustments](https://twitter.com/scottjehl/status/1438579832129007629).
## August, 2021
- **August 30** WebPageTest now provides an "experiments" tab in the resource dialog to make it
[easier to test the performance impact of requests on WebPageTest](https://twitter.com/tkadlec/status/1432380417286578187)
- **August 16** The API now provides a [test balance endpoint](https://docs.webpagetest.org/api/reference/#checking-remaining-test-balance) to programmatically check your remaining API balance for the current billing period.
- **August 10** All EC2 instances of the WebPageTest testing agents now use [static IP addresses](https://twitter.com/tkadlec/status/1425184088147832836).
## July, 2021
- **July 20** Any [render blocking resources are now indicated in the Waterfall with an orange icon](https://twitter.com/tkadlec/status/1417543014705246214), making it easier to zero-in on one of the most common performance bottlenecks.
- **July 13** [The waterfalls now treat HTTPS as the default experience instead of HTTP.](https://twitter.com/tkadlec/status/1414973621517406210) This means HTTPS requests no longer show a lock icon. Instead, HTTP requests are actively marked as insecure, cleaning up the waterfall and making it easier to spot insecure requests at a glance.
- **July 1** WebPageTest now has an option [to use Chrome's built-in traffic shaping](https://twitter.com/patmeenan/status/1410676572596678657) instead of the packet-level network shaping it normally uses. (Not recommended for normal testing.)
## June, 2021
- **June 30** The visual comparison page now has a [compare all runs button](https://twitter.com/tkadlec/status/1410344917113659397) that makes it easier to quickly see all runs of a given test so you can investigate variability.
- **June 30** We added a new [Web Vitals test](https://www.webpagetest.org/webvitals). It provides all the same level detailed results as a normal test, but the form is greatly simplified and lands directly on the core web vitals diganostics page.
- **June 1** If an image or background image triggers Largest Contentful Paint, the [vitals page will now auto-highlight the request in the waterfall](https://twitter.com/tkadlec/status/1399846310933585924) and display the image at full size to make it more obvious. The Total Blocking Time of the page now also shows the origins with the largest scripting-related CPU time and provides a quick link to the Chrome Developer Tools timeline for the test.
## May, 2021
- **May 25:** Recalibrated the mobile CPU emulation throttling (Most devices needed around twice as much throttling).
- **May 24:** Updated the [Wappalyzer](https://www.wappalyzer.com/) engine and detections to the latest.
- **May 24:** [%ORIGIN% can be used in your scripts](/scripting/#%25origin%25).
- **May 19:** Fixed an issue where video capture may have terminated prematurely (at 30 seconds). Particularly noticeable when running SPOF comparison tests.
- **May 17:** WebPageTest custom metrics now can access the [full accessibility tree in Chromium-based browsers using the $WPT_ACCESSIBILITY_TREE placeholder](https://twitter.com/patmeenan/status/1394303297931157506). 
- **May 13:** The Cumulative Layout Shift section of the core web vitals page [lets you hover over a thumbnail to see what content is moving and why](https://twitter.com/patmeenan/status/1392906405036888064).
- **May 5:** WebPageTest now has a [core web vitals diagnostics page](https://twitter.com/patmeenan/status/1390030084543811586) to help debug your core web vitals by exposing additional context and providing focused visualizations.
- **May 3:** The plot full results page now allows folks to force the graphs to start at zero ([issue #1485](https://github.com/WPO-Foundation/webpagetest/issues/1485)) to help normalize for comparison ([here's an example](https://www.webpagetest.org/graph_page_data.php?tests=210329_XiBZ_82b5bf1bae2119591621a677202ecfda-l%3A3PL%2C210329_Xi4A_0679d30b2dc8de471d1cade9f793183c-l%3A2.5PL%2C210329_XiKN_d329ef9e13a07bcd4bbca866777375fb-l%3A1.5PL%2C210329_Xi4C_ad8e2d4857cb143b85748b8e0ec6a8d2-l%3A1PL%2C210329_Xi3T_3e9b78ff5114579915f521df5d10045e-l%3A0PL&medianMetric=LoadTime&fv=1&zero_start=true&control=4)). We also now show metric tables for all tests on the graph results page, not just the first test ([issue #1484](https://github.com/WPO-Foundation/webpagetest/issues/1484)).

## April, 2021
- **April 30:** WebPageTest now defaults to using the `https` protocol if the protocol is left off a test URL.
- **April 15:** The mobile emulation devices are now also [available directly in the browser dropdown](https://twitter.com/patmeenan/status/1382790307956264963) for any locations that support testing with Chrome. It will use Chrome stable for the emulation. Emulating mobile with beta or canary is still possible by manually selecting the emulation options in the Chromium tab of advanced settings.
- **April 14:** Cumulative Layout Shift [was updated to use](https://twitter.com/patmeenan/status/1382439517328715777) the new windowed approach. The [filmstrip also now shows layout window scores](https://twitter.com/tkadlec/status/1382440917186002945), and additional context is available in the JSON. [PR #1478](https://github.com/WPO-Foundation/webpagetest/pull/1478)
- **April 9:** [WebPageTest test results now pull in URL-specific field data from Chrome User Experience Report](https://twitter.com/patmeenan/status/1380514866390269952)
- **April 6:** [WebPageTest moved to a new account management system](https://twitter.com/patmeenan/status/1380514866390269952). The enhanced and fully supported [WebPageTest API](https://product.webpagetest.org/api?utm_source=docs&utm_medium=docs&utm_campaign=changelog&utm_content=api) was [released to general availability](https://blog.webpagetest.org/posts/the-webpagetest-api-has-gone-public/).

## March, 2021
- **March 23, 2021:** The default desktop browser size was [changed from 1024x768 to 1376x768](https://twitter.com/patmeenan/status/1374444703962132490). A dropdown was added to choose from a number of other resolution sizes.
- **March 22, 2021:** First Contentful Paint, Largest Contentful Paint and Layout Shifts were [added to the WebPageTest waterfall](https://twitter.com/patmeenan/status/1374043494789038080)
- **March 22, 2021:** A new interface [for WebPageTest.org](https://twitter.com/patmeenan/status/1374016216709357571) was released

## February, 2021
- **February 15, 2021:** When test agents are terminated (during OS shutdown for example), re-queue the test they are working on for another agent to test. This helps with support for autoscaling cloud agents so jobs are not lost when agents are terminated.

## January, 2021
- **January 28, 2021:** Added support for [testing Safari with the iOS simulator](https://twitter.com/patmeenan/status/1354875525727211522) on Intel and Apple silicon Macs.
- **January 25, 2021:** Added test options for [disabling AVIF and WebP support in Chrome](https://twitter.com/TheRealNooshu/status/1353780078791032832) for testing impact of the new formats on performance.
- **January 21, 2021:** Added an option to [enable the V8 sampling profiler](https://twitter.com/patmeenan/status/1352434691740213260) for much richer JavaScript stack traces.
- **January 6, 2021:** Added [Largest Contentful Paint](https://twitter.com/patmeenan/status/1346941018227187716) visualizations to the filmstrip view.

## December, 2020
- **December 12, 2020:** Changed video rendering to be [done on the fly](https://twitter.com/patmeenan/status/1337805490340966404) and added support for generating animated Gifs.

## November, 2020
- **November 30, 2020:** Added [layout shift visualizations](https://twitter.com/TheRealNooshu/status/1333525160259891207) to the filmstrip view.
- **November 25, 2020:** Updated the [JavaScript execution visualization](https://twitter.com/patmeenan/status/1331625445104754688) in the waterfall to better represent frequent but short events.
- **November 13, 2020:** Added support for [testing WebKit on Linux.](https://twitter.com/patmeenan/status/1327277663891894273)
- **November 4, 2020:** Mobile emulation user agent strings were changed to [always be up to date](https://twitter.com/patmeenan/status/1324145162776420353) with the version of Chrome that they are running on.