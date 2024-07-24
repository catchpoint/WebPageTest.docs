---
title: "Testing for Frontend SPOF"
description: WebPageTest can run a Lighthouse test on a given URL, either by itself, or as an additional test alongside your WebPageTest results.
eleventyNavigation:
  key: Testing for Frontend SPOF
  order: 2
---
# Testing for Frontend SPOF
Frontend Single Points of Failure (SPOF) can critically impact web performance, given the continuing rise in 3rd-party widgets on pages it is becoming increasingly important as it is causing delays or complete failure in page loading if third-party scripts or resources fail. Identifying and mitigating these risks is essential for maintaining a resilient website.  

WebPageTest simulates failure of specified domains by rerouting requests to `blackhole.webpagetest.org`, which silently drops all traffic. A blackhole server behaves as expected when testing the failure mode for third-party widgets. 

## Steps to Test

### Using SPOF Tab
Enter all hosts that you want to fail against your test and hit start test.

![](/img/spof-tab.png)

### Using Scripting
- **Initial Test**: Test the site as you normally would, ensuring the "capture video" option is enabled. It's also helpful to label the test for easy identification. 
- **Script for Failure Simulation**: To capture the broken version of the site, use a script to reroute the domains to the blackhole server and then navigate to the page you want to test. Here's an example script:  
  
```markup
setDnsName ajax.googleapis.com blackhole.webpagetest.org 
setDnsName apis.google.com blackhole.webpagetest.org 
setDnsName www.google-analytics.com blackhole.webpagetest.org 
setDnsName connect.facebook.net blackhole.webpagetest.org 
setDnsName platform.twitter.com blackhole.webpagetest.org 
navigate your.url.com 
```
Paste the script into the script box, ensure "capture video" is checked. 

- **Comparing Results**: Go to the test history, select the tests you ran, and click compare. Logging into the site before submitting tests helps organize your history. 