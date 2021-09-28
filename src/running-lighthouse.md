---
title: "Running Lighthouse"
description: WebPageTest can run a Lighthouse test on a given URL, either by itself, or as an additional test alongside your WebPageTest results.
eleventyNavigation:
  key: Running Lighthouse
  order: 2
---
# Running Lighthouse
WebPageTest can run a [Lighthouse](https://developers.google.com/web/tools/lighthouse) test on a given URL, either by itself, or as an additional test alongside your WebPageTest results. 

To use WebPageTest to run a Lighthouse test during manual testing, you need to check the "Capture Lighthouse Report" box under the Advanced > Chromium settings. To run a Lighthouse test using WebPageTest's API, you will need to set the `lighthouse` parameter to `1` when making your request. This will tell WebPageTest to test your page using the core WebPageTest testing functionality, according to the settings you configure, and then run Lighthouse as a separate result, returning the results of both.

![](/img/lighthouse-capture-box.png)

Alternatively, if you want to _only_ get Lighthouse results and not the usual WebPageTest test results, you can go to the [Lighthouse test landing page](https://www.webpagetest.org/lighthouse). This will tell WebPageTest to only run Lighthouse on the WebPageTest testing agents, bypassing the usual analysis WebPageTest provides.

![](/img/lighthouse-test-type.png)


## The Lighthouse test environment
Regardless of how you trigger the Lighthouse test, the test will always be run:

- in Chrome
- as an emulated Motorola G4 device
- over a simulated 3G Fast connection

These settings are carefully configured to align with [Lighthouse's mobile network configuration](https://github.com/GoogleChrome/lighthouse/blob/master/docs/throttling.md#the-mobile-network-throttling-preset).

::: note
By default, Lighthouse uses _simulated throttling_: the test gets run without throttling, and then Lighthouse simulates what a throttled load might look like based on the unthrottled results.

WebPageTest, on the other hand, uses _packet-level_ throttling for all tests, including Lighthouse tests run through WebPageTest. Because packet-level throttling enables network shaping at the packet-level, it's a far more accurate modeling of real network-conditions (there's a fascinating study by the [Lighthouse team about throttling accuracy](https://docs.google.com/document/d/1BqtL-nG53rxWOI5RO0pItSRPowZVnYJ_gBEQCJ5EeUE/edit) if you want to wade into the weeds on the topic).

The differences in these approaches means that, even under the same test configuration, Lighthouse scores run elsewhere may not match up with Lighthouse scores collected from WebPageTest.
:::

Since Lighthouse tests always run with their own configuration, and are an entirely different type of test from the core WebPageTest test, Lighthouse tests are always treated separately during the testing process.

If you run both a WebPageTest test and a Lighthouse test, WebPageTest will first test the page using its own test engine, based on the configuration you provided. Once that test is complete, WebPageTest will then reconfigure the test environment to match the mobile configuration and then run the Lighthouse test separately. As a result, you will see different numbers for the metrics reported in the Lighthouse run and the metrics reported by WebPageTest.

::: caution
There's currently a bug [in Chrome](https://bugs.chromium.org/p/chromium/issues/detail?id=1241133) that makes testing without using `--headless` mode very flaky. To work around this, our Lighthouse tests are currently run in `--headless` mode which may have a slight impact on test results.
:::

## Consistency of results
Lighthouse scores are based on the collection of different performance metrics. Since those metrics can vary dramatically based on the device and network being used, comparing Lighthouse scores collected from different tools, or especially collected directly from your browser's devtools, is bound to result in a high degree of inconsistency in the results.

While some variability between tests is to be expected, by providing a consistent test environment for all Lighthouse runs, WebPageTest helps to minimize that variability and provide a realistic and repeatable point of comparison.



