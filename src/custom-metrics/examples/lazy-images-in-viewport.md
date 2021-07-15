---
tags: customMetrics
layout: layouts/code-example.njk
title: Lazy Loaded Images in Viewport
description: Return an array containing the sources of all images that have `loading=lazy` applied, but are visible within the initial viewport.
---

```js
[lazy-in-viewport]
function isVisibleInInitialViewport(element) {
    let boundingRect = element.getBoundingClientRect();
    let isVisible = boundingRect.width != 0 && boundingRect.height != 0;
    let inInitialViewport =
        boundingRect.top <= window.innerHeight &&
        boundingRect.left <= window.innerWidth;

    return isVisible && inInitialViewport;
}

let lazyImages = document.querySelectorAll("img[loading=lazy]");
let candidatesforEagerLoading = Array.from(lazyImages)
    .filter(img => isVisibleInInitialViewport(img))
    .map(img => img.src);
return JSON.stringify(candidatesforEagerLoading);
```
