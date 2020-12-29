# Page-level Metrics

These are the metrics and measurements captured at a page-level and exposed in the JSON data.

## Technical Page Metrics
* **TTFB** - Time to First Byte from when the navigation started until the first byte of page content is returned (after redirects)
* **loadTime** - (also fullyLoaded) Time to fully load the page
* **docTime** - Time until the document is complete (onLoad event)
* **bytesIn** - Number of bytes received
* **bytesInDoc** - Number of bytes received before the document complete time (onLoad event)
* **bytesOut** - Number of bytes transmitted
* **bytesOutDoc** - Number of bytes transmitted before the document complete time (onLoad event)
* **loadEventStart** - (also chromeUserTiming.loadEventStart) Start time of the last main-frame load event (before the event handlers run)
* **loadEventEnd** - (also chromeUserTiming.loadEventEnd) End time of the last main-frame load event (after the event has been handled)
* **domContentLoadedEventStart** - (also chromeUserTiming.domContentLoadedEventStart) Start time of the last main-frame domContentLoaded event (before the event handlers run)
* **domContentLoadedEventEnd** - (also chromeUserTiming.domContentLoadedEventEnd) End time of the last main-frame domContentLoaded event (after the event has been handled)
* **chromeUserTiming.navigationStart** - Chrome-reported time of the navigation start (RAIL)
* **chromeUserTiming.fetchStart** - Chrome-reported time of the fetch start (RAIL)
* **chromeUserTiming.responseEnd** - Chrome-reported time of the end of the initial response (RAIL)
* **domLoading** - (also chromeUserTiming.domLoading) - Browser-reported time of the time when the DOM state changed to loading (RAIL)
* **domInteractive** - (also chromeUserTiming.domInteractive) Browser-reported time of the time when the DOM state changed to interactive - not to be confused with TimeToInteractive (RAIL)
* **domComplete** - (also chromeUserTiming.domComplete) Browser-reported time of the time when the DOM state changed to complete (RAIL)
* **basePageSSLTime** - Time spent negotiating TLS for the base page
* **connections** - Number of connections used to load the page content
* **requests** - (also requestsFull) Number of individual requests to load the page
* **requestsDoc** - Number of requests before the document complete time (onLoad event)
* **responses_200** - Number of requests that resulted in a 200 response code
* **responses_404** - Number of requests that resulted in a 404 result code
* **responses_other** - Number of requests that resulted in a response code other than 200 or 404
* **effectiveBps** - The effective bandwidth for the test (bytes over the test time)
* **effectiveBpsDoc** - The effective bandwidth for the test until the document complete time (onLoad event)
* **server_rtt** - Estimated Round Trip Time to the server for the base page
* **domTime** - (deprecated) Time to the point where a specified DOM element appeared on the page

