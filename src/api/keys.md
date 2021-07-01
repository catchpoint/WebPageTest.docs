---
title: 'API Keys'
eleventyNavigation:
  parent: API 
  key: API Keys
  order: 1
---
# API Keys
Manage your API keys to authenticate your requests and start running tests using the WebPageTest API.

WebPageTest requires an API key to submit any test using the API. If you don't provide an API key when trying to run a test, the API will return an error. Each account receives separate keys for interacting with the API.

## Signing Up for the API
To get started with WebPageTest API, you'll need to first [create an account](https://app.webpagetest.org/ui/entry/wpt/signup?enableSub=true&utm_source=docs&utm_medium=docs&utm_campaign=apidocs&utm_content=account) and purchase a subscription plan.

If you already have an account, go to [**My Account**](https://app.webpagetest.org/ui/wpt/myAccount) on WebPageTest and purchase a subscription plan by clicking on **+ API Subscription Plan**. Once you complete your purchase, you'll be able to generate the API key and start testing using the WPT API. 

:::note
We currently offer 4 subscription plans (billed monthly or annually) based on the total test runs you wish to run in a month. All our subscription plans offer the same features and capabilities. You can read more about account, tests, and billing or payment questions [here](http://docs.webpagetest.org/api/faqs). There is also a promotional offer of up to **34% discount on these subscription plans until July 1, 2021**.

For Custom Enterprise plans where you want to run more than 25,000 tests per month, please [contact us](https://www.product.webpagetest.org/contact).
:::

## Obtaining your keys
Once created, your API keys are always available in your [account dashboard](https://app.webpagetest.org/ui/wpt/myAccount), under **API Consumers**.

<img src="/img/api-key-consumers.png" alt="Screenshot of the API Consumers section of the account dashboard, showing the name of the key, a link to reveal the key itself, and the dates the key were created and last updated.">

To create a new key, select the **+ New API Key** button and enter the a name for the application you'll be using the key for, so you can easily identify which key is used in which context.

<img src="/img/api-key-create.png" alt="Screenshot showing the 'New API Key' button, with a text field under it to enter the application name, along with a save button">

For your security, API keys are hidden by default in your dashboard, and can be revealed by selecting the **View** link.

:::caution
Currently, we only support one user account to sign in and set up your account to purchase the WebPageTest API. However, you can generate up to 30 keys for multiple use cases and teams, from a single WebPageTest API account. You can generate a new key by selecting the **+ New API Key** button.

We have plans to support adding multiple users and defining roles in the future.  
:::

## Keeping your keys secret and safe
Your API keys are directly tied to your account and can be used to submit tests, which impact your billing. You should plan to keep them secret and safe, just as you would with any account password. Only share your key with the people who absolutely need access and make sure to keep your keys out of any version control system. We recommend storing them in a password manage or secrets management system.

If a key is compromised, you can either choose to delete the key altogether or regenerate the key to start fresh. Both options are available to you in [your account dashboard](https://app.webpagetest.org/ui/wpt/myAccount).

<img src="/img/api-key-delete.png" alt="Screenshot showing a contextual menu next to the name of your API key, letting you choose to Delete the key, Regenerate the key, or copy the existing key.">
