---
tags: customMetrics
layout: layouts/code-example.njk
title: Inline CSS
description: Return the amount of inline CSS bytes included in the document.
---

```js
[inline-css]
return Array.from(document.querySelectorAll("style")).reduce(
  (total, style) => (total += style.innerHTML.length), 0
);
```