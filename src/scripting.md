---
title: "Custom Scripting"
eleventyNavigation:
  key: Scripting
  order: 2
---

# Scripting

WebPageTest can automate multi-step tests (like logging into a site or sending an e-mail) by writing a script file:

- Each line of the script file contains a command and any necessary parameters. The number of parameters and what they do depends on the command.

- Blank lines are ignored.

- Lines beginning with `//` are ignored, so you can add comments to a script.

- Parameters are separated from the command and each other via <kbd>Tab</kbd> characters. (Not spaces!)

- Because of the <kbd>Tab</kbd>-separation, parameter values can contain spaces without quoting or escaping:

  ```text
  someCommand some parameter
  // The above is written as “someCommand\tsome parameter”
  ```

<!-- TODO: What character encodings/sets are allowed in script files? ASCII-only? UTF-8? -->

## Debugging

You won’t get a lot of feedback when a script fails. For debugging, it is easiest to limit scripts to `navigate` and `exec`/`execAndWait` commands, which can be debugged locally in browser developer tools. <!-- TODO: how? -->

## Targeting elements for script commands

Commands that operate on DOM elements can select which element to target in two ways:

1. By attributes, where the attribute’s name/value is unique to that DOM element.
2. By contents, such as an element’s text or the HTML it contains.

<!-- TODO: how to select if the attribute value or the innerText/HTML contain tabs? -->

### Targeting by attributes

For example, if a form field you want to target looks like this:

```html
<input name="loginId"
       class="tabInputFields"
       id="lgnId1"
       title="The username, email address, or phone number you registered with."
>
```

…you could identify it via its `id`, `name`, or `title`. Any of these would work:

```text
setValue  id=lgnId1 timbl
setValue  name=loginId  timbl
setValue  title=The username, email address, or phone number you registered with.
```

::: warning
Why not `class`? To target an element by class, you must use an attribute name of `className`, like `className=tabInputFields`.
<!-- TODO: is that also true for the `for` attribute and its `.htmlFor` property, as seen on <label>? -->
:::

::: note
For form fields, prefer the `name` attribute if available, since that’s what’s uploaded to the server, but any attribute is fair game.
:::

### Targeting by contents

Two special properties can target elements by their contents: `innerText` and `innerHTML`. The matching is **case-sensitive** and **must include the full string**.

<!-- TODO: the original docs capitalized it as `innerHtml` — is that the correct spelling for WPT scripting, as opposed to the all-uppercase DOM property? -->

For example, this element:

```html
<div dojoattachpoint="containerNode">Delete</div>
```

…can be identified by `innerText=Delete`. However, if the HTML looked like this:

```html
<div dojoattachpoint="containerNode">Delete ❌</div>
```

You would need `innerText=Delete ❌`, not just `innerText=Delete`.

## Logging script results

To suppress output from intermediate steps:

1. Disable logging with the `logData 0` command.
2. When you reach the steps you want to record, reenable logging with `logData 1`.

For example:

```text/0,7
logData 0

// These steps are performed silently
navigate  www.aol.com
navigate  news.aol.com

logData 1

// This step is logged
navigate  news.aol.com/world
```

The script above navigates to the aol.com homepage, then its news page, and then finally to the worldwide news page, but logs results for only the worldwide news page. This lets you test the impact of a user’s navigation path to a site on its performance (cookies, shared CSS and JS caching, etc.).

Another common use is testing sites that require authentication, like so:

```text/0,9
logData	0

// Load the signin page
navigate	https://webmail.aol.com

setValue	name=loginId	someuser@aol.com
setValue	name=password	somepassword

// Sign in and record the resulting authenticated page’s load
logData	1
submitForm	name=AOLLoginForm
```

## Variable substitutions

Some text strings act as variables that are replaced based on the test’s URL.

### `%URL%`

Full URL provided for the test.

::: api-list
- Test URL
`https://wpt.example`
- Input 
`navigate %URL%`
- Output  
`navigate  https://wpt.example`
:::

### `%HOST%`