## Visual Metrics
* **render** - Start render time. When the first onscreen content change happened based on the video capture data
* **SpeedIndex** - Histogram-based SpeedIndex calculated from video capture
* **chromeUserTiming.LargestContentfulPaint** - (Chrome Web Vitals Measurement) Time to the largest contentful paint
* **chromeUserTiming.CumulativeLayoutShift** - (Chrome Web Vitals Measurement) amount of content shift during the page load
* **firstPaint** - (also PerformancePaintTiming.first-paint) Browser-reported first paint time (from performance timing)
* **firstContentfulPaint** - (also PerformancePaintTiming.first-contentful-paint) Browser-reported first contentful paint time (from performance timing)
* **firstImagePaint** - Browser-reported first image paint time (from performance timing)
* **lastVisualChange** - Time of the last visual change of any kind based on the video capture
* **visualComplete** - When the page was 100% visually complete for the first time based on the video capture and comparing page histograms (SpeedIndex completeness)
* **visualComplete85** - When the page was 85% visually complete for the first time based on the video capture and comparing page histograms (SpeedIndex completeness)
* **visualComplete90** - When the page was 90% visually complete for the first time based on the video capture and comparing page histograms (SpeedIndex completeness)
* **visualComplete95** - When the page was 95% visually complete for the first time based on the video capture and comparing page histograms (SpeedIndex completeness)
* **visualComplete99** - When the page was 99% visually complete for the first time based on the video capture and comparing page histograms (SpeedIndex completeness)
* **chromeUserTiming** - A list of the raw chrome-reported blink and rail timing events
* **chromeUserTiming.LargestImagePaint** - Chrome-reported largest image paint (subset of largest contentful paint)
* **chromeUserTiming.LargestTextPaint** - Chrome-reported largest text paint (subset of largest contentful paint)
* **chromeUserTiming.firstContentfulPaint** - Chrome-reported first contentful paint
* **chromeUserTiming.firstImagePaint** - Chrome-reported first image paint (subset of first contentful paint)
* **chromeUserTiming.firstTextPaint** - Chrome-reported first text paint (subset of first contentful paint)
* **chromeUserTiming.firstPaint** - Chrome-reported first paint time
* **LayoutShifts** - Array of each time the page layout shifted. Includes the time of the shift, "score" (amount) of the shift and the cumulative layout shift score at that time
* **firstMeaningfulPaint** - (also chromeUserTiming.firstMeaningfulPaint, deprecated - use firstContentfulPaint) Chrome-reported calculation of when the browser first painted the "meaningful" content
* **titleTime** - (deprecated) Time until the page title became available
* **aft** - (deprecated) Above-The-Fold Time

