---
title: 'Metrics'
eleventyNavigation:
  key: Metrics
  order: 1
---
# Metrics
## Page-level Metrics
These are the top-level measurements captured and displayed for the overall page. 
### Load Time
The Load Time is measured as the time from the start of the initial navigation until the beginning of the window load event (onload).

### Fully Loaded
The Fully Loaded time is measured as the time from the start of the initial navigation until there was 2 seconds of no network activity after Document Complete.  This will usually include any activity that is triggered by javascript after the main page loads.
### First Byte
The First Byte time (often abbreviated as TTFB) is measured as the time from the start of the initial navigation until the first byte of the base page is received by the browser (after following redirects).
### Start Render
The Start Render time is measured as the time from the start of the initial navigation until the first non-white content is painted to the browser display.
### Speed Index
The Speed Index is a calculated metric that represents how quickly the page rendered the user-visible content (lower is better).  More information on how it is calculated is available here: Speed Index
### DOM Elements
The DOM Elements metric is the count of the DOM elements on the tested page as measured at the end of the test.

## Request-level Metrics
These are the measurements captured and displayed for each request.
