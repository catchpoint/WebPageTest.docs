---
tags: customMetrics
layout: layouts/code-example.njk
title: Lazy Loaded Images in Viewport
description: Return an array containing the sources of all images that have `loading=lazy` applied, but are visible within the initial viewport.
---

```js
[lazy-in-viewport]
return new Promise(function (resolve) {
    let lazyImages = document.querySelectorAll("img[loading=lazy]");
    if (lazyImages.length == 0) {
        return resolve([]);
    }

    let observer = new IntersectionObserver(function (entries, observer) {
        observer.disconnect();
        const eagerLoadingCandidates = entries
            .filter(e => e.isIntersecting)
            .map(e => e.target.src);
        return resolve(JSON.stringify(eagerLoadingCandidates));
    });
    for (let img of lazyImages) {
        observer.observe(img);
    }
});
```