# Interactivity Metrics
* **TotalBlockingTime** - (Chrome Web Vitals Metric) Total amount of time where the main thread was blocked by long tasts after the initial content was rendered
* **maxFID** - The largest long-task after the initial content was rendered (longest time the user's input can be blocked)
* **TimeToInteractive** - The latest point where the page became Interactive and remained interactive for over 5 seconds
* **LastInteractive** - The latest point where the page became Interactive (may not have been interactive for the required 5 seconds)
* **TTIMeasurementEnd** - The end time of the measurements for interactive periods
* **longTasks** - List of the start and end times of all main-thread tasks that tool longer than 50ms
* **interactivePeriods** - (deprecated - use longTasks instead) List of all of the start and end times where the main thread was considered "interactive"

## Javascript and CPU timings
* **cpu.\*** - Main thread time spent by each category of timeline activity
* **cpuTimes** - Array of main-thread CPU timings by each category of timeline activity
* **cpuTimesDoc** - Array of main-thread CPU timings by each category of timeline activity that occurred before the document complete time (load event)
* **fullyLoadedCPUms** - CPU time used to load the page (reported by the OS)
* **fullyLoadedCPUpct** - Average CPU utilization percent to load the page
* **v8Stats** - V* runtime call stats (if enabled)

## Page Information
* **URL** - URL that was used to start the test
* **document_URL** - Browser-reported URL of the final document
* **document_hostname** - Browser-reported hostname of the final document
* **document_origin** - Browser-reported origin of the final document
* **final_url** - Final URL navigated to by the browser
* **base_page_cdn** - Detected CDN used for serving the base page
* **base_page_cname** - CNAME for the hostname used for serving the base page (if there is one)
* **base_page_dns_server** - Authoratative DNS server used by the domain for the base page
* **base_page_ip_ptr** - Reverse IP lookup of the IP address that served the content for the base page
* **detected** - Raw output from Wappalyzer with the categories of content detected and the list of detected content (and their versions)
* **detected_apps** - Flattened list of Wappalyzer detected application versions by application name
* **domElements** - Number of DOM elements on the page
* **bigImageCount** - Number of "large" images on the page
* **smallImageCount** - Number of "small" images on the page
* **maybeCaptcha** - A possible Captcha challenge page was detected
* **Images** - List of the images on the page DOM including the image URL, dimensions and display dimensions
* **breakdown** - Array of the bytes and request counts by content type
* **domains** - List of domains used to load content, the number of requests, bytes and connections used as well as the CDN if one was detected.

## Browser State
* **browser_name** - Name of the browser being used in the test (i.e. Chrome)
* **browser_version** - (also browserVersion) Version string for the browser (i.e. 85.0.4183.102)
* **Colordepth** - Screen color depth as reported by the browser
* **Dpi** - Screen DPI as reported by the browser
* **Resolution** - Screen resolution of the test machine as reported by the browser
* **cached** - 1 for repeat view tests, 0 for first view

# Lighthouse Summary Metrics
* **lighthouse.Accessibility** - Lighthouse Accessibility score (0-1)
* **lighthouse.BestPractices** - Lighthouse Best Practices score (0-1)
* **lighthouse.ProgressiveWebApp** - Lighthouse PWA score (0-1)
* **lighthouse.SEO** - Lighthouse SEO score (0-1)
* **lighthouse.Performance** - Lighthouse Performance score (0-1)
* **lighthouse.Performance.cumulative-layout-shift** - Cumulative Layout Shift as reported by Lighthouse
* **lighthouse.Performance.first-contentful-paint** - First Contentful Paint as reported by Lighthouse
* **lighthouse.Performance.interactive** - Time to Interactive as reported by Lighthouse
* **lighthouse.Performance.largest-contentful-paint** - Largest Contentful Paint as reported by Lighthouse
* **lighthouse.Performance.speed-index** - Speed Index as reported by Lighthouse
* **lighthouse.Performance.total-blocking-time** - Total Blocking Time as reported by Lighthouse

# Optimization Checks/Grades
* **optimization_checked** - 1 if the optimization checks were run as part of the test (0 otherwise)
* **score_cache** - Score for caching static content (0-100)
* **score_cdn** - Score for using a CDN for static content (0-100)
* **score_compress** - Score for properly compressing lossy images (JPEG 85 reference point)
* **image_savings** - Byte savings for properly compressing images
* **image_total** - Total image bytes
* **score_gzip** - Score for properly compressing text content
* **gzip_savings** - Byte savings for properly compressing text content
* **gzip_total** - Total text content size
* **score_keep-alive** - Score for properly using keep-alive when more than one request is made to a given origin
* **score_progressive_jpeg** - Score for using progressive JPEGs
* **jsLibsVulns** - List of Snyk-detected vulnerable Javascript libraries
* **securityHeaders** - Score for the SNYK security headers check
* **score_etags** - (deprecated)
* **score_cookies** - (deprecated) Score for not setting cookies on domains for static resources
* **score_combine** - (deprecated) Score for combining separate JS files
* **score_minify** - (deprecated) Score for the minification check for Javascript and HTML
* **minify_savings** - (deprecated) Byte savings possible (pre-compression) by minifing script and HTML
* **minify_total** - (deprecated) Total size of content that is subject to minifying

# Instrumented Metrics
* **userTime** - Time of the last user timing mark event
* **userTime.\*** - Latest timestamp for each user timing mark
* **userTimes** - Array of user timing marks and their timestamps
* **userTimingMeasure.\*** - Duration for each user timing measure
* **userTimingMeasures** - Array of user timing measures (includes start times and durations)

# Test Information
* **result** - Test result (0 and 99999 are success, anything else is a failure)
* **eventName** - Name of the test event step (for multi-step tests)
* **tester** - ID of the test machine that ran the test
* **date** - Epoch time (in ms) when the test was started
* **numSteps** - Number of steps in the test (for scripted tests)
* **run** - Run number in the case of a multi-run test
* **step** - Step number of the current step
* **test_run_time_ms** - Amount of time it took to run the test and process the data
* **start_epoch** (deprecated) - Epoch time when the test was started

# Misc
* **blinkFeatureFirstUsed** - Array of all of the blink features that were detected and when that feature was first used. Includes the freture name and number
* **consoleLog** - Array of console log messages including the message text, level and message source
* **custom** - List of the names of the custom metrics (individual metrics will be recorded at the top-level)
* **main_frame** - ID of the main frame
* **videoFrames** - Information about each unique video frame for the video of the page load. Includes URL to the video frame image, timestamp and the calculated visual completeness
* **final_base_page_request** - Index number of the request that was the request for the base page (after redirects)
* **final_base_page_request_id** - Request ID of the request that was the request for the base page (after redirects)
