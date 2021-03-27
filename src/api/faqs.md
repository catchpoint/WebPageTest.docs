---
title: 'WebPageTest API FAQs'
eleventyNavigation:
  parent: API 
  key: API FAQs
  order: 3
---
# WebPageTest API FAQs
This page answers frequently asked questions about account, test options and billing for WebPageTest API. If you are unable to find information about your specific WPT API related question, please submit your question via the **Contact Support** option on **My Account** once you’ve signed into your WebPageTest account. You can also submit your question on our [forums](https://forums.webpagetest.org). Be careful to not share any sensitive account or payment related information there.  

## Running Tests
:::faqs

### How do you define a test run?
A test run on WebPageTest is defined as a single run within a test set up to measure webpage performance on a specific browser and location. For example, if you run a 5-run test with **Repeat View**, then that counts as 10 test runs.    

### What countries and browsers do you support with the WebPageTest API?
With WebPageTest API, you can test across 29 locations worldwide, including mainland China.  

WebPageTest API is always up-to-date on the current version of every browser and you can test on Chrome (stable, beta, canary), Firefox (stable, beta, ESR), Microsoft Edge (dev) and Brave.  

WebPageTest API also supports mobile emulation testing. You can test mobile content by emulating an Android browser by passing **“mobile=1”** as an API option. 

### What metrics can I access with the API?
You can access [all the performance metrics](/metrics) that you would when you run a manual test on WebPageTest, as well as the film strip view and video capture. WebPageTest API also gives you additional metrics that are only currently exposed in the JSON and XML results, not in the UI itself.

### How long will my test results be stored?  
You will have access to all the tests you run via WebPageTest API for 13 months. This also enables you to look at year-over-year performance analyses and trends. 

### Is there a daily limit for the test runs?  
There is a monthly limit on the total tests you can run with the WebPageTest API, based on the subscription plan you choose. There is currently no daily limit on top of that monthly limit.  

### Do you provide any integrations that I can use with the API? 
We currently support the following integrations:

- **[WebPageTest API Wrapper for NodeJS](https://github.com/marcelduran/webpagetest-api)**  
An npm package that wraps WebPageTest API for NodeJS as a module and a command-line tool  
- **[WebPageTest GitHub Action](https://github.com/WPO-Foundation/webpagetest-github-action)**   
A GitHub Action that lets you automatically run tests against WebPageTest on code changes, set and enforce performance budgets, and have performance data automatically added to your pull requests to move the performance conversation directly into your existing development workflow.

There are also several existing integrations built by our community members that you can try out to build on top of the WebPageTest API. [Check out some of them here.](/api/integrations/#community-built-integrations)
:::

## Billing
:::faqs
### How will I be charged?  
For monthly and annual subscriptions plans, your credit card will be automatically billed when you sign up and purchase the subscription, you’ll be able to access your payment history under **Billing History** in **My Account** on www.webpagetest.org. All subscription plans can be canceled at any time without penalty. Once you choose to cancel, it stops the WebPageTest API subscription from auto-renewing for the next billing cycle. You’ll continue to have access to run tests for that plan, until the end of your current billing period. 

For Custom Enterprise plans where you want to run more than 25,000 tests per month, please **[contact us](https://www.product.webpagetest.org/contact)**.  

If you are based out of the United States of America, You will be charged in US Dollars, but the exact amount you will see on your credit card statement may vary, depending on foreign exchange rates and any foreign transaction fees your bank may impose. 

### What payment methods do you support? 
We accept payment via Credit Card (VISA, Mastercard, American Express, JCB, Maestro, Discover, Diners Club International, UnionPay). Please ensure the accuracy of your payment method and that it is properly funded to avoid any issues with payment acceptance. 

We do not accept and will not ask you to provide payments with cash or a physical check. 

For Custom Enterprise plans, requiring more than 25,000 tests per month, please **[contact us](https://www.product.webpagetest.org/contact)**. 

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
Currently, we provide email support for all your API related questions around account, API tests, and billing. You can contact us anytime. Simply select **Contact Support** on the top right section of **My Account** and submit your query. Our support specialist will get back to you within 2-3 business days.  

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
All our subscription plans offer the same features and capabilities, and the pricing is based on the total tests you want to run per month. You can view our subscription plans when you [sign up](https://app.webpagetest.org/ui/entry/wpt/signup) or [log in](https://app.webpagetest.org/ui/entry/wptLogin.aspx) and go to **My Account** on https://webpagetest.org/ For Custom Enterprise plans where you want to run more than 25,000 tests per month, please **[contact us](https://www.product.webpagetest.org/contact)**. 

### What is the cancellation policy?  
You can choose to cancel anytime during the subscription period. Once you choose to cancel, it stops the WPT API subscription from auto-renewing for the next billing cycle. You’ll continue to have access to run tests for that plan, until the end of your current billing period. When you cancel, you cancel only the subscription. You’ll continue to have access to the WebPageTest account and history of the manual tests (under **Test History**) that you ran while signed in to that account. Please note all subscriptions are automatically renewed unless explicitly cancelled.

### Why does my credit card/bank statement show a charge for Braintree.com?
Braintree is our payment gateway provider for the site, so your charge description might show as a charge to Braintree. It is up to your individual payment provider to determine the best description for the charge, and the description is subject to change after the typical 7-day settlement period. If you should have any questions, please contact your payment provider after the settlement period to see how they handle the charge description.  

### Can I add more users to the plan?
Currently, we only support one user account to sign in and set up your account to purchase the WebPageTest API. However, you can generate up to 30 keys for multiple use cases and teams, from a single WebPageTest API account. Generate a new key by clicking on **+ API consumer**.  

We have plans to support adding multiple users and defining roles in the future.  
:::
