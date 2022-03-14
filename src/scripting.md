---
title: "Custom Scripting"
eleventyNavigation:
  key: Scripting
  order: 2
---
# Scripting

If you need to log into a site or run arbitrary JavaScript while a test is running, use WebPageTest scripts.

A script lets you automate a WebPageTest test. Here’s how it looks:

```markup
// EXAMPLE: log into a site before measuring a page

// Disable logging: we don’t want the login page to appear in test results
logData 0

// Visit the login page, enter the username and the password into the fields, and press “Submit”
navigate https://my-site.com/login
setValue name=email darth@vader.com
setValue name=password foooooooooooooooorce
click innerText=Sign in

// Now, as we’ve signed in, enable logging again
logData 1

// And go the page we’re measuring
navigate https://my-site.com/dashboard
```

Here’s another example:

```markup
// EXAMPLE: measure what happens when we interact with the page

// Go the page we’re measuring
navigate https://my-site.com/dashboard

// Give it a bit of time to initialize after loading
sleep 5

// Open the support dialog and wait for the page to become idle
execAndWait document.querySelector('.chat-dialog > button').click()
```

See more [commands](#recommended-commands) and [examples](#sample-scripts) below.

## Recommended Commands

For historical reasons, if a script step fails, it does so silently. If something doesn’t work, unfortunately, you won’t get any feedback why. If you’re new to scripting, we recommend using the following commands only. It’s easier to debug them as you can run them manually in the browser.

#### `navigate`
Navigates the browser to the provided URL and waits for it to complete.
Browser Support: IE, Chrome, Firefox, Safari

```markup
usage:   navigate <url>
example: navigate http://webmail.aol.com

<url> - URL to provide the browser for navigation (same as you would enter into the address bar)
```

#### `exec`
Executes JavaScript.
Browser Support: IE, Chrome, Firefox
```markup
usage:   exec <JavaScript code>
example: exec window.setInterval('window.scrollBy(0,600)', 1000);
```

#### `execAndWait`
Executes JavaScript and waits for the browser to complete any activity generated from the action.
Browser Support: IE, Chrome, Firefox
```markup
usage:   execAndWait <JavaScript code>
example: execAndWait window.setInterval('window.scrollBy(0,600)', 1000);
```

## Full Reference

### Comments

A line that starts with  `// ` is ignored. Use this for comments.

```markup
// Example comment
navigate not-a-comment.com
```

### Selectors

Commands like [`click`](#click), [`setValue`](#setvalue), and others operate on DOM elements. To select a DOM element, use the following selectors:

#### `<attribute>=<value>`

This selector selects elements based on their HTML attributes. For the following input:

```html
<input type="email" id="emailField" class="input input-email">
```

the following selectors will work:

* ✅ `type=email`
* ✅ `id=emailField`

and the following selectors will not:

* ❌ `class=input input-email` (spaces inside attribute values are not supported)
* ❌ `class="input input-email"` (not even if quoted)

Example:

```markup
// Set the email to darth@vader.com
setValue type=email darth@vader.com
```

#### `innerText=<text>`

This selector selects elements based on its inner text. For the following button:

```html
<button type="submit">Login</button>
```

the following selectors will work:

* ✅ `innerText=Login`

and the following selectors will not:

* ❌ `innerText=login` (the selector is case sensitive)
* ❌ `innerText=log` (the selector must match the full string)

Also, for a different button, this will not work either:

* ❌ `innerText=log in` (spaces inside the text are not supported)

Example:

```markup
// Click the Login button
click innerText=Login
```

#### `innerHtml=<html>`

This selector selects elements based on its inner HTML. For the following link:

```html
<a href="/dashboard"><span>Dashboard</span></button>
```

the following selectors will work:

* ✅ `innerHtml=<span>Dashboard</span>`

and the following selectors will not:

* ❌ `innerHtml=<span>dashboard</span>` (the selector is case sensitive)
* ❌ `innerHtml=span` (you can’t select just on tags)

Also, for a different link, this will not work either:

* ❌ `innerText=<span>Open Dashboard</span>` (spaces inside the HTML are not supported)

Example:

```markup
// Click the Dashboard link
click innerHtml=<span>Dashboard</span>
```

### Variable substitutions

Some variables are replaced based on the URL provided for the test.

#### `%URL%`

URL provided for the test.

```markup
URL: https://wpt.example
input: navigate %URL%
output: navigate  https://wpt.example
```

#### `%HOST%`

This will be the Host of the URL provided for the test. This does not include the protocol.

```markup
URL: https://wpt.example
input: setDnsName %HOST% dns.example
output: setDnsName  wpt.example dns.example
```

#### `%ORIGIN%`

The Origin of the URL. This includes the protocol, the host and the port (if it is defined).

```markup
URL: https://wpt.example/hello
input: setCookie  %ORIGIN% foo=bar
output: setCookie https://wpt.example foo=bar

URL: https://wpt.example:8080/hello
input: setCookie  %ORIGIN% foo=bar
output: setCookie https://wpt.example:8080 foo=bar
```

#### `%HOSTR%`

Same as [`%HOST%`](#host) but uses the final host name of the test URL after following any redirects.

```markup
URL: https://redirect.wpt.example
input: setDnsName %HOSTR% dns.example
output: setDnsName  wpt.example dns.example
```

### Navigation/DOM Interaction

#### `navigate`
Navigates the browser to the provided URL and waits for it to complete.
Browser Support: IE, Chrome, Firefox, Safari

```markup
usage:   navigate <url>
example: navigate http://webmail.aol.com

<url> - URL to provide the browser for navigation (same as you would enter into the address bar)
```

#### `click`
Triggers a click event for the identified DOM element. This version does not have an implied wait and the script will continue running after the event is submitted (see [`clickAndWait`](#clickandwait) for the wait version).
Browser Support: IE, Chrome, Firefox
```markup
usage:   click <wpt-selector>
example: click title=Delete

<wpt-selector> - DOM element to click on
```

For the list of supported selectors, see [Selectors](#selectors).

#### `clickAndWait`
Triggers a click event for the identified DOM element and subsequently waits for browser activity to complete.
Browser Support: IE, Chrome, Firefox
```markup
usage:   clickAndWait <wpt-selector>
example: clickAndWait innerText=Send

<wpt-selector> - DOM element to click on
```

For the list of supported selectors, see [Selectors](#selectors).

#### `selectValue`
Selects a value from a dropdown list of the given DOM element.
Browser Support: IE
```markup
usage:   selectValue <wpt-selector> <value>
example: selectValue id=country usa

<wpt-selector> - DOM element to select the value of
<value> - value to use
```

For the list of supported selectors, see [Selectors](#selectors).

#### `sendClick` / `sendClickAndWait`
Creates a JavaScript `onclick` event and sends it to the indicated element.
Browser Support: IE
```markup
usage:   sendClickAndWait <wpt-selector>
example: sendClickAndWait innerText=Send

<wpt-selector> - DOM element to send the click event to
```

For the list of supported selectors, see [Selectors](#selectors).

For the difference between `sendClick` and `sendClickAndWait`, see [`click`](#click) and [`clickAndWait`](#clickandwait).

#### `type` / `typeAndWait`
Simulate keyboard keypresses for each character in the given string.
Browser Support: Chrome
```markup
usage:   type <string>
example: type Hello World

<string> - String of characters to type into the keyboard.
```

For the difference between `type` and `typeAndWait`, see [`click`](#click) and [`clickAndWait`](#clickandwait).

#### `keypress` / `keypressAndWait`
Simulate a keyboard keypress for the given key.
Browser Support: Chrome
```markup
usage:   keypress <key>
example: keypress Enter

<key> - Keyboard key to simulate pressing. Full list of supported keys is [here](https://github.com/WPO-Foundation/wptagent/blob/master/internal/support/keys.json).
```

For the difference between `keypress` and `keypressAndWait`, see [`click`](#click) and [`clickAndWait`](#clickandwait).

#### `setInnerHTML`
Sets the innerHTML of the given DOM element to the provided value. This is usually used for filling in something like an editable HTML panel (like the message body in webmail). Use this if you want to include HTML formatting.
Browser Support: IE, Chrome, Firefox
```markup
usage:   setInnerHTML <wpt-selector> <value>
example: setInnerHTML contentEditable'true %MSG%

<wpt-selector> - DOM element to set the innerText of
<value> - value to use
```

For the list of supported selectors, see [Selectors](#selectors).

#### `setInnerText`
Sets the innerText of the given DOM element to the provided value. This is usually used for filling in something like an editable HTML panel (like the message body in webmail). Use this if you don't want to include any HTML formatting.
Browser Support: IE, Chrome, Firefox
```markup
usage:   setInnerText <wpt-selector> <value>
example: setInnerText contentEditable'true %MSG%

<wpt-selector> - DOM element to set the innerText of
<value> - value to use
```

For the list of supported selectors, see [Selectors](#selectors).

#### `setValue`
Sets the value attribute of the given DOM element to the provided value. This is usually used for filling in text elements on a page (forms or otherwise). Currently only `input` and `textArea` element types are supported.
Browser Support: IE, Chrome, Firefox
```markup
usage:   setValue <wpt-selector> <value>
example: setValue name=loginId userName

<wpt-selector> - DOM element to set the value of
<value> - value to use
```

For the list of supported selectors, see [Selectors](#selectors).

#### `submitForm`
Triggers a `submit` event for the identified form.
Browser Support: IE, Chrome, Firefox
```markup
usage:   submitForm <wpt-selector>
example: submitForm name=AOLLoginForm

<wpt-selector> - Form element to submit
```

For the list of supported selectors, see [Selectors](#selectors).

#### `exec`
Executes JavaScript.
Browser Support: IE, Chrome, Firefox
```markup
usage:   exec <JavaScript code>
example: exec window.setInterval('window.scrollBy(0,600)', 1000);
```

#### `execAndWait`
Executes JavaScript and waits for the browser to complete any activity generated from the action.
Browser Support: IE, Chrome, Firefox
```markup
usage:   execAndWait <JavaScript code>
example: execAndWait window.setInterval('window.scrollBy(0,600)', 1000);
```

### End Conditions

#### `setABM`
Sets the "Activity Based Measurement" mode. The valid values are:
* 0 - Disabled (Web 1.0 - Measure based off of document complete)
* 1 - Enabled (Web 2.0 - Measure until activity stops)

The default if not specified in the script is 1 (Enabled).
Browser Support: IE, Chrome, Firefox

```markup
usage:   setABM <mode>
example: setABM 0

<mode> - ABM mode to use
```

#### `setActivityTimeout`
Overrides the timeout value for the time after the last network activity before a test is considered complete (defaults to 2000 which is 2 seconds).
Browser Support: IE, Chrome, Firefox, Safari
```markup
usage:   setActivityTimeout <timeout in milliseconds>
example: setActivityTimeout 5000

<timeout in milliseconds> - Number of milliseconds after the last network activity (after onload) before calling a test done.
```

#### `setTimeout`
Overrides the timeout value for the individual script steps.
Browser Support: IE, Chrome, Firefox, Safari
```markup
usage:   setTimeout <timeout in seconds>
example: setTimeout 240

<timeout in seconds> - Number of seconds to allow for the navigation/step to complete.
```

#### `waitFor`
Poll the page waiting for the supplied script to evaluate to true. Must be set before the navigation step that is to be measured and persists until cleared (by providing an empty script).
```markup
usage:   waitFor <JavaScript snippet>
example: waitFor document.getElementById('results-with-statistics') && document.getElementById('results-with-statistics').innerText.length > 0

<JavaScript snippet> - Code to evaluate periodically to test for complete. Should evaluate to true when the step is to stop.
```

#### `waitInterval`
Set the polling interval (in seconds) for the [`waitFor`](#waitfor) command. Defaults to a 5-second polling interval to minimize overhead.
```markup
usage:   waitInterval <interval in seconds>
example: waitInterval 1.5

<interval in seconds> - Polling interval (in seconds). Supports sub-second values as a float.
```

### Request Manipulation

#### `block`
Blocks individual requests from loading (useful for blocking content like ads). The command matches the list of things to block against the full url of each request (including host name).
Browser Support: IE, Chrome, Firefox
```markup
usage:   block <block strings>
example: block adswrapper.js addthis.com

<block strings> - space-delimited list of substrings to block
```

#### `blockDomains`
Blocks all requests from the given domains from loading (useful for blocking content like ads). Takes a space-delimited list of full domains to block.
Browser Support: Desktop (wptdriver 300+)
```
usage:   blockDomains <block domains>
example: blockDomains adswrapper.js addthis.com

<block domains> - space-delimited list of domains to block
```

#### `blockDomainsExcept`
Blocks all requests not from one of the given domains from loading (useful for blocking content like ads). Takes a space-delimited list of full domains to allow.
Browser Support: Desktop (wptdriver 300+)
```markup
usage:   blockDomainsExcept <allow domains>
example: blockDomainsExcept www.example.com cdn.example.com

<allow domains> - space-delimited list of domains to allow
```

#### `setCookie`
Stores a browser cookie to be used while navigating.
Browser Support: IE, Chrome, Firefox
```markup
usage:   setCookie <path> <value>
example: setCookie http://www.aol.com zip=20166
example: setCookie http://www.aol.com TestData = Test; expires = Sat,01-Jan-2000 00:00:00 GMT

<path> - Path where the cookie should be used/stored
<value> - Cookie value (if expiration information isn't included it will be stored as a session cookie)
```

#### `setDns`
Allows for overriding the IP address to be used for a host name. The override is effectively the same as populating an entry in the hosts file and will eliminate the DNS lookup times.
Browser Support: IE, Chrome, Firefox, Safari
```markup
usage:   setDns <host name> <IP Address>
example: setDns www.aol.com 127.0.0.1

<host name> - Host name for the DNS entry to override
<IP Address> - IP Address for the host name to resolve to
```

#### `setDNSName`
Allows for overriding a host name (creating a fake CNAME).
Browser Support: IE, Chrome, Firefox, Safari
```markup
usage:   setDnsName <name to override> <real name>
example: setDnsName pat.aol.com www.aol.com

<name to override> - Host name to replace
<real name> - Real name to lookup instead
```

#### `setUserAgent`
Overrides the User Agent string sent by the browser
Browser Support: IE, Chrome, Firefox, Safari

CAUTION : You will still be using the same browser engine so you are still limited by the capabilities and behavior of that browser even if you are spoofing another browser
```markup
usage:   setUserAgent <user agent string>
example: setUserAgent Mozilla/5.0 (iPhone; U; CPU like Mac OS X; en) AppleWebKit/420+ (KHTML, like Gecko) Version/3.0 Mobile/1A543 Safari/419.3

<user agent string> - User agent string to use.
```

#### `overrideHost`
Replaces the value of the Host: HTTP header for the given host with the provided replacement.  It also adds a new header (`X-Host:`) with the original value.
Browser Support: IE, Chrome, Firefox, Safari (no SSL)
```markup
usage:   overrideHost <host> <new host>
example: overrideHost www.aol.com www.notaol.com

<host> - host for which you want to override the Host: HTTP header
<new host> - value to set for the Host header
```

#### `addHeader`
Adds the specified header to every http request (in addition to the headers that exist, does not overwrite an existing header).
Browser Support: IE, Chrome, Firefox, Safari (no SSL)
```markup
usage:   addHeader <header>
example: addHeader Pragma: akamai-x-cache-on

<header> - Full header entry to add (including label)
```

#### `setHeader`
Adds the specified header to every http request, overriding the header if it already exists.
Browser Support: IE, Chrome, Firefox, Safari (no SSL)
```markup
usage:   setHeader <header>
example: setHeader UA-CPU: none-ya

<header> - Full header entry to set (including label)
```

#### `resetHeaders`
Clears any headers that were specified through addHeaders or setHeaders (in case you want to only override headers for part of a script).
Browser Support: IE, Chrome, Firefox, Safari
```markup
usage:   resetHeaders
example: resetHeaders
```

### Misc

#### `combineSteps`
Causes multiple script steps to be combined into a single "step" in the results
Browser Support: IE, Chrome, Firefox, Safari
```markup
usage:   combineSteps [count]
example: combineSteps

[count] - Number of script steps to merge (optional, defaults to 0 which is ALL)
Sample Script:

combineSteps
navigate www.google.com
navigate www.yahoo.com
navigate www.aol.com
```

#### `clearCache`
Clears all cache and cookies.
Browser Support: Chrome, Safari on iOS

```markup
usage:   clearCache
example: clearCache
```

#### `firefoxPref`
Allows you to specify arbitrary preferences that will be configured before launching the browser.
Browser Support: Firefox
```markup
usage:   firefoxPref <pref> <value>
examples:
firefoxPref network.http.pipelining false
firefoxPref network.http.pipelining.maxrequests 5
firefoxPref general.useragent.override "Some User Agent String"

<pref> - The preference that is to be modified
<value> - The value to use.  String values should be enclosed in quotes like the example.
```

#### `setEventName`
Sets the name of the event for the next measurable operation. It is important to only set this right before the action that will generate the activity you want to measure so that you don't inadvertently measure other page activity. Without explicit event names each step will be automatically named Step_1, Step_2, etc.
Browser Support: IE
```markup
usage:   setEventName <event name>
example: setEventName loadWebmail

<event name> - Name to use for the event about to occur (in resulting log files)
```

#### `setLocation`
Specifies a geolocation override position.
Browser Support: Chrome
```markup
usage:   setLocation <lat>,<lng> <accuracy>
example: setLocation 38.954980,-77.447956 10

<lat> - Latitude
<lng> - Longitude
<accuracy> - Accuracy (in meters)
```

#### `setViewportSize`
Changes the size of the visible browser window so that the page viewport matches the given dimensions.  If you get black areas on your screen shots then the viewport is larger than the desktop.
Browser Support: IE, Chrome, Firefox, Safari
```markup
usage:   setViewportSize <width> <height>
example: setViewportSize 320 365

<width> - Viewport Width
<height> - Viewport Height
```

#### `sleep`
Pauses the script operation for a given number of seconds.
Browser Support: IE, Chrome, Firefox, Safari
```markup
usage:   sleep <seconds to sleep>
example: sleep 5

<seconds to sleep> - An integer indicating how long to sleep.  The allowable range is 1-30.
```

## Debugging

There is currently no way to debug failing WebPageTest scripts. If a script command fails, it will fail silently.

To simplify script development, consider limiting yourself to [Recommended commands](#recommended-commands) only.

## Sample scripts

### DNS Override
This script will:

* Create a fake DNS entry for www1.aol.com and have it lookup www.aol.com instead
* Force www.aol.com to resolve to 127.0.0.1
* Set a "zip" cookie on the www.aol.com domain
* Navigate and measure the time to load www.aol.com
```markup
setDnsName www1.aol.com www.aol.com
setDns www.aol.com 127.0.0.1
setCookie http://www.aol.com zip=20166
navigate http://www.aol.com
```

### iPhone Spoofing
This script will:

* Use the iPhone user agent string
* Change the browser dimensions to match the iPhone
* Navigate to www.aol.com
```markup
setUserAgent Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25
setViewportSize 320 356
navigate http://www.aol.com
```
