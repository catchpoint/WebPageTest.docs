---
tags: customMetrics
layout: layouts/code-example.njk
title: NEXT_DATA Object Size
description: Return the size (in bytes) of the NEXT_DATA object that is used by Next.js for hydration.
---

```js
[next-data-size]
let nextSize = null;
if (window.__NEXT_DATA__) {
    nextSize = JSON.stringify(window.__NEXT_DATA__).length; 
} else if (document.getElementById('__NEXT_DATA__')) {
    nextSize = document.getElementById('__NEXT_DATA__').innerHTML.length;
}
return nextSize;
```