The tested [URL’s hostname](https://developer.mozilla.org/en-US/docs/Web/API/URL/hostname). Does not include [the URL’s protocol](https://developer.mozilla.org/en-US/docs/Web/API/URL/protocol) — use [`%ORIGIN%`](#%25origin%25) if you want that.

::: api-list
- Test URL
`https://wpt.example`
- Input 
`setDnsName %HOST% dns.example`
- Output  
`setDnsName  wpt.example dns.example`
:::

### `%HOSTR%`

Like [`%HOST%`](#%25host%25), but for the test URL’s final hostname _after_ redirects.

::: api-list
- Test URL
`https://redirect.wpt.example`
- Input 
`setDnsName %HOSTR% dns.example`
- Output  
`setDnsName  wpt.example dns.example`
:::

### `%ORIGIN%`

The test [URL’s origin](https://developer.mozilla.org/en-US/docs/Glossary/Origin). Includes the protocol, host, and port (if any).

::: api-list
- Test URL
`https://wpt.example/hello`
- Input 
`setCookie  %ORIGIN% foo=bar`
- Output  
`setCookie https://wpt.example foo=bar`
:::

::: api-list
- Test URL
`https://wpt.example:8080/hello`
- Input 
`setCookie  %ORIGIN% foo=bar`
- Output  
`setCookie https://wpt.example:8080 foo=bar`
:::

## Command Reference

### Navigation/DOM Interaction

#### `navigate`

Navigates the browser to the provided URL and waits for the page to finish loading.

::: api-list
- Browser Support
Internet Explorer, Chrome, Firefox, Safari
- Usage 
`navigate	<url>`
- `<url>`
URL to provide the browser for navigation (same as you would enter into the address bar)
- Example  
`navigate	http://webmail.aol.com`
:::

#### `click` / `clickAndWait`

Fires [a `click` event](https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event) at the identified DOM element.

`clickAndWait` will wait for resulting browser activity to complete, but `click` will continue running immediately after the event fires.

::: api-list
- Browser Support
Internet Explorer, Chrome, Firefox
- Usage 
`click	<attribute=value>`
`clickAndWait	<attribute=value>`
- `<attribute=value>`
DOM element to click on
- Examples 
`click	title=Delete (del)`
`clickAndWait	innerText=Send`
:::

#### `selectValue`

Selects a value from a dropdown list of the given DOM element. Pretty much only used for `<select>` elements. <!-- TODO: are `<keygen>` and/or `<datalist>` also supported? -->

::: api-list
- Browser Support
Internet Explorer <!-- TODO: does that mean you can’t fill out <select> in other browsers, or are you supposed to use `setValue` in them instead? -->
- Usage 
`selectValue	<attribute=value>	<value>`
- `<attribute=value>`
DOM element to select the value of
- `<value>`
value to use
- Example  
`clickAndWait	innerText=Send`
:::

#### `sendClick` / `sendClickAndWait`

Creates a JavaScript `click` event and sends it to the indicated element. Works similarly to [`click` / `clickAndWait`](#click-/-clickAndWait), but only for Internet Explorer. <!-- TODO: Since those events also support IE, should this be documented anymore? -->

::: api-list
- Browser Support
Internet Explorer
- Usage 
`sendClickAndWait	<attribute=value>`
- `<attribute=value>`
DOM element to send the click event to
- Example
`sendClickAndWait	innerText=Send`
:::

#### `type` / `typeAndWait`

Simulate keyboard presses for each character in the given string. <!-- TODO: how to press non-alphanumeric characters, like arrow keys? If the answer is “you can’t”, point out that `keypress`/`AndWait` can do that -->

::: api-list
- Browser Support
Chrome
- Usage 
`type	<string>`
- `<string>`
String of characters to type into the keyboard
- Examples
`type	Hello World`
`typeAndWait Robert'); DROP TABLE students;--`
:::

#### `keypress` / `keypressAndWait`

Simulate a keyboard press for a given key name. <!-- TODO: the linked JSON file has property names, `key`, `code`, and `keyCode` properties. Which are the ones you can use? -->

::: api-list
- Browser Support
Chrome
- Usage 
`keypress	<key>`
- `<key>`
Name of the keyboard key to simulate pressing. [See the list of supported keys.](https://github.com/WPO-Foundation/wptagent/blob/master/internal/support/keys.json)
- Example
```text
keypress	UpArrow
keypress	UpArrow
keypress	DownArrow
keypress	DownArrow
keypress	LeftArrow
keypress	RightArrow
keypress	LeftArrow
keypress	RightArrow
keypress	a
keypress	b
keypressAndWait	Enter
```
:::

#### `sendKeyDown` / `sendKeyUp` / `sendKeyPress` (-`AndWait`)
Creates a javascript keyboard event (OnKeyDown, OnKeyUp, OnKeyPress) and sends it to the indicated element.

::: api-list
- Browser Support
Internet Explorer
- Usage 
`sendKeyDownAndWait	<attribute=value>    <key>`
- `<attribute=value>`
DOM element to send the event to
- `<key>`
Key command to send. Special values are `ENTER`, `DEL`/`DELETE`, `BACKSPACE`, `TAB`, `ESCAPE`, `PAGEUP`, and `PAGEDOWN`.
- Example
`sendKeyDownAndWait	name=user    x`
:::

#### `setInnerHTML`
Sets the [`innerHTML` of the given DOM element](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML) to the provided value. Usually for filling in something like a `contenteditable` HTML element (like the message body in web-based email).

Use this if you want to include HTML elements as the input content — otherwise, [`setInnerText`](#setInnerText) works just as well.

::: api-list
- Browser Support
Internet Explorer, Chrome, Firefox
- Usage 
`setInnerHTML	<attribute=value>	<value>`
- `<attribute=value>`
DOM element to set the `innerHTML` of
- `<value>`
The HTML to use as the element’s contents
- Example
`setInnerHTML	contentEditable'true	%MSG%` <!-- TODO: Is that apostrophe a typo? What is `%MSG%`? -->
:::

#### `setInnerText`

Sets the [`innerText`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/innerText) of the given DOM element to the provided string. Usually for filling in something like a `contenteditable` HTML element (like the message body in web-based email).

If you want to include HTML elements as the input content, use  [`setInnerHTML`](#setInnerHTML) instead.

::: api-list
- Browser Support
Internet Explorer, Chrome, Firefox
- Usage 
`setInnerText	<attribute=value>	<value>`
- `<attribute=value>`
DOM element to set the `innerText` of
- `<value>`
The text to use as the element’s contents
- Example
`setInnerText	contentEditable'true	%MSG%` <!-- TODO: see above for innerHTML -->
:::

#### `setValue`

Sets the `value` attribute of the targeted DOM element to the provided text. Used for filling in text fields on a page (whether inside `<form>`s or not).

::: caution
Currently only `<input>` and `<textarea>` elements are supported.
:::

::: api-list
- Browser Support
Internet Explorer, Chrome, Firefox
- Usage 
`setValue	<attribute=value>	<text>`
- `<attribute=value>`
DOM element to set the `value` of
- `<text>`
Text to set the element’s `value` to
- Example
`setValue	name=loginId	userName`
:::

#### `submitForm`

Fires [a `submit` event at the targeted `<form>`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event).

::: api-list
- Browser Support
Internet Explorer, Chrome, Firefox
- Usage 
`submitForm	<attribute=value>`
- `<attribute=value>`
Form element to submit
- Example
`submitForm	name=AOLLoginForm`
:::

#### `exec` / `execAndWait`

Executes a provided string of JavaScript. Unlike `exec`, `execAndWait` waits for any generated browser activity to complete before continuing.

::: api-list
- Browser Support
Internet Explorer, Chrome, Firefox
- Usage 
`exec	<javascript code>`
- `<javascript code>`
A valid JavaScript program for the browser to execute
- Example
`exec	window.setInterval('window.scrollBy(0,600)', 1000);`
:::

### End Conditions

These commands control when WebPageTest stops measuring performance for a test.

#### `setABM`

Enables “Activity-Based Measurement” mode. Allowed values:

::: api-list
- Browser Support
Internet Explorer, Chrome, Firefox
- Usage 
`setABM	<mode>`
- `<mode>`
If set to `0`, measure based off “document complete”.
If `1` (default), measure until network activity stops.
- Example
`setABM	0`
:::

#### `setActivityTimeout`

Overrides the timeout value: how long after the last network activity after the `onload` event before a test is considered complete. Intended for use with `setABM 1`.

::: api-list
- Browser Support
Internet Explorer, Chrome, Firefox, Safari
- Usage 
`setActivityTimeout	<timeout in milliseconds>`
- `<timeout in milliseconds>`
Defaults to `2000` (2 seconds). Number of milliseconds after the last network activity after `onload` before calling a test done.
- Example
`setActivityTimeout	5000`
:::

#### `setTimeout`

Overrides the timeout value for subsequent individual script steps, in seconds.

```text
usage: setTimeout	<timeout in seconds>
example: 

<timeout in seconds> - 
```

::: api-list
- Browser Support
Internet Explorer, Chrome, Firefox, Safari
- Usage 
`setTimeout	<timeout in seconds>`
- `<timeout in seconds>`
Number of seconds to allow for the navigation/step to complete. <!-- TODO: is there a default value? -->
- Example
`setTimeout	240`
:::

#### `waitFor`

Polls the page until the supplied script evaluates to `true`.

Must be set before the navigation step to be measured, and persists until cleared (by providing an empty script).

::: api-list
- Browser Support
TODO
- Usage 
`waitFor	<javascript snippet>`
- `<javascript snippet>`
A valid [JavaScript expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#expressions) that should eventually produce a value of `true`.
- Example
```text
waitFor	document.getElementById('results-with-statistics') && document.getElementById('results-with-statistics').innerText.length > 0
// stop polling
waitFor	
```
:::

#### `waitInterval`

Sets how frequently [the `waitFor` command](#waitFor) will poll to see if it’s true yet. Defaults to 5 seconds to minimize overhead.

::: api-list
- Browser Support
TODO
- Usage 
`waitInterval	<interval in seconds>`
- `<interval in seconds>`
Polling interval in seconds. Defaults to `5`. Supports decimal values for intervals not in whole seconds.
- Example
`waitInterval	1.5`
:::

### Request Manipulation

These commands control, modify, and override network requests.

#### `block`

Blocks individual requests from loading (useful for content like ads). Matches the list of things to block against the fully-qualified URL of each request, including its hostname.

::: api-list
- Browser Support
Internet Explorer, Chrome, Firefox
- Usage 
`block    <block strings>`
- `<block strings>`
Space-delimited list of substrings to block.
- Example
`block    adswrapper.js addthis.com`
:::

#### `blockDomains`

Blocks all requests from the given domains (useful for ad networks and trackers).

::: api-list
- Browser Support
Desktop (`wptdriver` 300+)
- Usage 
`blockDomains    adswrapper.js addthis.com`
- `<block domains>`
Space-delimited list of domains to block.
- Example
`block    adswrapper.js addthis.com`
:::

#### `blockDomainsExcept`

Blocks all requests ***not*** from one of the given domains from loading. Useful for isolating the performance of only domains you control.

::: api-list
- Browser Support
Desktop (`wptdriver` 300+)
- Usage 
`blockDomainsExcept    <allow domains>`
- `<allow domains>`
Space-delimited list of domains to allow.
- Example
`blockDomainsExcept    www.example.com cdn.example.com`
:::

#### `setCookie`

Stores [a browser cookie](https://developer.mozilla.org/en-US/docs/Glossary/Cookie) to be sent while navigating. <!-- TODO: for both HTTP and JS? -->

::: api-list
- Browser Support
Internet Explorer, Chrome, Firefox
- Usage 
`setCookie	<path>	<value>`
- `<path>`
URL path where the cookie should be used/stored.
- `<value>`
Cookie value and attributes. Uses the same syntax as [`document.cookie`](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie). If expiration information isn’t included, it will be stored as a session cookie.
- Examples
`setCookie	http://www.aol.com	zip=20166`
`setCookie	http://www.aol.com	TestData = Test; expires = Sat,01-Jan-2000 00:00:00 GMT`
:::

#### `setDns`

Overrides the IP address for a hostname.

The override is effectively the same as an entry in [the `hosts` file](https://en.wikipedia.org/wiki/Hosts_(file)), and will eliminate DNS lookup times.

::: api-list
- Browser Support
Internet Explorer, Chrome, Firefox, Safari
- Usage 
`setDns	<host name>	<IP Address>`
- `<host name>`
Hostname for the DNS entry to override.
- `<IP Address>`
IP Address for the host name to resolve to.
- Example
`setDns	www.aol.com	127.0.0.1`
:::

#### `setDNSName`

Overrides a hostname by creating a fake [CNAME record](https://en.wikipedia.org/wiki/CNAME_record).

::: api-list
- Browser Support
Internet Explorer, Chrome, Firefox, Safari
- Usage 
`setDnsName	<name to override>	<real name>`
- `<name to override>`
Hostname to replace.
- `<real name>`
Real hostname to look up instead.
- Example
`setDnsName	pat.aol.com	www.aol.com`
:::

#### `setUserAgent`

Overrides [the `User-Agent` string](https://developer.mozilla.org/en-US/docs/Glossary/User_agent) exposed by the browser.

<!-- TODO: is this HTTP-only or does it also include `navigator.userAgent`? -->

::: caution
You will be using the same browser engine, so you are limited by the capabilities and behavior of that engine even when spoofing another browser.
:::

::: api-list
- Browser Support
Internet Explorer, Chrome, Firefox, Safari
- Usage 
`setUserAgent    <user agent string>`
- `<user agent string>`
Alternate user agent string to use.
- Example
`setUserAgent    Mozilla/5.0 (iPhone; U; CPU like Mac OS X; en) AppleWebKit/420+ (KHTML, like Gecko) Version/3.0 Mobile/1A543 Safari/419.3`
:::

#### `overrideHost`

Replaces the value of [the `Host` HTTP header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Host) for the given host with the provided replacement. Also adds a new `x-Host` header with the original value.

::: api-list
- Browser Support
Internet Explorer, Chrome, Firefox, Safari (no HTTPS) <!-- TODO: for all browsers, or just Safari? -->
- Usage 
`overrideHost	<host>    <new host>`
- `<host>`
Which host to override its `Host` header.
- `<new host>`
Value to set as the `Host` header.
- Example
`overrideHost	www.aol.com    www.notaol.com`
:::

#### `overrideHostUrl`

For all requests to the given host, rewrite the requests to go to a different server and include the original host in the new URL.

::: api-list
- Browser Support
Internet Explorer
- Usage 
`overrideHostUrl	<host>    <new host>`
- `<host>`
Hostname for which you want to redirect requests.
- `<new host>`
Target server to receive the redirected requests.
- Example
`overrideHostUrl	www.webpagetest.org    staging.webpagetest.org`
In this example, `https://www.webpagetest.org/index.php` will be rewritten to `https://staging.webpagetest.org/www.webpagetest.org/index.php`.
:::

#### `addHeader`

Adds an HTTP header to every HTTP request (does not overwrite existing headers).

::: api-list
- Browser Support
Internet Explorer, Chrome, Firefox, Safari (no HTTPS) <!-- TODO: for all browsers, or just Safari? -->
- Usage 
`addHeader	<header>`
- `<header>`
Full header name/value pair to add.
- Example
`addHeader	Pragma: akamai-x-cache-on`
:::

#### `setHeader`

Adds an HTTP header to every HTTP request, _overriding the header if it already exists._

::: api-list
- Browser Support
Internet Explorer, Chrome, Firefox, Safari (no HTTPS) <!-- TODO: for all browsers, or just Safari? -->
- Usage 
`setHeader	<header>`
- `<header>`
Full header name/value pair to add/replace.
- Example
`setHeader	UA-CPU: none-ya`
:::

#### `resetHeaders`

Clears any headers from `addHeaders` or `setHeaders`, in case you want to override headers for only part of a script.

::: api-list
- Browser Support
Internet Explorer, Chrome, Firefox, Safari
- Usage 
`resetHeaders`
- Example
`resetHeaders`
:::

### Miscellaneous

#### `combineSteps`

Combines multiple script steps into a single “step” in the results.

::: api-list
- Browser Support
Internet Explorer, Chrome, Firefox, Safari
- Usage 
`combineSteps	<count>`
- `<count>`
Number of script steps to merge. Defaults to `0`, which merges **all** steps.
- Examples
`combineSteps 2`
```text
combineSteps
navigate	www.google.com
navigate	www.yahoo.com
navigate	www.aol.com
```
:::

#### `if` / `else` / `endif`

Conditionally execute a block of script based on run number or cached state for the test.

Conditional blocks can be nested.

::: api-list
- Browser Support
Internet Explorer, Chrome, Firefox, Safari
- Usage 
`if	[cached|run]    <value>`
`else`
`endif`
- `[cached|run]`
Compare against run number or cached state
- `<value>`
Matching run number or cached state to execute block.
- Example
```text
if    run    1
if    cached    0
<do something for first view of first run>
endif
else
<do something else for everything but first run>
endif
```
:::

#### `expireCache`

Expires any cached resources that would expire within a specified number of seconds.

Can be used to simulate a repeat view after some of time, like what it would be like to browse the page the next day. It doesn’t simulate content changes, but any resources with a short expiration will be checked with [`if-modified-since`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/If-Modified-Since) conditional requests.

::: api-list
- Browser Support
Internet Explorer
- Usage 
`expireCache	<seconds>`
- `<seconds>`
Any resources with a cache lifetime shorter than this amount of time will expire.
- Example
`expireCache	86400`
:::

#### `firefoxPref`

Specifies arbitrary preferences to configure before launching Firefox.

::: api-list
- Browser Support
Firefox
- Usage 
`firefoxPref	<pref>    <value>`
- `<pref>`
Which preference to modify. You can see available ones at `about:config`.
- `<value>`
The value to set the preference to. String values should be enclosed in quotes, like the example.
- Example
```text
firefoxPref    network.http.pipelining    false
firefoxPref    network.http.pipelining.maxrequests    5
firefoxPref    general.useragent.override    "Some User Agent String"
```
:::

#### `setEventName`

Sets the name of the event for the next measurable operation.

::: caution
Only set this right before the action that generates the activity you want to measure, to avoid accidentally measuring other page activity.
:::

Without explicit event names, each step will be automatically named `Step_1`, `Step_2`, etc.

::: api-list
- Browser Support
Internet Explorer
- Usage 
`setEventName	<event name>`
- `<event name>`
Name to use for the event about to occur (in resulting log files).
- Example
`setEventName	loadWebmail`
:::

#### `setLocation`

Overrides [geolocation position](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation).

::: caution
This does not override locations guessed from IP address.
:::

::: api-list
- Browser Support
Chrome
- Usage 
`setLocation	<lat>,<lng>    <accuracy>`
- `<lat>`
Latitude
- `<lng>`
Longitude
- `<accuracy>`
Accuracy, in meters.
- Example
`setLocation    38.954980,-77.447956    10`
:::

#### `setViewportSize`

Changes the size of the window so that [the page viewport](https://developer.mozilla.org/en-US/docs/Glossary/Viewport) matches the given dimensions.

::: note
If you get black areas on your screenshots, then the viewport is larger than the desktop.
:::

::: api-list
- Browser Support
Internet Explorer, Chrome, Firefox, Safari
- Usage 
`setViewportSize	<width>    <height>`
- `<width>`
Viewport width, in CSS pixels.
- `<height>`
Viewport height, in CSS pixels.
- Example
`setViewportSize    320    365`
:::

#### `sleep`

Pauses the script operation for a given number of seconds.

::: note
This does not pause JavaScript execution, only the WPT script.
:::

::: api-list
- Browser Support
Internet Explorer, Chrome, Firefox, Safari
- Usage 
`sleep	<seconds to sleep>`
- `<seconds to sleep>`
An integer for how long to sleep. The allowable range is 1–30.
- Example
`sleep	5`
:::

## Example scripts

### Mail test

```text
// load the account name and password
// bring up the login screen
setEventName	launch
navigate	http://webmail.aol.com

// ignore any errors from here on (in case the mailbox is empty or we get image challenged)
ignoreErrors	1

// log in
setValue	name=loginId	<username>
setValue	name=password	<password>
setEventName	load
submitForm	name=AOLLoginForm

// only read and send a mail once an hour
minInterval	AOLMail	60

// close the today curtain
click	className=backdrop
sleep	5

// Open the first message with a subject of "test"
setEventName	read
clickAndWait	innerText=test

// delete the message
click	title=Delete (del)
sleep	5

// open the compose mail form
setEventName	compose
clickAndWait	title=Write mail (Alt + w)

// send a test message to myself
sleep	1
setValue	tabindex=100	<username>
setValue	name=Subject	test
loadFile	msg.txt	%MSG%
setInnerText	contentEditable=true	Some message text
sleep	1
setDOMElement	className=confirmMessage
setEventName	send
clickAndWait	innerText=Send

endInterval

// sign off
setEventName	logout
clickAndWait	className=signOutLink
```

### MyAOL Authenticated profile

```text
// bring up the login screen
setDOMElement	name=loginId
navigate	https://my.screenname.aol.com/_cqr/login/login.psp?mcState=initialized&sitedomain=my.aol.com&authLev=0&siteState=OrigUrl%3Dhttp%3A%2F%2Fmy.aol.com%2F

// log in
setValue	name=loginId	<user name>
setValue	name=password	<password>
setDOMElement	className=more_pics
submitForm	name=AOLLoginForm
```

#### DNS Override

This script will:

1. Create a fake DNS entry for `www1.aol.com` and have it look up `www.aol.com` instead.
2. Force `www.aol.com` to resolve to `127.0.0.1` (localhost).
3. Set a `zip` cookie on the `www.aol.com` domain.
4. Navigate and measure the time to load `www.aol.com`.

```text
setDnsName	www1.aol.com	www.aol.com
setDns	www.aol.com	127.0.0.1
setCookie	http://www.aol.com	zip=20166
navigate	http://www.aol.com
```

#### iPhone Spoofing

This script will:

1. Use the iPhone user agent string.
2. Change the browser dimensions to match the original iPhone’s.
3. Navigate to `www.aol.com`.

```text
setUserAgent	Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25
setViewportSize    320    356
navigate	http://www.aol.com
```
