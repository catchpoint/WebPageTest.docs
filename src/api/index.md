---
title: 'WebPageTest API Quickstart'
eleventyNavigation:
  key: API
  order: 1
---
# WebPageTest Quickstart
The WebPageTest [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) API gives you full access to the power and depth of WebPageTest's analysis, letting you pull performance data into your existing workflows and processes.

> <div><br/></div>
> Effective June 15th, we will be transitioning from AWS (Amazon Web Services) to GCP (Google Cloud Platform) and your tests will be retargeted to the new locations based on the mapping below.
> <div><br/></div>
>
> | Current Location Name |Current Agent Name | New Location Name | New Agent Name |New External IP|
> |---|---|---|---|---|
> |Singapore - EC2 |ec2-ap-southeast-1 |Singapore |SIN_SG_01 |34.87.0.86 |
> |Milan, Italy - EC2|ec2-eu-south-1 |Milan, Italy|  MXP_IT_01| 34.154.206.19|
> |Hong Kong, China - EC2  |ec2-ap-east-1| Hong Kong, China |HKG_CN_01 |35.220.170.219|
> |Stockholm, Sweden - EC2  |ec2-eu-north-1| Hamina, Finland |QVZ_FI_01 |34.88.23.255|
> |Virginia USA - EC2 |ec2-us-east-1 |Dulles, Virginia, USA |IAD_US_01 |34.145.141.195|
> |California, USA - EC2  |ec2-us-west-1 |Los Angeles, California, USA| LAX_US_01| 34.102.114.61|
> |Toronto, Canada - EC2 |ec2-ca-central-1| Toronto, Canada |YYZ_CA_01| 34.130.255.154|
> |Sao Paulo, Brazil - EC2  |ec2-sa-east-1 |Sao Paulo, Brazil |GRU_BR_01| 35.198.29.254|
> |London, UK - EC2 |London_EC2| London, United Kingdom |LHR_GB_01 |34.39.16.121|
> |Frankfurt, Germany - EC2 |ec2-eu-central-1| Frankfurt, Germany |FRA_DE_02 |34.159.126.217|
> |Tokyo, Japan - EC2| ec2-ap-northeast-1 |Tokyo, Japan |NRT_JP_01 |35.221.109.210|
> |Sydney, Australia - EC2  |ec2-ap-southeast-2| Sydney, Australia |SYD_AU_01 |34.116.74.92|
> <div><br/></div>
> There will be no disruption for your API usage during the transition, however please make any necessary updates to your API configurations or IP whitelisting.
> <div><br/></div>
> On August 26th, all old names will be retired and your API calls will need to be updated with the new names. Any API automation still using an old names will result in an error.
> <div><br/></div>

<br/>

In this guide, we'll walk you through the process of getting up and running with you very first API test.

## 1. Get your API Key

Once created, your API keys are always available in your [account dashboard](https://www.webpagetest.org/account), under **API Consumers**.

If you can't see any API Keys, that means you don't currently have any and you will need to [create a new one](/api/keys/#obtaining-your-keys).

## 2. Submit your first test
To make sure your API key is ready to go, let's get your first test submitted. It takes some time for a test to complete.

Copy and paste the following command into your terminal, inserting your api key in place of the placeholders:

```bash
curl --request POST --url 'https://www.webpagetest.org/runtest.php?&url=https%3A%2F%2Fwww.webpagetest.org&f=json' --header 'X-WPT-API-KEY: {YOUR_API_KEY}'
```

The request above will:

- Submit a test for www.webpagetest.org (using the `url` parameter)
- Request a JSON response (using the `f` parameter)
- Authenticate using your API key (using the `X-WPT-API-KEY` header)

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
