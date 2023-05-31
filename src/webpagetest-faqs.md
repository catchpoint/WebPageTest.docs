---
title: 'WebPageTest FAQs'
eleventyNavigation:
  key: WebPageTest FAQs
  order: 3
---
# WebPageTest FAQs
This page answers frequently asked questions about account, test options and billing for WebPageTest Pro. If you are unable to find information about your specific WPT Pro related question, please submit your question via the *Contact Support* option on [*My Account*](https://www.webpagetest.org/account) once you’ve signed into your WebPageTest account. You can also submit your question on our [forums](https://forums.webpagetest.org). Be careful to not share any sensitive account or payment related information there.

## Running Tests
:::faqs
### What is WebPageTest Pro and what is WebPageTest Starter?
**WebPageTest Pro** is our premium, paid subscription plan that unlocks powerful functionality and features for WebPageTest including, but not limited to: bulk testing, premium testing locations, high priority in testing queues, the WebPageTest API, experiments, dedicated support and private tests.

**WebPageTest Starter** is our free plan available to all users to run WebPageTest runs that provide all the performance metrics that WebPageTest has provided for years plus access to the new Opportunities report.

Both WebPageTest Starter and Pro give you access to save your Test History for 13 months.

### How do you define a test run?
*FOR ALL PLANS*, a test on WebPageTest is comprised of one or more test runs. A test run is defined as a single page load within a test. Here are a few examples:

- A test from a single browser and location, with 3 test runs, first view only, counts as three test runs. (3 runs * 1 load per run)
- A test from a single browser and location, with 5 test runs, first and repeat views for each run, counts as 10 test runs (5 runs * 2 loads per run)
- A test from a single browser and location, with 4 tests runs, first and repeat views for each run, and an additional Lighthouse run, counts as 9 test runs ( (4 runs * 2 loads per run) + 1 Lighthouse run)
- An experiment from a single browser and location, with 2 test runs, first view only for each run, counts as 4 runs (2 runs * 2 tests (one for the experiment, one for the control run).

### What countries and browsers do you support with WebPageTest?
WebPageTest is always up-to-date on the current version of every browser and you can test on Chrome (stable, beta, canary), Firefox (stable, beta, ESR), Microsoft Edge (dev) and Brave.

**WebPageTest Starter** gives you access to 30 locations worldwide, including mainland China.

**With WebPageTest Pro**, you get access to 11 more premium locations. WebPageTest Pro also supports mobile emulation testing. You can test mobile content by emulating an Android browser by passing `mobile=1` as an API option.

### What are Opportunities and Experiments?
Opportunities and Experiments are a powerful combination that will let you quickly identify areas of improvement for your website and test the impact of any relevant optimizations without ever having to write a line of code.

Opportunities are recommendations that are broken down into three categories:

- Quickness
- Usability
- Resilience

Opportunities are a free feature of WebPageTest provided to all users.

For every opportunity, you will be presented with some combination of tips (suggestions for what to do to improve) and experiments (the ability to apply optimizations right within the WebPageTest sandbox). When you choose to run an experiment, WebPageTest applies the optimization in our sandbox environment and then runs a test (alongside a control test which uses our sandbox environment without applying the optimization), and presents you with results showing you how significant, or insignificant, the improvement was.

Experiments are a paid feature and are only available to WebPageTest Pro subscribers.

### What is Bulk Testing?
Bulk Testing lets you quickly run tests using the same settings, against a large number of URLs all at once. You are able to either provide a list of URLs or upload a CSV of URLs to test. Each URL will be tested using the settings you have defined, and the final results for each test will be presented as usual for further analysis. *Bulk Testing is only available to WebPageTest Pro subscribers.*

### What is a Private Test?
With WebPageTest Pro, you have the ability to run a private test. A private test is a test that can only be accessed by the account owner—if anyone who is not the account owner tries to access the test information, they will be presented with an error. *Private Tests are only available to WebPageTest Pro subscribers.*

### How long will my test results be stored?
You will have access to all the tests you run via as part of both WebPageTest Pro and Starter plans for 13 months. This also enables you to monitor performance over time and look at year-over-year performance analyses and trends.

### What metrics can I access with Pro?
WebPageTest provides accurate, in-depth analysis of your page with hundreds of metrics collected on every run, as well as the ability to set and define custom metrics by running JavaScript at the end of any test. You also get powerful visual features such as the film strip view as well as video capture.

### Is there a daily limit for the test runs?
There is a monthly limit on the total tests you can run with the WebPageTest Pro and WebPageTest Starter Plans, based on the subscription plan you choose. There is currently no daily limit on top of that monthly limit.

### Do you provide any developer integrations that I can use with WebPageTest Pro?
There are several existing first-party integrations built with the WebPageTest API, including our [GitHub Action](https://docs.webpagetest.org/integrations/#webpagetest-github-action), [Slack Bot](https://docs.webpagetest.org/integrations/#webpagetest-slack-bot), [Visual Studio Code Extension](https://docs.webpagetest.org/integrations/#webpagetest-visual-studio-code-extension), and our [Node.js API wrapper](https://docs.webpagetest.org/integrations/#webpagetest-api-wrapper-for-nodejs) (the preferred way to interact with our API).

There are also numerous integrations [built and maintained by our community members](https://docs.webpagetest.org/integrations/#community-built-integrations).

You can find more ideas of how to use the API in our[] constantly growing recipes repository](https://github.com/WebPageTest/WebPageTest-API-Recipes).

### Can I add more users to my WPT Pro Pro or Starter account?
Currently, we only support one user account to sign in and set up your account for WebPageTest Starter or to purchase the WebPageTest Pro subscriptions. However, if you use the WebPageTest API under the Pro subscription, you can generate up to 30 API Consumer keys for multiple use cases and teams, from a single WebPageTest Pro account. Generate a new key by clicking on “+ New API Key” in your account page.

We have plans to support adding multiple users and defining roles in the future.

### Is there a free trial where I can test WebPageTest Pro?
We provide 1 free experiment per test for you to check out WebPageTest Experiments. You can also run Experiments from our in-house test page called The Metric Times where we have builti in anti-patterns for easy testing.

We do not have a free trial option apart from the above 2 options, since  WebPageTest Pro gives you all the [metrics](https://www.webpagetest.org/themetrictimes/index.php) (except for the option to run the experiments) you see on a typical WebPageTest test result page as well as in the JSON today for any test you run on www.webpagetest.org.

For example, you can:
- Run a test on www.webpagetest.org.
- Click on **'View JSON'** under **Export Files** on any test result. You can see the metrics that a test run via the WebPageTest API will provide.
- You can also check out our [API integrations](https://docs.webpagetest.org/integrations/) to integrate WebPageTest into your developer workflow, build visualizations, set performance budgets, see code changes and more.

[Contact us](https://www.product.webpagetest.org/contact) if you want to discuss a custom plan or run more than 20,000 test runs a month.

Here are a few more resources you may find helpful:
- [Getting started on API](https://docs.webpagetest.org/api) which also includes information about all the metrics you can pull with the API
- [External post](https://css-tricks.com/webpagetest-api/) by CSS Tricks about running tests using the API
- New features and updates to WebPageTest on [Change Log](https://docs.webpagetest.org/change-log/) and [WebPageTest Blog](https://blog.webpagetest.org/)

### Can I use WebPageTest API to get Core Web Vitals metrics?
Yes, the WebPageTest API provides comprehensive details when you run a test and access the Core Web Vitals metrics that come along with that test. You can measure, report and fix the Core Web Vital metrics as well as other performance areas to improve user experience. WebPageTest also pulls in the URL-specific field data from Chrome User Experience Report (CrUX) and includes it with the results.

This is helpful to see how representative the test is of the Chrome users' experience. The current test results are marked on the top side of the CrUX bars. p75 field data below.

Check out the [Guide to Core Web Vitals](https://product.webpagetest.org/core-web-vitals) for more information as well as tips to tackle Core Web Vitals issues.

### Does WebPageTest support testing on mobile devices?
For mobile testing, we currently recommend using mobile emulation by passing **"mobile=1"** as an API parameter. If you are using the [API wrapper for NodeJS](https://docs.webpagetest.org/integrations/#webpagetest-api-wrapper-for-nodejs), then you can use **emulateMobile: true**

### How can I see how many tests I have remaining?
You can always see how many tests you have remaining in your current month by looking at the **Remaining Runs** value under the **Subscription Plan** section of your **My Account** page.

You can also programmaticaly check how many tests you have remaining by using the [testBalance.php](/api/reference/#checking-remaining-test-balance) endpoint of the API itself.

### Are there any code examples I can see for how to use the API?
We have an [ever-growing collection of common recipes for the WebPageTest API available on GitHub](https://github.com/WebPageTest/WebPageTest-API-Recipes). If you don't see the recipe you're looking for, [file an issue](https://github.com/WebPageTest/WebPageTest-API-Recipes/issues) and we'll see if it's something we can add.

### Are DNS lookups cached on the testing machine?

The DNS cache is cleared before a run so all DNS lookups can be part of the test. If this is not the desired behavior, there is [a workaround](https://twitter.com/TimVereecke/status/1319615019680735232).

:::

## Billing
:::faqs
### How will I be charged?
For monthly and annual subscriptions plans, your credit card will be automatically billed when you sign up and purchase the subscription, you’ll be able to access your payment history under **Billing History** in **My Account** on www.webpagetest.org. All subscription plans can be canceled at any time without penalty. Once you choose to cancel, it stops the WebPageTest API subscription from auto-renewing for the next billing cycle. You’ll continue to have access to run tests for that plan, until the end of your current billing period.

For Custom Enterprise plans where you want to run more than 20,000 tests per month, please **[contact us](https://www.product.webpagetest.org/contact)**.

If you are based out of the United States of America, You will be charged in US Dollars, but the exact amount you will see on your credit card statement may vary, depending on foreign exchange rates and any foreign transaction fees your bank may impose.

### What payment methods do you support?
We accept payment via Credit Card (VISA, Mastercard, American Express, JCB, Maestro, Discover, Diners Club International, UnionPay). Please ensure the accuracy of your payment method and that it is properly funded to avoid any issues with payment acceptance.

We do not accept and will not ask you to provide payments with cash or a physical check.

For Custom Enterprise plans, requiring more than 20,000 tests per month, please **[contact us](https://www.product.webpagetest.org/contact)**.

### How do I change the credit card that I have on file or update my payment method?
On My Account page, you will be able to edit your credit card details and update your payment method. Please note that these changes made to your payment method will reflect on your next billing receipt. Please ensure the accuracy of your payment method and that it is properly funded to avoid any issues with payment acceptance.

### What happens to my charge if I am purchasing a plan from a country outside the United States?
You will be charged in US Dollars, but the exact amount you will see on your credit card statement may vary, depending on foreign exchange rates and any foreign transaction fees your bank may impose.

### How do I view my payment history?
You can access your payment history by logging into your account on www.webpagetest.org under the **Billing History** view on the **My Account** page.  Be sure to keep a valid email on file and check your spam folder for emailed copies of your charges.

### Why was my payment declined?
A payment can be denied for a variety of reasons, like insufficient funds, incorrect/incomplete credit card information, or your card is not recognizing the charge on a new vendor. It’s best to contact your bank to advise them that the charge is valid and to allow charges from WebPageTest/Catchpoint.

Here are steps to ensure your payment goes through:

- Be sure to double check the accuracy of the payment method information that you have selected. Ensure that card number, account number, expiration, billing address, and billing phone number have all been entered correctly according to your records.
- Ensure that you have not exceeded your credit limit on your credit card.
- Check with your financial provider to ensure that there are no internet purchase restrictions or restrictions in place due to your order being outside the range of your normal spending habits. Some institutions will flag abnormally large purchase for a given account.
- Contact your financial institution if problems persist.

### When will I be charged for my purchase?
You will be charged at the time of purchase for the subscription plan you chose. Please allow additional time for your financial institution to post the charge on your bank account.

### What do I do if I have any immediate billing questions or if I need to speak with someone regarding charges on my account?
Currently, we provide email support for all your WebPageTest Pro related questions around account, API tests, and billing. You can contact us anytime. Simply select **Contact Support** on the top right section of **My Account** and submit your query. Our support specialist will get back to you within 2-3 business days.

### What do I do if I did not sign up for your service and suspect a fraudulent charge has been made on my credit card?
Please contact our support team and provide us with your name, contact information, date of the charge, and the amount. Select **Contact Support** on the top right section of **My Account** and submit your query.

### Can I use multiple credit cards for my monthly/annual payment?
We currently do not support adding multiple credit cards to your subscription plan. We are working on including this in our future releases. Please ensure that one selected payment method will be sufficient for your purchase in order to ensure payment authorization. You can also change your payment method by editing the payment details on your **My Account** page. Please note we do not accept and will not ask you to provide payments with cash or a physical check.

### Why was the price of my plan higher than expected?
If you purchased the subscription during our introductory promo period, you’ll be billed the original cost of subscription in the next billing cycle after the promo period. For any other discrepancy, please contact your bank.

### How often will I be charged for this service?
Your billing date will correspond with the day that you first purchased the plan, and auto-renewed depending on the subscription term. You will be charged in accordance with your selected plan. This will occur monthly if you select a monthly plan, or it will occur on an annual basis if you have selected an annual plan. If you purchased the monthly subscription on the 3rd of a month, unless otherwise canceled, your subscription will automatically renew, and you will always be billed on the 3rd day of the first month in a billing cycle. If you purchased the monthly subscription on the 29th, 30 or 31st of the month, you will be billed on the last day of the first month in a billing cycle.

### How secure is my payment?
All payments are securely processed over HTTPS and your card information never touches our servers. All payment processing is done by a level 1 PCI compliant third-party credit card processor. All details are sent over SSL, which is a 2048-bit RSA-encrypted channel. Our payment gateway also adheres to card networks’ requirements and regulations surrounding payment processing.

### How do I view my payment history?
You’ll be able to access your payment history under **Billing History** in **My Account** on www.webpagetest.org.

### How can I change the billing contact?
You can change your billing details and payment method by editing the payment details on your **My Account** page. Please note we do not accept and will not ask you to provide payments with cash or a physical check.

### Where can I find a list of different plans and their pricing?
All our subscription plans offer the same features and capabilities, and the pricing is based on the total tests you want to run per month. You can view our subscription plans when you [sign up](https://www.webpagetest.org/signup) or [log in](https://www.webpagetest.org/login) and go to **My Account** on https://www.webpagetest.org/ For Custom Enterprise plans where you want to run more than 20,000 tests per month, please **[contact us](https://www.product.webpagetest.org/contact)**.

### What is the cancellation policy?
You can choose to cancel anytime during the subscription period. Once you choose to cancel, it stops the WPT API subscription from auto-renewing for the next billing cycle. You’ll continue to have access to run tests for that plan, until the end of your current billing period. When you cancel, you cancel only the subscription. You’ll continue to have access to the WebPageTest account and history of the manual tests (under **Test History**) that you ran while signed in to that account. Please note all subscriptions are automatically renewed unless explicitly cancelled.

### Why does my credit card/bank statement show a charge for Braintree.com?
Braintree is our payment gateway provider for the site, so your charge description might show as a charge to Braintree. It is up to your individual payment provider to determine the best description for the charge, and the description is subject to change after the typical 7-day settlement period. If you should have any questions, please contact your payment provider after the settlement period to see how they handle the charge description.

### Can I add more users to the plan?
Currently, we only support one user account to sign in and set up your account to purchase the WebPageTest API. However, you can generate up to 30 keys for multiple use cases and teams, from a single WebPageTest API account. Generate a new key by clicking on **+ API consumer**.

We have plans to support adding multiple users and defining roles in the future.
:::
