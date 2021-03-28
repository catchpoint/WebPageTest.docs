---
title: 'WebPageTest API Quickstart'
eleventyNavigation:
  key: API
  order: 1
---
# WebPageTest Quickstart
The WebPageTest [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) API gives you full access to the power and depth of WebPageTest's analysis, letting you pull performance data into your existing workflows and processes.

In this guide, we'll walk you through the process of getting up and running with you very first API test.

## 1. Get your API Key

Once created, your API keys are always available in your [account dashboard](https://app.webpagetest.org/ui/wpt/myAccount), under **API Consumers**.

If you can't see any API Keys, that means you don't currently have any and you will need to [create a new one](/api/keys/#obtaining-your-keys).

## 2. Submit your first test
To make sure your API key is ready to go, let's get your first test submitted. It takes some time for a test to complete, but instead of [programmatically accessing the results](/api/reference/#getting-test-results), we'll use the `notify` parameter to tell the API to send us an email when the test has completed.

Copy and paste the following command into your terminal, inserting your api key and email address in place of the placeholders:

```bash
curl https://www.webpagetest.org/runtest.php?url=https://www.webpagetest.org&k={YOUR_API_KEY}&f=json&notify={YOUR_EMAIL}
```

The request above will:

- Submit a test for www.webpagetest.com (using the `url` parameter)
- Authenticate using your API key (using the `k` parameter)
- Request a JSON response (using the `f` parameter)
- Request that the API send an email to your email address when the test is complete (using the `notify` parameter)

If all goes well, you should get a JSON response, similar to the one below, telling you the test has been successfully submitted (`statusCode`=200), and providing you with the `testId` as well as several links for digging into results once the test has been completed.

```json
{
   "statusCode": 200,
   "statusText": "Ok",
      "data": {
         "testId": "210328_XiVQ_b694021b2a24ca1912dae50fb58b5861",
         "jsonUrl": "https://www.webpagetest.org/jsonResult.php?test=210328_XiVQ_b694021b2a24ca1912dae50fb58b5861",
         "xmlUrl": "https://www.webpagetest.org/xmlResult/210328_XiVQ_b694021b2a24ca1912dae50fb58b5861/",
         "userUrl": "https://www.webpagetest.org/result/210328_XiVQ_b694021b2a24ca1912dae50fb58b5861/",
         "summaryCSV": "https://www.webpagetest.org/result/210328_XiVQ_b694021b2a24ca1912dae50fb58b5861/page_data.csv",
         "detailCSV": "https://www.webpagetest.org/result/210328_XiVQ_b694021b2a24ca1912dae50fb58b5861/requests.csv"
      }
}
```

## 3. Check your email
All that's left is to check your email!

Once the test has completed running, you'll receive an email at the email address you provided using the `notify` parameter. The email will let you know the test has completed, provide you with a link to the full results, and give you a brief summary of potential optimizations.

Congratulations! You've just successfully submitted your first test using the WebPageTest API. You can dig deeper into the [API reference guide](/api/reference/) for your next steps, or check out some of the [existing integrations built around the API](/api/integrations/) and maybe even [build your own](/api/integrations/#officially-supported-integrations).