---
tags: customMetrics
layout: layouts/code-example.njk
title: Images With No Alt Attribute
description: Return the count of all images in the document that do not have an `alt` attribute.
---
```js
[images-no-alt]
return document.querySelectorAll('img:not([alt])').length
```