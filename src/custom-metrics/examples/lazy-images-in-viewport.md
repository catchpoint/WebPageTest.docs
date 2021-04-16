---
tags: customMetrics
layout: layouts/code-example.njk
title: Lazy Loaded Images in Viewport
description: Return an object containing the sources of all images that have `loading=lazy` applied, but are within the initial viewport.
---

```js
[lazy-in-viewport]
let images = document.querySelectorAll('img[loading=lazy]');
let lazyImages = [];
images.forEach( img => {
 if (img.getBoundingClientRect().top < window.innerHeight) {
    lazyImages.push(img.src);
 }
});
return JSON.stringify(lazyImages);
```