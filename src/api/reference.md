---
title: 'WebPageTest API Reference'
eleventyNavigation:
  key: Reference
  parent: API
  order: 1
---
# WebPageTest REST API
The WebPageTest [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) API provides a way for you to programatically interact with WebPageTest and all of its functionality, enabling you to integrate WebPageTest data into your existing processes and workflows in the way that best suits your needs.

::: note
The [official Node.js WebPageTest API wrapper](https://github.com/marcelduran/webpagetest-api)—built by Marcel Duran—provides a convenient NodeJS interface for the API and also exposes handy a <abbr title="Command Line Interface">CLI</abbr>.
:::

## Authentication
The WebPageTest API uses API keys to authenticate all tests submitted to the public WebPageTest testing agents.

::: note
API keys may or may not be required for requests made to any [private instances](/private-instances/) you maintain on your own. Check with the administrator of your private instance to verify.
:::

You can pass your API key along with tests requests by using the `k` parameter.

```text
https://www.webpagetest.org/runtest.php?url={your_domain}&k={your_api_key}
```

::: warning
Your API keys are directly tied to your account, so be sure to keep them secure. Avoid sharing them in any public area, such as GitHub or client-side code.
:::
## Status Codes
The WebPageTest API uses HTTP response codes in the `statusCode` property of return objects to indicate whether an API request was sucessful or failed. Codes in the `1xx` range indicate that the requested test is not yet ready. Codes in the `4xx` range indicate there was an error with the requested test. A status code of `200` indicates a successful test run.

| Status Code | Description                    |
|-------------|:-------------------------------|
| 100         | Test started                   |
| 101         | Test is in the queue           |
| 102         | The test server is unreachable |
| 200         | The test is complete           |
| 400         | A test with the `testId` passed was not found |
| 401         | The `testId` is valid, but no test was found in the work queue |
| 402         | The test with the `testId` passed was cancelled |

## Running a Test
To submit a test to the WebPageTest agents, you submit either a POST or GET request to the https://www.webpagetest.org/runtest.php endpoint, along with your API key, the URL you want to test and any optional parameters to configure your how the test is run and what data it will return when completed.

### Response Format
By default, after a successful request to the /runtest.php endpoint, you will be redirected to the results page.

You can optionally set the response format using the `f` parameter to return either an XML response (`f=xml`) or JSON response (`f=json`).

```text
//this will result in a redirect
https://www.webpagetest.org/runtest.php?url={your_domain}&k={your_api_key}

//this will return an XML response
https://www.webpagetest.org/runtest.php?url={your_domain}&k={your_api_key}&f=xml

//this will return a JSON response
https://www.webpagetest.org/runtest.php?url={your_domain}&k={your_api_key}&f=json
```

Here's an example response when the format parameter is provided to the endpoint:

::: code-tabs
```json
{
	"statusCode": 200,
	"statusText": "Ok",
	"data": {
		"testId": "210304_Ai8T_b21a9c202a106632afd2c6485bda4211",
		"jsonUrl": "https://www.webpagetest.org/jsonResult.php?test=210304_Ai8T_b21a9c202a106632afd2c6485bda4211",
		"xmlUrl": "https://www.webpagetest.org/xmlResult/210304_Ai8T_b21a9c202a106632afd2c6485bda4211/",
		"userUrl": "https://www.webpagetest.org/result/210304_Ai8T_b21a9c202a106632afd2c6485bda4211/",
		"summaryCSV": "https://www.webpagetest.org/result/210304_Ai8T_b21a9c202a106632afd2c6485bda4211/page_data.csv",
		"detailCSV": "https://www.webpagetest.org/result/210304_Ai8T_b21a9c202a106632afd2c6485bda4211/requests.csv"
	}
}
```

```xml
<response>
	<statusCode>200</statusCode>
	<statusText>Ok</statusText>
	<data>
		<testId>210304_Ai8T_b21a9c202a106632afd2c6485bda4211</testId>
		<xmlUrl>https://www.webpagetest.org/xmlResult/210304_Ai8T_b21a9c202a106632afd2c6485bda4211/</xmlUrl>
		<userUrl>https://www.webpagetest.org/result/210304_Ai8T_b21a9c202a106632afd2c6485bda4211/</userUrl>
		<summaryCSV>https://www.webpagetest.org/result/210304_Ai8T_b21a9c202a106632afd2c6485bda4211/page_data.csv</summaryCSV>
		<detailCSV>https://www.webpagetest.org/result/210304_Ai8T_b21a9c202a106632afd2c6485bda4211/requests.csv</detailCSV>
		<jsonUrl>https://www.webpagetest.org/jsonResult.php?test=210304_Ai8T_b21a9c202a106632afd2c6485bda4211</jsonUrl>
	</data>
</response>
```
:::

The response object contains the following attributes:

::: api-list
- `statusCode` (int)  
The HTTP response status code for the submission. A 200 code indicates a succesful submission. Any errors will result in a status code of 400.
- `statusText` (string)
Descriptive error text explaining the failure. In the case of a 200 status code, the `statusText` will be "Ok".
- `r` (string)
Request ID. When used with the "xml" or "json" format, will echo back in the response object.
- `data` (object)
An object containing information for the test run, including URLs and the test ID. The `data` object is comprised of the following attributes:
    - `testId` (string)  
The ID assigned to the test request and used in all of the associated URLs.
    - `xmlUrl` (string)
The URL used to retrieve the test results in XML format.
    - `jsonURL` (string)
The URL used to retrieve the test results in JSON format.
    - `userURL` (string)
The URL used to direct users to a results page on WebPageTest (the same page you would be redirected to by default if the format parameter was not passed along when submitting the test).
    - `summaryCSV` (string)
A URL to the summary results (page-level data and basic timings) in CSV format. *Will return a 404 if the test is not yet complete.*
    - `detailCSV` (string)
A URL to the full detailed results (including request-level data and timings) in CSV format. *Will return a 404 if the test is not yet complete.*
:::

### Full List of Parameters
::: api-list
- `url` <small>required</small>
The URL to be tested. The value must be UTF-8 encoded to work.
- `k` <small>required</small>
API Key. Applies only to calls made to the runtest.php endpoint. *API Key is optional for any private instances you maintain on your own.
- `label` <small>optional</small>
A label for the test.
- `location` <small>optional</small>
The location to test from. The location is comprised of the location of the testing agent, the browser to test on, and the connectivity in the following format: `location:browser.connectivity`  
**Default:** Dulles:Chrome.Cable
- `runs` <small>optional</small>
The number of test runs (1-10 on the public instance).
**Default:** 1
- `fvonly` <small>optional</small>
Set to 1 to skip the Repeat View test; set to 0 to run a test against both the first view and the repeat view for a given test. Each repeat view test counts as another test run against your API limit.
**Default:** 0
- `domelement` <small>optional</small>
DOM element to record for sub-measurement.
- `private` <small>optional</small>
Set to 0 to make the test visible in the public history log. Set to 1 to make the test private.
**Default:** 1
- `web10` <small>optional</small>
Set to 1 to force the test to stop at Document Complete (onLoad).
**Default:** 0
- `script` <small>optional</small>
Scripted test to execute. See the [Scripting docs](/scripting/) for more details.
- `block` <small>optional</small>
A space-delimited list of urls to block (based on a substring match).
- `login` <small>optional</small>
User name to use for authenticated tests (HTTP authentication).
- `password` <small>optional</small>
Password to use for authenticated tests (HTTP authentication).
- `authType` <small>optional</small>
Type of HTTP authentication to use. Set to 0 for Basic Authentication; set to 1 for SNS.
**Default:** 0
- `video` <small>optional</small>
Set to 1 to capture video. Video is required for calculating Speed Index as well as providing the filmstrip view.
**Default:** 0
- `f` <small>optional</small>
The format to return. Set to "xml" to request an XML response; set to "json" to request a JSON-encoded response. If no format parameter is passed, the API call will result in a redirect.
- `r` <small>optional</small>
Request ID. When used with the "xml" or "json" format, will echo back in the response object.
- `notify` <small>optional</small>
Email-address to notify with the test results.
- `pingback` <small>optional</small>
URL to ping when the test is complete. The test ID will be passed as an "id" parameter.
- `bwDown` <small>optional</small>
Download bandwidth in Kbps (used when specifiying a custom connectivity profile).
- `bwUp` <small>optional</small>
Upload bandwidth in Kbps (used when specifying a custom connectivity profile)
- `latency` <small>optional</small>
First-hop Round Trip Time in ms (used when specifying a custom connectivity profile)
- `plr` <small>optional</small>
Packet loss rate—the percentage of packets to drop (used when specifying a custom connectivity profile)
- `tcpdump` <small>optional</small>
Set to 1 to enable tcpdump capture. 
**Default:** 0
- `noopt` <small>optional</small>
Set to 1 to disable optimization checks (for faster testing).
**Default:** 0
- `noimages` <small>optional</small>
Set to 1 to disable screenshot capturing. 
**Default:** 0
- `noheaders` <small>optional</small>
Set to 1 to disable saving of HTTP headers, as well as browser status messages and CPU utilization.
**Default:** 0
- `pngss` <small>optional</small>
Set to 1 to save a full-resolution version of the fully loaded screenshhot as a PNG.
**Default:** 0
- `iq` <small>optional</small>
Specify a JPEG compression level (between 30-100) for the screenshots and video capture.
- `noscript` <small>optional</small>
Set to 1 to disable JavaScript (IE, Edge, Chrome and Firefox)
**Default:** 0
- `clearcerts` <small>optional</small>
Set to 1 to clear the OS certificate caches (causes the browser to do OCSP/CRL checks during SSL negotiation).
**Default:** 0
- `mobile` <small>optional</small>
Set to 1 to have Chrome emulate a mobile browser by adjust the screen resolution, UA string and providing a fixed viewport. 
**Default:** 0
- `keepua` <small>optional</small>
Set to 1 to preserve the original browser User Agent string (don't append PTST to it)
- `uastring` <small>optional</small>
Custom User Agent String to use
- `width` <small>optional</small>
Viewport Width in css pixels
- `height` <small>optional</small>
Viewport Height in css pixels
- `browser_width` <small>optional</small>
Browser window width (in display pixels)
- `browser_height` <small>optional</small>
Browser window height (in display pixels)
- `dpr` <small>optional</small>
Device Pixel Ratio to use when emulating mobile
- `mv` <small>optional</small>
Set to 1 when capturing video to only store the video from the median run.
**Default:** 0
- `medianMetric` <small>optional</small>
Default metric to use when calculating the median run.
**Default:** loadTime
- `cmdline` <small>optional</small>
Custom command-line options (Chrome only)
- `htmlbody` <small>optional</small>
Set to 1 to save the content of the first response (base page) instead of all of the text responses (bodies=1)
- `tsview_id` <small>optional</small>
Test name to use when submitting results to tsviewdb (for private instances that have integrated with tsviewdb)
- `custom` <small>optional</small>
[Custom metrics](/custom-metrics) to collect at the end of a test
- `tester` <small>optional</small>
Specify a specific tester that the test should run on (must match the PC name in /getTesters.php).  If the tester is not available the job will never run.
- `affinity` <small>optional</small>
Specify a string that will be used to hash the test to a specific test agent.  The tester will be picked by index among the available testers.  If the number of testers changes then the tests will be distributed to different machines but if the counts remain consistent then the same string will always run the tests on the same test machine.  This can be useful for controlling variability when comparing a given URL over time or different parameters against each other (using the URL as the hash string).
- `timeline` <small>optional</small>
Set to 1 to have Chrome capture the Dev Tools timeline
**Default:** 0
- `timelineStack` <small>optional</small>
Set to between 1 - 5 to have Chrome include the Javascript call stack. Must be used in conjunction with `timeline`. 
**Default:** 0
- `ignoreSSL` <small>optional</small>
Set to 1 to Ignore SSL Certificate Errors e.g. Name mismatch, Self-signed certificates, etc.
**Default:** 0
- `mobileDevice` <small>optional</small>
Device name from mobile_devices.ini to use for mobile emulation (only when mobile=1 is specified to enable emulation and only for Chrome)
- `appendua` <small>optional</small>
String to append to the user agent string. This is in addition to the default PTST/ver string. If "keepua" is also specified it will still append. Allows for substitution with some test parameters:
  - %TESTID% - Replaces with the test ID for the current test
  - %RUN% - Replaces with the current run number
  - %CACHED% - Replaces with 1 for repeat view tests and 0 for initial view
  - %VERSION% - Replaces with the current wptdriver version number
- `lighthouse` <small>optional</small>
Set to 1 to have a lighthouse test also performed (Chrome-only, wptagent agents only)
- `type` <small>optional</small>
For running alternative test types, can specify 'traceroute' or 'lighthouse' (lighthouse as a test type is only supported on wptagent agents)
- `injectScript` <small>optional</small>
JavaScript to run on the page as soon as the document exists. 
- `profiler` <small>optional</small>
Set to 1 to enable the V8 sampling profiler (Chromium only).
**Default:** 0
- `disableAVIF` <small>optional</small>
Set to 1 to disable AVIF support (Chromium 88+).
**Default:** 0
- `disableWEBP` <small>optional</small>
Set to 1 to disable AVIF support (Chromium 88+).
**Default:** 0
:::




### Specifying connectivity
If the connectivity is not specified, by default you will get the Cable (5/1 Mbps, 28ms RTT) profile. The connectivity is specified as part of the location in the format:

**location:browser.connectivity**

For example:

* Dulles_IE7.**DSL**
* Frankfurt.**Dial**
* China.**custom**
* Dulles:Chrome.**DSL**

Public instances of WebPageTest provide a number of out-of-the box connection profiles for you to use to run tests:

* **DSL** - 1.5 Mbps down, 384 Kbps up, 50 ms first-hop RTT, 0% packet loss
* **Cable** - 5 Mbps down, 1 Mbps up, 28ms first-hop RTT, 0% packet loss
* **FIOS** - 20 Mbps down, 5 Mbps up, 4 ms first-hop RTT, 0% packet loss
* **Dial** - 49 Kbps down, 30 Kbps up, 120 ms first-hop RTT, 0% packet loss
* **Edge** - 240 Kbps down, 200 Kbps up, 840 ms first-hop RTT, 0% packet loss
* **2G** = 280 Kbps down, 256 Kbps up, 800 ms first-hop RTT, 0% packet loss
* **3GSlow** - 400 Kbps down and up, 400 ms first-hop RTT, 0% packet loss
* **3G** - 1.6 Mbps down, 768 Kbps up, 300 ms first-hop RTT, 0% packet loss
* **3GFast** - 1.6 Mbps down, 768 Kbps up, 150 ms first-hop RTT, 0% packet loss
* **4G** - 9 Mbps down and up, 170 ms first-hop RTT, 0% packet loss
* **LTE** - 12 Mbps down and up, 70 ms first-hop RTT, 0% packet loss
* **Native** - No synthetic traffic shaping applied
* **custom** - Custom profile, bandwidth and latency must also be specified using the `bwUp`, `bwDown`, `latency` and `plr` parameters

Browser is only required in a Chrome/Firefox install where wptdriver is configured for multiple browsers.

### Available locations for API calls

On the public instance with an API key that starts with "A.", only locations listed [here](https://www.webpagetest.org/getLocations.php?k=A&f=html) are available for API calls. Others will return `invalid location` when requested.

### Examples
Test www.aol.com and redirect to the results page:

```text
http://www.webpagetest.org/runtest.php?url=www.aol.com
```

Test www.aol.com 10 times, first view only and redirect to the results page:
```text
http://www.webpagetest.org/runtest.php?url=www.aol.com&runs=10&fvonly=1
```
Test www.aol.com 2 times and get the response as xml with the request ID "12345" embedded in the response:
```text
http://www.webpagetest.org/runtest.php?url=www.aol.com&runs=2&f=xml&r=12345
```

## Check test status
You can check the status of a test by doing a GET to http://www.webpagetest.org/testStatus.php with your test id and an optional format parameter. You will get a HTTP 200 response to the request itself indicating that the request was parsed, as well as a return object with details about the test run itself. 

### Response Format
By default, the `/testStatus.php` endpoint returns a JSON object. Alternatively, you can request the response object be returned as XML by passing the format (`f`) parameter.

```text
//this will return a JSON response
https://www.webpagetest.org/testStatus.php?test={your_test_id}

//this will return an XML response
https://www.webpagetest.org/testStatus.php?test={your_test_id}&f=xml
```

::: code-tabs
```json
{
   "statusCode":200,
   "statusText":"Test Complete",
   "data":{
      "statusCode":200,
      "statusText":"Test Complete",
      "id":"210304_Ai8T_b21a9c202a106632afd2c6485bda4211",
      "completeTime":"03\/05\/21 16:44:35",
      "testInfo":{
         "url":"https:\/\/docs.webpagetest.org",
         "runs":3,
         "fvonly":1,
         "web10":0,
         "ignoreSSL":0,
         "label":"Netlify Deploy undefined",
         "priority":5,
         "location":"Dulles",
         "browser":"Chrome",
         "connectivity":"Cable",
         "bwIn":5000,
         "bwOut":1000,
         "latency":28,
         "plr":"0",
         "tcpdump":0,
         "timeline":0,
         "trace":0,
         "bodies":0,
         "netlog":0,
         "standards":0,
         "noscript":0,
         "pngss":0,
         "iq":0,
         "keepua":0,
         "mobile":0,
         "scripted":0
      },
      "remote":false,
      "testsExpected":3,
      "runs":3,
      "fvonly":1,
      "location":"Dulles"
   }
}
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<response>
   <statusCode>200</statusCode>
   <statusText>Test Complete</statusText>
   <data>
      <statusCode>200</statusCode>
      <statusText>Test Complete</statusText>
      <id>210304_Ai8T_b21a9c202a106632afd2c6485bda4211</id>
      <completeTime>03/09/21 14:15:34</completeTime>
      <testInfo>
         <url>https://docs.webpagetest.org</url>
         <runs>3</runs>
         <fvonly>1</fvonly>
         <web10>0</web10>
         <ignoreSSL>0</ignoreSSL>
         <label>Netlify Deploy undefined</label>
         <priority>5</priority>
         <location>Dulles</location>
         <browser>Chrome</browser>
         <connectivity>Cable</connectivity>
         <bwIn>5000</bwIn>
         <bwOut>1000</bwOut>
         <latency>28</latency>
         <plr>0</plr>
         <tcpdump>0</tcpdump>
         <timeline>0</timeline>
         <trace>0</trace>
         <bodies>0</bodies>
         <netlog>0</netlog>
         <standards>0</standards>
         <noscript>0</noscript>
         <pngss>0</pngss>
         <iq>0</iq>
         <keepua>0</keepua>
         <mobile>0</mobile>
         <scripted>0</scripted>
      </testInfo>
      <remote />
      <testsExpected>3</testsExpected>
      <runs>3</runs>
      <fvonly>1</fvonly>
      <location>Dulles</location>
   </data>
</response>
```
:::

The response object contains the following attributes:

::: api-list
- `statusCode` (int)  
The HTTP response status code for the submission. A 200 code indicates a successful submission. 1XX means the test is still in progress. 4XX indicates some error.
- `statusText` (string)  
Descriptive error text explaining the failure. In the case of a 200 status code, the `statusText` will be "Test Complete".
- `remote` (boolean)
- `testsExpected` (int)  
The number of tests expected in the test results.
- `runs` (int)  
The number of test runs for the test with the provided test ID.
- `fvonly` (int)
Whether the test was for the first view only (1), or included tests for a repeat view (0)
- `location` (string)  
The location of the testing agent used to run the test.
- `data` (object)  
An object containing information about the test that was run. The `data` object is comprised of the following attributes:  
    - `statusCode` (int)  
	The HTTP response status code for the submission. A 200 code indicates a successful submission. 1XX means the test is still in progress. 4XX indicates some error. (Same as the top level `statusCode`.)
	- `statusText` (string)
	Descriptive error text explaining the failure. In the case of a 200 status code, the `statusText` will be "Test Complete". (Same as the top level `statusText`.)
	- `id` (string)  
	The unique test id.
	- `completeTime` (string)
	The time and date the test was completed at.
	- `testInfo` (object)  
	An object containing additional meta data about the characteristics of the test that was run.c

:::

### Full List of Parameters
::: api-list
- `test` <small>required</small>  
The test ID for the test you want to check the status of.
- `f` <small>optional</small>
The format to return. Set to "xml" to request an XML response; set to "json" to request a JSON-encoded response. If no format parameter is passed, the API call will result in a redirect.
- `callback` <small>optional</small>
Callback function name. When used with `f=json`, the API will return an JSONP response by wrapping the JSON object with the provided callback name.
:::
## Retrieving test results
To retrieve the results of a test run, you can use either the https://www.webpagetest.org/xmlResult.php (to return an XML response) or https://www.webpagetest.org/jsonResult.php (to return a JSON response) endpoint. The endpoint will return a response containing some information about the test itself, as well as an object containing all the metrics recorded across each test run.

### Response Format
The results endpoints will return a different response type depending on the endpoint you use.

```text
//this will result in an XML response
https://webpagetest.org/xmlResult.php

//this will return a JSON response
https://webpagetest.org/jsonResult.php
```

Here's an example response, truncated for brevity:

:::code-tabs
```json
{
  "data": {
    "id": "210328_XiS8_aeebf094c7b9e3c9c681ec509cdaa911",
    "url": "http://www.webpagetest.com",
    "summary": "https://www.webpagetest.org/results.php?test=210328_XiS8_aeebf094c7b9e3c9c681ec509cdaa911",
    "testUrl": "http://www.webpagetest.com",
    "location": "Dulles:Chrome",
    "from": "Dulles, VA - <b>Chrome</b> - <b>Cable</b>",
    "connectivity": "Cable",
    "bwDown": 5000,
    "bwUp": 1000,
    "latency": 28,
    "plr": "0",
    "shaperLimit": 0,
    "mobile": 0,
    "completed": 1616896955,
    "testRuns": 1,
    "fvonly": false,
    "successfulFVRuns": 1,
    "successfulRVRuns": 1,
    "average": {
        //all metrics for this  run
    },
    "standardDeviation": {
        //all metrics for this run
    },
    "median": {
        //all metrics for this run
    },
    "runs": {
        //all metrics for all runs
    }
  },
  "statusCode": 200,
  "statusText": "Test Complete",
  "webPagetestVersion": "20.06"
}
```
```xml
<?xml version="1.0" encoding="UTF-8"?>
<response>
   <statusCode>200</statusCode>
   <statusText>Ok</statusText>
   <webPagetestVersion>20.06</webPagetestVersion>
   <data>
      <testId>210328_XiS8_aeebf094c7b9e3c9c681ec509cdaa911</testId>
      <summary>https://www.webpagetest.org/result/210328_XiS8_aeebf094c7b9e3c9c681ec509cdaa911/</summary>
      <testUrl>http://www.webpagetest.com</testUrl>
      <location>Dulles:Chrome</location>
      <from>
         Dulles, VA -
         <b>Chrome</b>
         -
         <b>Cable</b>
      </from>
      <connectivity>Cable</connectivity>
      <bwDown>5000</bwDown>
      <bwUp>1000</bwUp>
      <latency>28</latency>
      <plr>0</plr>
      <mobile>0</mobile>
      <completed>Sun, 28 Mar 2021 02:02:35 +0000</completed>
      <runs>1</runs>
      <successfulFVRuns>1</successfulFVRuns>
      <successfulRVRuns>1</successfulRVRuns>
      <average>...</average>
      <standardDeviation>...</standardDeviation>
      <median>...</median>
      <run>...</run>
   </data>
</response>
```

:::caution
There are a **lot** of [metrics](/metrics) recorded by WebPageTest and exposed via the API. We're working on documenting them all. In the meantime, feel free to poke at some sample results (in either [JSON](https://webpagetest.org/jsonResult.php?test=210328_XiS8_aeebf094c7b9e3c9c681ec509cdaa911) or [XML](https://webpagetest.org/xmlResult.php?test=210328_XiS8_aeebf094c7b9e3c9c681ec509cdaa911) format) to see what's available.
:::

### Full List of Parameters
::: api-list
- `test` <small>required</small>  
The test ID for the test you want to cancel.
- `callback` <small>optional</small>
Callback function name. When used with `f=json`, the API will return an JSONP response by wrapping the JSON object with the provided callback name.
- `breakdown` <small>optional</small>  
Pass 1 to include the breakdown of requests and bytes by mime type.
**Default:** 0
- `domains` <small>optional</small>  
Pass 1 to include the breakdown of requests and bytes by domain.
**Default:** 0
- `requests` <small>optional</small>  
Pass 1 to include the request data in the response (slower and results in a much longer response).
**Default:** 0
- `requests` <small>optional</small>  
Pass 1 to include the request data in the response (slower and results in a much longer response).
**Default:** 0
- `r` <small>optional</small>
Request ID. Will echo back in the response object.
:::
## Cancelling Tests
To cancel a test that has not started running, you can use the http://www.webpagetest.org/cancelTest.php endpoint.

```text
http://www.webpagetest.org/cancelTest.php?test=210328_XiMJ_3c426d8c00c689f22f4097cbb1dfd697&k=81c119174fe742f7a2d778d0a505d096\
```

### Full List of Parameters
::: api-list
- `k` <small>required</small>
API Key. *API Key is optional for any private instances you maintain on your own.
- `test` <small>required</small>  
The test ID for the test you want to cancel.
:::
## Retrieving Available Locations
You can request a list of available WebPageTest agents as well as the number of pending tests for each using the https://webpagetest.org/getLocations.php endpoint.

### Response Format
By default, a successful request to the /getLocations.php endpoint, results an XML response. You can optionally set the response format using the `f` parameter to request a JSON response (`f=json`).

If you pass the `callback` parameter in conjunction with using `f=json`, the endpoint will return a [JSONP](https://en.wikipedia.org/wiki/JSONP) response with the JSON wrapped in the given callback function name.

```text
//this will result in an XML response
https://webpagetest.org/getLocations.php

//this will return a JSON response
https://webpagetest.org/getLocations.php?f=json

//this will return a JSONP response, with the JSON wrapped in myCallback()
https://webpagetest.org/getLocations.php?f=json&callback=myCallback
```

Here's an example response from the /getLocations.php endpoint, (truncated for brevity):

::: code-tabs
```json
{
  "statusCode": 200,
  "statusText": "Ok",
  "data": {
    "Dulles_MotoG4": {
      "Label": "Moto G (gen 4)",
      "location": "Dulles_MotoG4",
      "Browsers": "Moto G4 - Chrome,Moto G4 - Chrome Canary,Moto G4 - Chrome Beta,Moto G4 - Chrome Dev,Moto G4 - Samsung Internet,Moto G4 - UC Browser,Moto G4 - UC Mini,Moto G4 - Opera Mini (Extreme),Moto G4 - Opera Mini (High),Moto G4 - Firefox,Moto G4 - Chrome,Moto G4 - Chrome Canary,Moto G4 - Chrome Beta,Moto G4 - Chrome Dev,Moto G4 - Samsung Internet,Moto G4 - UC Browser,Moto G4 - UC Mini,Moto G4 - Opera Mini (Extreme),Moto G4 - Opera Mini (High),Moto G4 - Firefox",
      "status": "OK",
      "labelShort": "Dulles, VA",
      "group": "Android Devices - Dulles, VA",
      "PendingTests": {
        "p1": 0,
        "p2": 0,
        "p3": 0,
        "p4": 0,
        "p5": 1,
        "p6": 1,
        "p7": 0,
        "p8": 0,
        "p9": 0,
        "Total": 37,
        "HighPriority": 20,
        "LowPriority": 2,
        "Testing": 15,
        "Idle": 0,
        "TestAgentRatio": 2.466666666666667
      }
    },
    "Dulles_MotoG6": {
      "Label": "Moto G (gen 6)",
      "location": "Dulles_MotoG6",
      "Browsers": "Moto G6 - Chrome,Moto G6 - Chrome Canary,Moto G6 - Chrome Beta,Moto G6 - Chrome Dev,Moto G6 - UC Browser,Moto G6 - UC Mini,Moto G6 - Opera Mini (Extreme),Moto G6 - Opera Mini (High),Moto G6 - Firefox,Moto G6 - Chrome,Moto G6 - Chrome Canary,Moto G6 - Chrome Beta,Moto G6 - Chrome Dev,Moto G6 - UC Browser,Moto G6 - UC Mini,Moto G6 - Opera Mini (Extreme),Moto G6 - Opera Mini (High),Moto G6 - Firefox",
      "status": "OK",
      "labelShort": "Dulles, VA",
      "group": "Android Devices - Dulles, VA",
      "PendingTests": {
        "p1": 0,
        "p2": 0,
        "p3": 0,
        "p4": 0,
        "p5": 3,
        "p6": 0,
        "p7": 0,
        "p8": 0,
        "p9": 0,
        "Total": 32,
        "HighPriority": 28,
        "LowPriority": 3,
        "Testing": 1,
        "Idle": 0,
        "TestAgentRatio": 32
      }
    },
    ...
  }
}

```
```xml
<?xml version="1.0" encoding="UTF-8"?>
<response>
   <statusCode>200</statusCode>
   <statusText>Ok</statusText>
   <data>
      <location>
         <id>Dulles_MotoG4</id>
         <Label>Moto G (gen 4)</Label>
         <location>Dulles_MotoG4</location>
         <Browsers>Moto G4 - Chrome,Moto G4 - Chrome Canary,Moto G4 - Chrome Beta,Moto G4 - Chrome Dev,Moto G4 - Samsung Internet,Moto G4 - UC Browser,Moto G4 - UC Mini,Moto G4 - Opera Mini (Extreme),Moto G4 - Opera Mini (High),Moto G4 - Firefox,Moto G4 - Chrome,Moto G4 - Chrome Canary,Moto G4 - Chrome Beta,Moto G4 - Chrome Dev,Moto G4 - Samsung Internet,Moto G4 - UC Browser,Moto G4 - UC Mini,Moto G4 - Opera Mini (Extreme),Moto G4 - Opera Mini (High),Moto G4 - Firefox</Browsers>
         <status>OK</status>
         <labelShort>Dulles, VA</labelShort>
         <group>Android Devices - Dulles, VA</group>
         <PendingTests>
            <p1>0</p1>
            <p2>0</p2>
            <p3>0</p3>
            <p4>0</p4>
            <p5>0</p5>
            <p6>1</p6>
            <p7>0</p7>
            <p8>0</p8>
            <p9>0</p9>
            <Total>45</Total>
            <HighPriority>29</HighPriority>
            <LowPriority>1</LowPriority>
            <Testing>15</Testing>
            <Idle>0</Idle>
            <TestAgentRatio>3</TestAgentRatio>
         </PendingTests>
      </location>
      <location>
         <id>Dulles_MotoG6</id>
         <Label>Moto G (gen 6)</Label>
         <location>Dulles_MotoG6</location>
         <Browsers>Moto G6 - Chrome,Moto G6 - Chrome Canary,Moto G6 - Chrome Beta,Moto G6 - Chrome Dev,Moto G6 - UC Browser,Moto G6 - UC Mini,Moto G6 - Opera Mini (Extreme),Moto G6 - Opera Mini (High),Moto G6 - Firefox,Moto G6 - Chrome,Moto G6 - Chrome Canary,Moto G6 - Chrome Beta,Moto G6 - Chrome Dev,Moto G6 - UC Browser,Moto G6 - UC Mini,Moto G6 - Opera Mini (Extreme),Moto G6 - Opera Mini (High),Moto G6 - Firefox</Browsers>
         <status>OK</status>
         <labelShort>Dulles, VA</labelShort>
         <group>Android Devices - Dulles, VA</group>
         <PendingTests>
            <p1>0</p1>
            <p2>0</p2>
            <p3>0</p3>
            <p4>0</p4>
            <p5>3</p5>
            <p6>0</p6>
            <p7>0</p7>
            <p8>0</p8>
            <p9>0</p9>
            <Total>33</Total>
            <HighPriority>29</HighPriority>
            <LowPriority>3</LowPriority>
            <Testing>1</Testing>
            <Idle>0</Idle>
            <TestAgentRatio>33</TestAgentRatio>
         </PendingTests>
      </location>
      ...
   </data>
</response>
```

### Full list of parameters
::: api-list
- `f` <small>optional</small>
The format to return. Set to "xml" to request an XML response; set to "json" to request a JSON-encoded response. If no format parameter is passed, the API call will default to an XML reponse.
- `callback` <small>optional</small>
Callback function name. When used with `f=json`, the API will return an JSONP response by wrapping the JSON object with the provided callback name.
- `r` (string)
Request ID. Will echo back in the response object.
:::