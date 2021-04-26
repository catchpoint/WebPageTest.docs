---
tags: customMetrics
layout: layouts/code-example.njk
title: Blocking External Scripts
description: "Grab all of the external scripts referenced in the initial HTML response (`$WPT_BODIES[0]`) and count how many of them are blocking."
---

```js
[num-blocking-external-scripts]
let html = $WPT_BODIES[0].response_body;
let wrapper = document.createElement('div');
wrapper.innerHTML = html;
let scripts = wrapper.querySelectorAll('script[src]');

return [...scripts].filter(obj => obj.async == false && obj.defer == false).length;
```