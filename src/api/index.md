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

Once created, your API keys are always available in your [account dashboard](https://www.webpagetest.org/account), under **API Consumers**.

If you can't see any API Keys, that means you don't currently have any and you will need to [create a new one](/api/keys/#obtaining-your-keys).

## 2. Submit your first test
To make sure your API key is ready to go, let's get your first test submitted. It takes some time for a test to complete.

Copy and paste the following command into your terminal, inserting your api key in place of the placeholders:

```bash
curl https://www.webpagetest.org/runtest.php?url=https://www.webpagetest.org&k={YOUR_API_KEY}&f=json
```

The request above will:

- Submit a test for www.webpagetest.org (using the `url` parameter)
- Authenticate using your API key (using the `k` parameter)
- Request a JSON response (using the `f` parameter)

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

## 3. Navigate to the result page
All that's left is to view the test result!

If you go to the "userUrl" from the JSON result, you will see the normal "Test waiting" page that will refresh and load the test results when it completes. If you navigate to the "jsonUrl" in a browser you should see a JSON view of the test status.  If you refresh the page periodically you will see the status change until it finally returns the full test result as JSON.

## What comes next?
Congratulations! You've just successfully submitted your first test using the WebPageTest API. Here's a few more resources to help you take your next steps:

- Dig deeper into the [API reference guide](/api/reference/) to see what parameters are available to you
- Check out some of the [existing integrations built around WebPageTest](/integrations/) from both the WebPageTest team as well [as the WebPageTest community](/integrations/#officially-supported-integrations)
- View [our collection of common API recipes](https://github.com/WebPageTest/WebPageTest-API-Recipes) (using the Node.js wrapper)
