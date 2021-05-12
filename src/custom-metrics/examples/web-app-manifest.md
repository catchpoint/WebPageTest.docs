---
tags: customMetrics
layout: layouts/code-example.njk
title: Web App Manifest Contents
description: Retrieve the web app manifest for the page and output the manifest URL and contents in JSON format
contributedBy:
    name: Rick Viscomi
    url: https://twitter.com/rick_viscomi
---

```js
[web-app-manifest]
const response_bodies = $WPT_BODIES;

const manifestURLs = new Set(Array.from(document.querySelectorAll('link[rel=manifest]')).map(link => {
  const base = new URL(location.href).origin;
  const href = link.getAttribute('href');
  return new URL(href, base).href;
}));

const manifests = response_bodies.filter(har => {
  return manifestURLs.has(har.url);
}).map(har => {
  let manifest;
  try {
    manifest = JSON.parse(har.response_body);
  } catch (e) {
    manifest = har.response_body;
  }
  return [har.url, manifest];
});

return JSON.stringify(Object.fromEntries(manifests), null, 2);
```