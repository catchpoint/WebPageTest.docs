<p align="center"><img src="https://blog.webpagetest.org/hero_light_transparent.png" alt="WebPageTest Logo" /></p>

# Official WebPageTest Documentation
The source for the official Documentation for [WebPageTest](https://github.com/WPO-Foundation/webpagetest).

__[View the docs →](https://docs.webpagetest.org)__

## About docs.webpagetest.org
Each page of documentation for WebPageTest is written in [Markdown](https://daringfireball.net/projects/markdown/) and contained in the [/src](/src) directory. The site is built with [Eleventy](https://www.11ty.dev/) and automatically deployed by [Netlify](https://www.netlify.com/) whenever a commit is pushed to the `main` branch.

## Contributing to the documentation
We not only welcome, but encourage contributions to the documentation. There are two ways to contribute.

### 1. Via the "Edit on GitHub" links
Each page on the documentation site provides an "Edit this page on GitHub" link in the footer that will automatically take you to that page's source file in this repo.

From there, once you're logged into GitHub, you'll be able to click the pencil icon in the top right corner of the file to start editing in your browser. Once you're happy with your edits, add a title and informative description in the boxes provided by GitHub to submit a PR for us to review.

### 2. Running the site locally
Alternatively, you can set up a local development environment to make changes locally and then push up to the repo for review.

*To run the site locally, you'll need to have version 8 or later of Node.js available on your machine.*

Here are the steps necessary to get a version of the docs running on your local machine.

1. Create a fork of this repo
2. Clone your new repository to your local machine.
```
git clone git@github.com:your-user-name/webpagetest-docs.git
```
3. `cd` into `webpagetest-docs` and run `npm install`
```
$ cd webpagetest-docs
$ npm install
```
4. Use `npx` to serve the site.
*`npx` has been included with Node since version 5.2. If for some reason it isn't available on your machine, you can install it by using `npm install -g npx`*

```
npx @11ty/eleventy --serve
```

If all goes well, that should provide a hot-reloading local web server. As you make changes to the site, the site will auto-regenerate and the browser will fresh to show any changes. When you've made your changes, push them back to your forked version of the site and submit a pull request for us to review.

## Looking for popular documentation?
Because of the change to the documentation, some links will be pointing to a path that no longer exists in this repo. To help you get oriented, here a few a of the more popular sections with their new canonical locations.

* [Getting Started](https://docs.webpagetest.org/getting-started/)
* [Scripting Page Interactions](https://docs.webpagetest.org/scripting/)
* [Collecting Custom Metrics](https://docs.webpagetest.org/custom-metrics/)
* [Metrics](https://docs.webpagetest.org/metrics/)
  * [SpeedIndex](https://docs.webpagetest.org/metrics/speedindex/)
* [Private Instances](https://docs.webpagetest.org/private-instances/)

## WebPageTest Change Log
View the [Change Log for WebPageTest](https://docs.webpagetest.org/change-log/).
