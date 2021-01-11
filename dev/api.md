# Submitting test requests
You can submit tests to pagetest either by doing a POST or a GET to http://www.webpagetest.org/runtest.php

In response you will either get redirected to the results page or you will get an xml or json response (depending on if xml or json was requested).

## Parameters
| Parameter | Required | Description | Default |
| --- |  --- |  --- |  --- |
| url | required | URL to be tested |  |
| label |  optional |  Label for the test |   |
| location | optional | Location to test from | Dulles 5Mbps Cable |
| runs | optional | Number of test runs (1-10 on the public instance) | 1 |
| fvonly | optional | Set to 1 to skip the Repeat View test | 0 |
| domelement | optional | DOM Element to record for sub-measurement |  |
| private | optional | Set to 0 to make the test visible in the history log (defaults to private) | 1 |
| connections | optional | Override the number of concurrent connections IE uses (0 to not override) | 0 |
| web10 | optional | Set to 1 to force the test to stop at Document Complete (onLoad) | 0 |
| script | optional | Scripted test to execute |  |
| block | optional | space-delimited list of urls to block (substring match) |  |
| login | optional | User name to use for authenticated tests (http authentication) |  |
| password | optional | Password to use for authenticated tests (http authentication) |  |
| authType | optional | Type of authentication to use: 0 = Basic Auth, 1 = SNS | 0 |
| video | optional | Set to 1 to capture video (video is required for calculating Speed Index) | 0 |
| f | optional | Format. Set to "xml" to request an XML response instead of a redirect or "json" for JSON-encoded response |  |
| r | optional | When using the xml interface, will echo back in the response |  |
| notify | optional | e-mail address to notify with the test results |  |
| pingback | optional | URL to ping when the test is complete (the test ID will be passed as an "id" parameter) |  |
| bwDown | optional | Download bandwidth in Kbps (used when specifying a custom connectivity profile) |  |
| bwUp | optional | Upload bandwidth in Kbps (used when specifying a custom connectivity profile) |  |
| latency | optional | First-hop Round Trip Time in ms (used when specifying a custom connectivity profile) |  |
| plr | optional | Packet loss rate - percent of packets to drop (used when specifying a custom connectivity profile) |  |
| k | optional**(required for public instance)** | API Key (if assigned) - applies only to runtest.php calls. Contact the site owner for a key if required (<http://www.webpagetest.org/getkey.php> for the public instance) |  |
|  tcpdump |  optional |  Set to 1 to enable tcpdump capture |  0 |
| noopt | optional | Set to 1 to disable optimization checks (for faster testing) | 0 |
| noimages | optional | Set to 1 to disable screen shot capturing | 0 |
| noheaders | optional | Set to 1 to disable saving of the http headers (as well as browser status messages and CPU utilization) | 0 |
|  pngss |  optional |  Set to 1 to save a full-resolution version of the fully loaded screen shot as a png |   |
|  iq |  optional |  Specify a jpeg compression level (30-100) for the screen shots and video capture |   |
|  noscript |  optional |  Set to 1 to disable javascript (IE, Chrome, Firefox) |   |
|  clearcerts |  optional |  Set to 1 to clear the OS certificate caches (causes IE to do OCSP/CRL checks during SSL negotiation if the certificates are not already cached). Added in 2.11 |  0 |
|  mobile |  optional |  Set to 1 to have Chrome emulate a mobile browser (screen resolution, UA string, fixed viewport).  Added in 2.11 |  0 |
|  keepua |  optional |  Set to 1 to preserve the original browser User Agent string (don't append PTST to it) |   |
|  uastring |  optional |  Custom User Agent String to use |   |
|  width |  optional |  Viewport Width in css pixels |   |
|  height |  optional |  Viewport Height in css pixels |   |
|  browser_width |  optional |  Browser window width (in display pixels) |   |
|  browser_height |  optional |  Browser window height (in display pixels) |   |
|  dpr |  optional |  Device Pixel Ratio to use when emulating mobile |   |
|  mv |  optional |  Set to 1 when capturing video to only store the video from the median run. |  0 |
|  medianMetric |  optional |  Default metric to use when calculating the median run |  loadTime |
|  cmdline |  optional |  Custom command-line options (Chrome only) |   |
|  htmlbody |  optional | Set to 1 to save the content of the first response (base page) instead of all of the text responses (bodies=1) |   |
|  tsview_id |  optional |  Test name to use when submitting results to tsviewdb (for private instances that have integrated with tsviewdb) |   |
|  custom |  optional |  [Custom metrics](https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/custom-metrics) to collect at the end of a test |   |
|  tester |  optional | Specify a specific tester that the test should run on (must match the PC name in /getTesters.php).  If the tester is not available the job will never run. |   |
|  affinity |  optional | Specify a string that will be used to hash the test to a specific test agent.  The tester will be picked by index among the available testers.  If the number of testers changes then the tests will be distributed to different machines but if the counts remain consistent then the same string will always run the tests on the same test machine.  This can be useful for controlling variability when comparing a given URL over time or different parameters against each other (using the URL as the hash string). |   |
| timeline |  optional |  Set to 1 to have Chrome capture the Dev Tools timeline |  0 |
| timelineStack |  optional |  Set to between 1 - 5 to have Chrome include the Javascript call stack. Must be used in conjunction with "timeline".  |  0 |
| ignoreSSL |  optional |  Set to 1 to Ignore SSL Certificate Errors e.g. Name mismatch, Self-signed certificates, etc. |  0 |
|  mobileDevice |  optional |  Device name from mobile_devices.ini to use for mobile emulation (only when mobile=1 is specified to enable emulation and only for Chrome) |   |
|  appendua |  optional |  String to append to the user agent string. This is in addition to the default PTST/ver string. If "keepua" is also specified it will still append. Allows for substitution with some test parameters:%TESTID% - Replaces with the test ID for the current test%RUN% - Replaces with the current run number%CACHED% - Replaces with 1 for repeat view tests and 0 for initial view%VERSION% - Replaces with the current wptdriver version number |   |
|  lighthouse |  optional |  Set to 1 to have a lighthouse test also performed (Chrome-only, wptagent agents only) |   |
|  type |  optional |  For running alternative test types, can specify 'traceroute' or 'lighthouse' (lighthouse as a test type is only supported on wptagent agents) |   |
|  injectScript |  optional |  JavaScript to run on the page as soon as the document exists.  |   |

## Specifying connectivity
If the connectivity is not specified, by default you will get the Cable (5/1 Mbps, 28ms RTT) profile. The connectivity is specified as part of the location in the format:

**location:browser.connectivity**

For example:
* Dulles_IE7.DSL
* Frankfurt.Dial
* China.custom
* Dulles:Chrome.DSL

The supported profiles for the public instance are:

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
* **custom** - Custom profile, bandwidth and latency must also be specified using the bwIn, bwOut, latency and plr parameters

Browser is only required in a Chrome/Firefox install where wptdriver is configured for multiple browsers.

### Available locations for API calls

On the public instance with an API key that starts with "A.", only locations listed [here](https://www.webpagetest.org/getLocations.php?k=A&f=html) are available for API calls. Others will return `invalid location` when requested.

## XML response

The XML response follows the format of REST API's. You will get a HTTP 200 response to the request itself indicating that the request was parsed but the result of the submission itself will be in the XML. See the samples for a full example XML response.
```xml
<response>
    <statusCode></statusCode>
    <statusText></statusText>
    <requestId></requestId>
    <data>
        <testId></testId>
        <xmlUrl></xmlUrl>
        <userUrl></userUrl>
        <summaryCSV></summaryCSV>
        <detailCSV></detailCSV>
    </data>
</response>
```
* **statusCode** - 200 indicates a successful submission. Anything else is an error (and will come back as 400 with descriptive text)
* **statusText** - Descriptive error text explaining the failure
* **requestId** - Request ID echoed from request (r parameter). Will not be present if not specified. Makes it easier to track asynchronous requests.
* **testId** - ID assigned to the test request (and used in all of the urls)
* **xmlUrl** - URL to use to get the results in XML format
* **userUrl** - URL to use to direct the user to a results page (what you would normally get redirected to if not using the XML interface)
* **summaryCSV** - URL to the summary results in CSV format (page-level data and timings). Will return a 404 if the test is not yet complete.
* **detailCSV** - URL to the full detail results in CSV format (request-level data and timings). Will return a 404 if the test is not yet complete.

## Samples
Test www.aol.com and redirect to the results page:
```
http://www.webpagetest.org/runtest.php?url=www.aol.com
```

Test www.aol.com 10 times, first view only and redirect to the results page:
```
http://www.webpagetest.org/runtest.php?url=www.aol.com&runs=10&fvonly=1
```
Test www.aol.com 2 times and get the response as xml with the request ID "12345" embedded in the response:
```
http://www.webpagetest.org/runtest.php?url=www.aol.com&runs=2&f=xml&r=12345
```

```xml
<response>
	<statusCode>200</statusCode>
	<statusText>Ok</statusText>
	<requestId>12345</requestId>
	<data>
		<testId>091111_2XFH</testId>
		<xmlUrl>http://www.webpagetest.org/xmlResult/091111_2XFH/</xmlUrl>
		<userUrl>http://www.webpagetest.org/result/091111_2XFH/</userUrl>
	</data>
</response>
```

## Check test status
You can check the status of a test by doing a GET to http://www.webpagetest.org/testStatus.php with your test id. You will get a HTTP 200 response to the request itself indicating that the request was parsed but the result of the submission itself will be in the XML. 
http://www.webpagetest.org/testStatus.php?f=xml&test=your_test_id
```xml
<?xml version="1.0" encoding="UTF-8"?> 
<response> 
        <statusCode>100</statusCode> 
        <statusText>Test Started</statusText> 
        <data> 
                <statusCode>100</statusCode> 
                <statusText>Test Started</statusText> 
                <testId>your_test_id</testId> 
                <runs>9</runs> 
                <fvonly>1</fvonly> 
                <location>Dulles_IE8</location> 
                <startTime>02/12/11 1:06:16</startTime> 
                <fvRunsCompleted>1</fvRunsCompleted> 
                <rvRunsCompleted>0</rvRunsCompleted> 
        </data> 
</response> 
```
* **statusCode** - 200 indicates test is completed. 1XX means the test is still in progress. And 4XX indicates some error.
* **statusText** - Descriptive text explaining the status
* **data** - Some test information including the test ID, the number of runs the test requested, the start time, etc.(non-xml) 

## Getting test results
under normal use (non-xml) you will be redirected to the results page. When using the XML API you should use the xmlUrl provided in the response to the test request. The XML url can also take some optional parameters:

|  **Parameter** | ** Description** |
| --- |  --- |
|  r |  A request ID that will be echoed back in the response |
|  requests |  Pass requests=1 to include the request data in the XML (slower and results in much larger responses) |
|  pagespeed |  Pass pagespeed=1 to include the PageSpeed score in the response (may be slower) |
|  domains |  Pass domains=1 to include the breakdown of requests and bytes by domain |
|  breakdown |  Pass breakdown=1 to include the breakdown of requests and bytes by mime type |


The format of the response for the test details is the same as for submitting the request (with different data). All times are in ms.
```xml
<response>
	<statusCode></statusCode>
	<statusText></statusText>
	<requestId></requestId>
	<data>
		<runs></runs>
		<average>
			<firstView>
			</firstView>
			<repeatView>
			</repeatView>
		</average>
		<run>
			<id></id>
			<firstView>
				<results>
				</results>
				<pages>
				</pages>
				<thumbnails>
				</thumbnails>
				<images>
				</images>
				<rawData>
				</rawData>
			</firstView>
			<repeatView>
				<results>
				</results>
				<pages>
				</pages>
				<thumbnails>
				</thumbnails>
				<images>
				</images>
				<rawData>
				</rawData>
			</repeatView>
		</run>
		<run>
		...
		</run>
	</data>
</response>
```
* **statusCode** - 200 if the test is complete and results are available. 1xx if the test is still pending (try again in a reasonable amount of time - 5-10 seconds). 400 if it is an invalid test ID.
* **statusText** - Descriptive text of any failures
* **requestId** - Request ID echoed from the request
* **runs** - Number of runs in the response
* **average** - Averaged test results across all of the successful runs (a block each for first and repeat view data)
* **run** - A block for each test run with the results for that run
* **id** - Run number (increments up from 1 in order)
* **firstView/repeatView** - A block of results each for First and Repeat view data
* **results** - Test results (all times are in ms)
* **pages** - URL's to user pages
* **thumbnails** - URL's to the thumbnails for the various images (waterfall, checklist, screen shot)
* **images** - URL's to the full-sized images (waterfall, checklist, screen shot)
* **rawData** - URL's to the headers and tab-delimited results files

## Sample
Using the test request sample from earlier (and adding a requestId), we get:

http://www.webpagetest.org/xmlResult/091111_2XFH/?r=12345
```xml
<?xml version="1.0" encoding="UTF-8" ?> 
<response>
	<statusCode>200</statusCode> 
	<statusText>Ok</statusText> 
	<requestId>12345</requestId> 
	<data>
		<runs>2</runs> 
		<average>
			<firstView>
				<loadTime>4495</loadTime> 
				<TTFB>315</TTFB> 
				<bytesIn>392645</bytesIn> 
				<bytesInDoc>392645</bytesInDoc> 
				<requests>44</requests> 
				<requestsDoc>44</requestsDoc> 
				<render>1904</render> 
				<fullyLoaded>4495</fullyLoaded> 
				<docTime>4495</docTime> 
				<domTime>0</domTime> 
				<avgRun>1</avgRun> 
			</firstView>
			<repeatView>
				<loadTime>3266</loadTime> 
				<TTFB>359</TTFB> 
				<bytesIn>102151</bytesIn> 
				<bytesInDoc>102151</bytesInDoc> 
				<requests>13</requests> 
				<requestsDoc>13</requestsDoc> 
				<render>682</render> 
				<fullyLoaded>3266</fullyLoaded> 
				<docTime>3266</docTime> 
				<domTime>0</domTime> 
				<avgRun>1</avgRun> 
			</repeatView>
		</average>
		<run>
			<id>1</id> 
			<firstView>
				<results>
					<URL>http://www.aol.com</URL> 
					<loadTime>4467</loadTime> 
					<TTFB>346</TTFB> 
					<bytesOut>22403</bytesOut> 
					<bytesOutDoc>22403</bytesOutDoc> 
					<bytesIn>386528</bytesIn> 
					<bytesInDoc>386528</bytesInDoc> 
					<requests>43</requests> 
					<requestsDoc>43</requestsDoc> 
					<result>0</result> 
					<render>1963</render> 
					<fullyLoaded>4467</fullyLoaded> 
					<cached>0</cached> 
					<web>1</web> 
					<docTime>4467</docTime> 
					<domTime>0</domTime> 
					<score_cache>48</score_cache> 
					<score_cdn>96</score_cdn> 
					<score_gzip>100</score_gzip> 
					<score_cookies>87</score_cookies> 
					<score_keep-alive>94</score_keep-alive> 
					<score_minify>91</score_minify> 
					<score_combine>75</score_combine> 
					<score_compress>99</score_compress> 
					<score_etags>93</score_etags> 
					<date>1257974116</date> 
				</results>
				<pages>
					<details>http://www.webpagetest.org/result/091111_2XFH/1/details/</details> 
					<checklist>http://www.webpagetest.org/result/091111_2XFH/1/performance_optimization/</checklist> 
					<report>http://www.webpagetest.org/result/091111_2XFH/1/optimization_report/</report> 
					<breakdown>http://www.webpagetest.org/result/091111_2XFH/1/breakdown/</breakdown> 
					<domains>http://www.webpagetest.org/result/091111_2XFH/1/domains/</domains> 
					<screenShot>http://www.webpagetest.org/result/091111_2XFH/1/screen_shot/</screenShot> 
				</pages>
				<thumbnails>
					<waterfall>http://www.webpagetest.org/result/091111_2XFH/1_waterfall_thumb.png</waterfall> 
					<checklist>http://www.webpagetest.org/result/091111_2XFH/1_optimization_thumb.png</checklist> 
					<screenShot>http://www.webpagetest.org/result/091111_2XFH/1_screen_thumb.jpg</screenShot> 
				</thumbnails>
				<images>
					<waterfall>http://www.webpagetest.org/results/09/11/11/2XFH/1_waterfall.png</waterfall> 
					<checklist>http://www.webpagetest.org/results/09/11/11/2XFH/1_optimization.png</checklist> 
					<screenShot>http://www.webpagetest.org/results/09/11/11/2XFH/1_screen.jpg</screenShot> 
				</images>
				<rawData>
					<headers>http://www.webpagetest.org/results/09/11/11/2XFH/1_report.txt</headers> 
					<pageData>http://www.webpagetest.org/results/09/11/11/2XFH/1_IEWPG.txt</pageData> 
					<requestsData>http://www.webpagetest.org/results/09/11/11/2XFH/1_IEWTR.txt</requestsData> 
				</rawData>
			</firstView>
			<repeatView>
				<results>
					<URL>http://www.aol.com</URL> 
					<loadTime>3418</loadTime> 
					<TTFB>357</TTFB> 
					<bytesOut>8762</bytesOut> 
					<bytesOutDoc>8762</bytesOutDoc> 
					<bytesIn>108138</bytesIn> 
					<bytesInDoc>108138</bytesInDoc> 
					<requests>14</requests> 
					<requestsDoc>14</requestsDoc> 
					<result>0</result> 
					<render>682</render> 
					<fullyLoaded>3418</fullyLoaded> 
					<cached>1</cached> 
					<web>1</web> 
					<docTime>3418</docTime> 
					<domTime>0</domTime> 
					<score_cache>35</score_cache> 
					<score_cdn>83</score_cdn> 
					<score_gzip>100</score_gzip> 
					<score_cookies>66</score_cookies> 
					<score_keep-alive>83</score_keep-alive> 
					<score_minify>100</score_minify> 
					<score_combine>100</score_combine> 
					<score_compress>100</score_compress> 
					<score_etags>93</score_etags> 
					<date>1257974129</date> 
				</results>
				<pages>
					<details>http://www.webpagetest.org/result/091111_2XFH/1/details/cached/</details> 
					<checklist>http://www.webpagetest.org/result/091111_2XFH/1/performance_optimization/cached/</checklist> 
					<report>http://www.webpagetest.org/result/091111_2XFH/1/optimization_report/cached/</report> 
					<breakdown>http://www.webpagetest.org/result/091111_2XFH/1/breakdown/</breakdown> 
					<domains>http://www.webpagetest.org/result/091111_2XFH/1/domains/</domains> 
					<screenShot>http://www.webpagetest.org/result/091111_2XFH/1/screen_shot/cached/</screenShot> 
				</pages>
				<thumbnails>
					<waterfall>http://www.webpagetest.org/result/091111_2XFH/1_Cached_waterfall_thumb.png</waterfall> 
					<checklist>http://www.webpagetest.org/result/091111_2XFH/1_Cached_optimization_thumb.png</checklist> 
					<screenShot>http://www.webpagetest.org/result/091111_2XFH/1_Cached_screen_thumb.jpg</screenShot> 
				</thumbnails>
				<images>
					<waterfall>http://www.webpagetest.org/results/09/11/11/2XFH/1_Cached_waterfall.png</waterfall> 
					<checklist>http://www.webpagetest.org/results/09/11/11/2XFH/1_Cached_optimization.png</checklist> 
					<screenShot>http://www.webpagetest.org/results/09/11/11/2XFH/1_Cached_screen.jpg</screenShot> 
				</images>
				<rawData>
					<headers>http://www.webpagetest.org/results/09/11/11/2XFH/1_Cached_report.txt</headers> 
					<pageData>http://www.webpagetest.org/results/09/11/11/2XFH/1_Cached_IEWPG.txt</pageData> 
					<requestsData>http://www.webpagetest.org/results/09/11/11/2XFH/1_Cached_IEWTR.txt</requestsData> 
				</rawData>
			</repeatView>
		</run>
		<run>
			<id>2</id> 
			<firstView>
				<results>
					<URL>http://www.aol.com</URL> 
					<loadTime>4523</loadTime> 
					<TTFB>283</TTFB> 
					<bytesOut>22772</bytesOut> 
					<bytesOutDoc>22772</bytesOutDoc> 
					<bytesIn>398762</bytesIn> 
					<bytesInDoc>398762</bytesInDoc> 
					<requests>44</requests> 
					<requestsDoc>44</requestsDoc> 
					<result>0</result> 
					<render>1845</render> 
					<fullyLoaded>4523</fullyLoaded> 
					<cached>0</cached> 
					<web>1</web> 
					<docTime>4523</docTime> 
					<domTime>0</domTime> 
					<score_cache>48</score_cache> 
					<score_cdn>96</score_cdn> 
					<score_gzip>100</score_gzip> 
					<score_cookies>88</score_cookies> 
					<score_keep-alive>97</score_keep-alive> 
					<score_minify>91</score_minify> 
					<score_combine>75</score_combine> 
					<score_compress>98</score_compress> 
					<score_etags>93</score_etags> 
					<date>1257974140</date> 
				</results>
				<pages>
					<details>http://www.webpagetest.org/result/091111_2XFH/2/details/</details> 
					<checklist>http://www.webpagetest.org/result/091111_2XFH/2/performance_optimization/</checklist> 
					<report>http://www.webpagetest.org/result/091111_2XFH/2/optimization_report/</report> 
					<breakdown>http://www.webpagetest.org/result/091111_2XFH/2/breakdown/</breakdown> 
					<domains>http://www.webpagetest.org/result/091111_2XFH/2/domains/</domains> 
					<screenShot>http://www.webpagetest.org/result/091111_2XFH/2/screen_shot/</screenShot> 
				</pages>
				<thumbnails>
					<waterfall>http://www.webpagetest.org/result/091111_2XFH/2_waterfall_thumb.png</waterfall> 
					<checklist>http://www.webpagetest.org/result/091111_2XFH/2_optimization_thumb.png</checklist> 
					<screenShot>http://www.webpagetest.org/result/091111_2XFH/2_screen_thumb.jpg</screenShot> 
				</thumbnails>
				<images>
					<waterfall>http://www.webpagetest.org/results/09/11/11/2XFH/2_waterfall.png</waterfall> 
					<checklist>http://www.webpagetest.org/results/09/11/11/2XFH/2_optimization.png</checklist> 
					<screenShot>http://www.webpagetest.org/results/09/11/11/2XFH/2_screen.jpg</screenShot> 
				</images>
				<rawData>
					<headers>http://www.webpagetest.org/results/09/11/11/2XFH/2_report.txt</headers> 
					<pageData>http://www.webpagetest.org/results/09/11/11/2XFH/2_IEWPG.txt</pageData> 
					<requestsData>http://www.webpagetest.org/results/09/11/11/2XFH/2_IEWTR.txt</requestsData> 
				</rawData>
			</firstView>
			<repeatView>
				<results>
					<URL>http://www.aol.com</URL> 
					<loadTime>3113</loadTime> 
					<TTFB>360</TTFB> 
					<bytesOut>7426</bytesOut> 
					<bytesOutDoc>7426</bytesOutDoc> 
					<bytesIn>96163</bytesIn> 
					<bytesInDoc>96163</bytesInDoc> 
					<requests>11</requests> 
					<requestsDoc>11</requestsDoc> 
					<result>0</result> 
					<render>682</render> 
					<fullyLoaded>3113</fullyLoaded> 
					<cached>1</cached> 
					<web>1</web> 
					<docTime>3113</docTime> 
					<domTime>0</domTime> 
					<score_cache>25</score_cache> 
					<score_cdn>66</score_cdn> 
					<score_gzip>100</score_gzip> 
					<score_cookies>58</score_cookies> 
					<score_keep-alive>77</score_keep-alive> 
					<score_minify>100</score_minify> 
					<score_combine>100</score_combine> 
					<score_compress>100</score_compress> 
					<score_etags>91</score_etags> 
					<date>1257974152</date> 
				</results>
				<pages>
					<details>http://www.webpagetest.org/result/091111_2XFH/2/details/cached/</details> 
					<checklist>http://www.webpagetest.org/result/091111_2XFH/2/performance_optimization/cached/</checklist> 
					<report>http://www.webpagetest.org/result/091111_2XFH/2/optimization_report/cached/</report> 
					<breakdown>http://www.webpagetest.org/result/091111_2XFH/2/breakdown/</breakdown> 
					<domains>http://www.webpagetest.org/result/091111_2XFH/2/domains/</domains> 
					<screenShot>http://www.webpagetest.org/result/091111_2XFH/2/screen_shot/cached/</screenShot> 
				</pages>
				<thumbnails>
					<waterfall>http://www.webpagetest.org/result/091111_2XFH/2_Cached_waterfall_thumb.png</waterfall> 
					<checklist>http://www.webpagetest.org/result/091111_2XFH/2_Cached_optimization_thumb.png</checklist> 
					<screenShot>http://www.webpagetest.org/result/091111_2XFH/2_Cached_screen_thumb.jpg</screenShot> 
				</thumbnails>
				<images>
					<waterfall>http://www.webpagetest.org/results/09/11/11/2XFH/2_Cached_waterfall.png</waterfall> 
					<checklist>http://www.webpagetest.org/results/09/11/11/2XFH/2_Cached_optimization.png</checklist> 
					<screenShot>http://www.webpagetest.org/results/09/11/11/2XFH/2_Cached_screen.jpg</screenShot> 
				</images>
				<rawData>
					<headers>http://www.webpagetest.org/results/09/11/11/2XFH/2_Cached_report.txt</headers> 
					<pageData>http://www.webpagetest.org/results/09/11/11/2XFH/2_Cached_IEWPG.txt</pageData> 
					<requestsData>http://www.webpagetest.org/results/09/11/11/2XFH/2_Cached_IEWTR.txt</requestsData> 
				</rawData>
			</repeatView>
		</run>
	</data>
</response>
```
## Cancelling Tests
With a test ID (and if required, API key) you can cancel a test if it has not started running.
```
http://www.webpagetest.org/cancelTest.php?test=<testId>&k=<API key>
```

## Location information
You can request a list of locations as well as the number of pending tests for each using the getLocations.php interface:
```
http://www.webpagetest.org/getLocations.php?f=xml
```
```xml
<response>
	<statusCode>200</statusCode>
	<statusText>Ok</statusText>
	<data>
		<location>
			<id>Dulles_IE7</id>
			<Label>Dulles, VA USA</Label>
			<Browser>IE 7</Browser>
			<default>1</default>
			<PendingTests>
				<Total>0</Total>
				<HighPriority>0</HighPriority>
				<LowPriority>0</LowPriority>
			</PendingTests>
		</location>
		<location>
			<id>Dulles_IE8</id>
			<Label>Dulles, VA USA</Label>
			<Browser>IE 8</Browser>
			<PendingTests>
				<Total>0</Total>
				<HighPriority>0</HighPriority>
				<LowPriority>0</LowPriority>
			</PendingTests>
		</location>
	</data>
</response>
```
