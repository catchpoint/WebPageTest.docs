---
title: 'WebPageTest API Integrations'
eleventyNavigation:
  parent: API 
  key: Integrations 
  order: 2
layout: layouts/integrations.njk
---
WebPageTest provides integrations to make it easier to use the API with your existing tooling, as well as to consume the WebPageTest information in new and interesting ways.

## Officially Supported Integrations

:::callout
### WebPageTest GitHub Action
<img src="/img/integrations-github-action.png" alt="Screenshot of GitHub showing a WebPageTest action failing due to a blown performance budget">

WebPageTest's GitHub Action lets you automatically run tests against WebPageTest on code changes. You can set and enforce performance budgets, and have performance data automatically added to your pull requets to move the performance conversation directly into your existing development workflow.

Features:

- Automatically run WebPageTest against code changes
- Set and enforce budgets for any metric WebPageTest can surface (spoiler alert: there are a lot)
- Complete control over WebPageTest test settings (authentication, custom metrics, scripting, etc)
- Automatically create comments on new pull requests with key metrics, waterfall and more.

<a class="btn" href="https://github.com/WPO-Foundation/webpagetest-github-action">Get started with the GitHub Action →</a>
:::

:::callout
### WebPageTest API Wrapper for NodeJS
<img src="/img/integration-api-wrapper.png" alt="Screenshot of sample code from the Node.JS wrapper">

WebPageTest API Wrapper is a NPM package that wraps WebPageTest API for NodeJS as a module and a command-line tool. It provides some syntactic sugar over the raw API, enabling easier integration into your existing worfklows, including built in polling for results, pingback support and more.

Features:

- Built in performance budget testing
- Convenient CLI to simplify integrating with your existing CI/CD tooling
- Polling and pingback functionality to make it easier to get test results as soon as tests are completed

<a class="btn" href="https://github.com/marcelduran/webpagetest-api">Get started with the API Wrapper →</a>
:::

## Community-Built Integrations
One of the great things about WebPageTest is the fantastic community that has built up around it. These are some great community-built integrations that we recommend. 

:::note
Built something awesome using the WebPageTest API? [Tell us about it](https://github.com/WPO-Foundation/webpagetest-docs/issues/new?assignees=&labels=integration&template=new-community-integration.md&title=%5BINTEGRATION%5D) so we can add it here.
:::