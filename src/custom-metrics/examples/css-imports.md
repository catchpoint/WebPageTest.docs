---
tags: customMetrics
layout: layouts/code-example.njk
title: CSS Imports
description: Loop through all the stylesheets requested by the page and count any `@import` statements to return how many stylesheets were loaded via `@import`.
---

```js
[css-imports]
let requests = $WPT_BODIES;
let cssBodies = requests.filter(request => request.type == "Stylesheet");
let re = /@import/g;
let importCount = 0;
cssBodies.forEach((file) => {
        importCount += ((file.response_body || '').match(re) || []).length;
    }
)
return importCount;
```