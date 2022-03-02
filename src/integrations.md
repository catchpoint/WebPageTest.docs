---
title: 'WebPageTest Integrations'
eleventyNavigation:
  key: Integrations 
layout: layouts/integrations.njk
---
WebPageTest provides integrations to make it easier to use WebPageTest with your existing tooling, as well as to consume the WebPageTest information in new and interesting ways.

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

<a class="btn" href="https://github.com/webpagetest/webpagetest-api">Get started with the API Wrapper →</a>
:::

:::callout
### WebPageTest Slack Bot
<img src="/img/api-slack-bot.png" alt="Screenshot from Slack showing the WebPageTest bot being triggered by running /webpagetest">

The WebPageTest Slack bot lets you run tests against WebPageTest from within Slack. Once the tests are complete, a copy of the waterfall and a link to the full results will be posted in your Slack channel, helping you to easily troubleshoot and diagnose performance issues directly from your Slack development channels.

Features:

- Run WebPageTest from within Slack, and get the results posted back automatically.
- Full access to WebPageTest's 30+ test locations.

<a class="btn" href="https://github.com/WebPageTest/webpagetest-slack">Get started with the Slack Bot →</a>
:::

:::callout
### WebPageTest Visual Studio Code Extension
<img src="/img/api-vscode.png" alt="An image of Visual Studio Code's command bar, showing that as you start typing 'webpagetest', the WebPageTest extension command shows up.">

The Visual Studio Code (VSCode) Extension for WebPageTest lets you run tests against WebPageTest from within VSCode. Once the tests are complete, some of the performance metrics, a copy of the waterfall, screenshot, and a link to the full results will be displayed in VSCode, right where you are developing, helping you to easily troubleshoot and diagnose performance issues directly from VSCode and possibly refactor the code if needed.

Features:

- Run WebPageTest from within VSCode, and get the results posted back automatically.
- Full access to the underlying WebPageTest API
- Test performance on local code changes, as you're making the change

<a class="btn" href="https://marketplace.visualstudio.com/items?itemName=WebPageTest.wpt-vscode-extension">Get started with the VS Code Extension →</a>
:::

## Community-Built Integrations
One of the great things about WebPageTest is the fantastic community that has built up around it. These are some great community-built integrations that we recommend. 

:::note
Built something awesome using WebPageTest? [Tell us about it](https://github.com/WPO-Foundation/webpagetest-docs/issues/new?assignees=&labels=integration&template=new-community-integration.md&title=%5BINTEGRATION%5D) so we can add it here.
:::