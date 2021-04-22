---
eleventyNavigation:
  key: Scripting
  order: 2
---
# Scripting
WebPageTest has a scripting capability that lets you automate a multi-step test (for example, logging into a site or sending an e-mail message). 

Each line of the script file contains a command and any necessary parameters and is tab-delimited (i.e. the command is followed by a tab then the first parameter then a tab and the second parameter etc until the end of the line). The number of parameters and what they control is dependent on the command.

Blank lines and lines beginning with // are ignored so you can embed comments in a script.
Script commands that operate on a DOM element identify the DOM element with a format of attribute=value where the attribute identifies a unique attribute of the DOM element that you want to act on. For example, if you are filling out a form and the element you want to populate looks like this:

```html
<input type="text" class="tabInputFields" id="lgnId1" value="" tabindex="1" maxlength="97" name="loginId"/>
```

you could identify it as **id=lgnId1** , **name=loginId** or **tabindex=1**

For form fields it is usually best to use the name attribute when it is available since that is what will be uploaded to the server but any attribute is fair game. The class attribute is special and is referenced as className instead of class. In addition to the DOM element attribute matching, there are two special attributes that you can use to match on the contents. innerText and innerHtml both of which will match the contents of the DOM element instead of it's attributes.
For example:
```html
<div dojoattachpoint="containerNode" class="label">Delete</div>
```
Can be identified by innerText=Delete. The matching is case sensitive and matches the full string.

In order to suppress intermediate steps you need to make sure that data logging is disabled for the steps up to the ones you want to record. For example:

```
logData    0

// put any urls you want to navigate
navigate    www.aol.com
navigate    news.aol.com

logData    1

// this step will get recorded
navigate    news.aol.com/world
```

The script above will navigate to the main aol portal, then to the news page and then finally to the world-news specific page (logging results for just the world news page). This lets you test the impact of a given path to a site on it's performance (shared css and js caching for example).

Another significant use case is if you want to test a site that requires authentication. Here is what an authentication script would look like:

```
logData	0

// bring up the login screen
navigate	http://webmail.aol.com

logData	1

// log in
setValue	name=loginId	someuser@aol.com
setValue	name=password	somepassword
submitForm	name=AOLLoginForm
```

You won't get a lot of feedback as to why a script failed. For debugging purposes it is easiest to limit scripts to navigate and exec/execAndWait commands which can be debugged locally in a browser's dev tools.

## Command Reference

### Navigation/DOM Interaction

#### navigate
Navigates the browser to the provided URL and waits for it to complete.
Browser Support: IE, Chrome, Firefox, Safari
```
usage: navigate	<url>
example: navigate	http://webmail.aol.com

<url> - URL to provide the browser for navigation (same as you would enter into the address bar)
```

#### click
Triggers a click event for the identified DOM element. This version does not have an implied wait and the script will continue running after the event is submitted (see clickAndWait for the wait version).
Browser Support: IE, Chrome, Firefox
```
usage: click	<attribute=value>
example: click	title=Delete (del)

<attribute'value> - DOM element to click on
```

#### clickAndWait
Triggers a click event for the identified DOM element and subsequently waits for browser activity to complete.
Browser Support: IE, Chrome, Firefox
```
usage: clickAndWait	<attribute=value>
example: clickAndWait	innerText=Send

<attribute'value> - DOM element to click on
```

#### selectValue
Selects a value from a dropdown list of the given DOM element.
Browser Support: IE
```
usage: selectValue	<attribute=value>	<value>
example: selectValue	id=country	usa

<attribute=value> - DOM element to select the value of
<value> - value to use
```

#### sendClick / sendClickAndWait
Creates a javascript OnClick event and sends it to the indicated element.
Browser Support: IE
```
usage: sendClickAndWait	<attribute=value>
example: sendClickAndWait	innerText=Send

<attribute=value> - DOM element to send the click event to
```

#### sendKeyDown / sendKeyUp / sendKeyPress (AndWait)
Creates a javascript keyboard event (OnKeyDown, OnKeyUp, OnKeyPress) and sends it to the indicated element.
Browser Support: IE
```
usage: sendKeyDownAndWait	<attribute=value>    <key>
example: sendKeyDownAndWait	name=user    x

<attribute=value> - DOM element to send the click event to
<key> - Key command to send (special values are ENTER, DEL, DELETE, BACKSPACE, TAB, ESCAPE, PAGEUP, PAGEDOWN)
```

#### setInnerHTML
Sets the innerHTML of the given DOM element to the provided value. This is usually used for filling in something like an editable HTML panel (like the message body in webmail). Use this if you want to include HTML formatting.
Browser Support: IE, Chrome, Firefox
```
usage: setInnerHTML	<attribute=value>	<value>
example: setInnerHTML	contentEditable'true	%MSG%

<attribute=value> - DOM element to set the innerText of
<value> - value to use
```

#### setInnerText
Sets the innerText of the given DOM element to the provided value. This is usually used for filling in something like an editable HTML panel (like the message body in webmail). Use this if you don't want to include any HTML formatting.
Browser Support: IE, Chrome, Firefox
```
usage: setInnerText	<attribute=value>	<value>
example: setInnerText	contentEditable'true	%MSG%

<attribute=value> - DOM element to set the innerText of
<value> - value to use
```

#### setValue
Sets the value attribute of the given DOM element to the provided value. This is usually used for filling in text elements on a page (forms or otherwise). Currently only "input" and "textArea" element types are supported.
Browser Support: IE, Chrome, Firefox
```
usage: setValue	<attribute=value>	<value>
example: setValue	name=loginId	userName

<attribute=value> - DOM element to set the value of
<value> - value to use
```

#### submitForm
Triggers a submit event for the identified form.
Browser Support: IE, Chrome, Firefox
```
usage: submitForm	<attribute=value>
example: submitForm	name=AOLLoginForm

<attribute=value> - Form element to submit
```

#### exec
Executes javascript.
Browser Support: IE, Chrome, Firefox
```
usage: exec	<javascript code>
example: exec	window.setInterval('window.scrollBy(0,600)', 1000);
```

#### execAndWait
Executes javascript and waits for the browser to complete any activity generated from the action.
Browser Support: IE, Chrome, Firefox
```
usage: execAndWait	<javascript code>
example: execAndWait	window.setInterval('window.scrollBy(0,600)', 1000);
```

### End Conditions

#### setABM
Sets the "Activity Based Measurement" mode. The valid values are:
* 0 - Disabled (Web 1.0 - Measure based off of document complete)
* 1 - Enabled (Web 2.0 - Measure until activity stops)
The default if not specified in the script is 1 (Enabled)
Browser Support: IE, Chrome, Firefox
```
usage: setABM	<mode>
example: setABM	0

<mode> - ABM mode to use
```

#### setActivityTimeout
Overrides the timeout value for the time after the last network activity before a test is considered complete (defaults to 2000 which is 2 seconds).
Browser Support: IE, Chrome, Firefox, Safari
```
usage: setActivityTimeout	<timeout in milliseconds>
example: setActivityTimeout	5000

<timeout in milliseconds> - Number of milliseconds after the last network activity (after onload) before calling a test done.
```

#### setTimeout
Overrides the timeout value for the individual script steps.
Browser Support: IE, Chrome, Firefox, Safari

usage: setTimeout	<timeout in seconds>
example: setTimeout	240

<timeout in seconds> - Number of seconds to allow for the navigation/step to complete.

### Request Manipulation

#### block
Blocks individual requests from loading (useful for blocking content like ads). The command matches the list of things to block against the full url of each request (including host name).
Browser Support: IE, Chrome, Firefox
```
usage: block    <block strings>
example: block    adswrapper.js addthis.com

<block strings> - space-delimited list of substrings to block
```

#### blockDomains
Blocks all requests from the given domains from loading (useful for blocking content like ads). Takes a space-delimited list of full domains to block.
Browser Support: Desktop (wptdriver 300+)
```
usage: blockDomains    <block domains>
example: blockDomains    adswrapper.js addthis.com

<block domains> - space-delimited list of domains to block
```

#### blockDomainsExcept
Blocks all requests not from one of the given domains from loading (useful for blocking content like ads). Takes a space-delimited list of full domains to allow.
Browser Support: Desktop (wptdriver 300+)
```
usage: blockDomainsExcept    <allow domains>
example: blockDomainsExcept    www.example.com cdn.example.com

<allow domains> - space-delimited list of domains to allow
```

#### setCookie
Stores a browser cookie to be used while navigating.
Browser Support: IE, Chrome, Firefox
```
usage: setCookie	<path>	<value>
example: setCookie	http://www.aol.com	zip=20166
example: setCookie	http://www.aol.com	TestData = Test; expires = Sat,01-Jan-2000 00:00:00 GMT

<path> - Path where the cookie should be used/stored
<value> - Cookie value (if expiration information isn't included it will be stored as a session cookie)
```

#### setDns
Allows for overriding the IP address to be used for a host name. The override is effectively the same as populating an entry in the hosts file and will eliminate the DNS lookup times.
Browser Support: IE, Chrome, Firefox, Safari
```
usage: setDns	<host name>	<IP Address>
example: setDns	www.aol.com	127.0.0.1

<host name> - Host name for the DNS entry to override
<IP Address> - IP Address for the host name to resolve to
```

#### setDNSName
Allows for overriding a host name (creating a fake CNAME).
Browser Support: IE, Chrome, Firefox, Safari
```
usage: setDnsName	<name to override>	<real name>
example: setDnsName	pat.aol.com	www.aol.com

<name to override> - Host name to replace
<real name> - Real name to lookup instead
```

#### setUserAgent
Overrides the User Agent string sent by the browser
Browser Support: IE, Chrome, Firefox, Safari

CAUTION : You will still be using the same browser engine so you are still limited by the capabilities and behavior of that browser even if you are spoofing another browser
```
usage: setUserAgent    <user agent string>
example: setUserAgent    Mozilla/5.0 (iPhone; U; CPU like Mac OS X; en) AppleWebKit/420+ (KHTML, like Gecko) Version/3.0 Mobile/1A543 Safari/419.3

<user agent string> - User agent string to use.
```

#### overrideHost
Replaces the value of the Host: HTTP header for the given host with the provided replacement.  It also adds a new header (x-Host:) with the original value.
Browser Support: IE, Chrome, Firefox, Safari (no SSL)
```
usage: overrideHost	<host>    <new host>
example: overrideHost	www.aol.com    www.notaol.com

<host> - host for which you want to override the Host: HTTP header
<new host> - value to set for the Host header
```

#### overrideHostUrl
For all requests to the given host, rewrite the requests to go to a different server and include the original host in the new URI.
Browser Support: IE
```
usage: overrideHostUrl	<host>    <new host>
example: overrideHostUrl	www.webpagetest.org    staging.webpagetest.org

<host> - host for which you want to redirect requests
<new host> - target server to receive the redirected requests
```
In this example, http://www.webpagetest.org/index.php will get rewritten to actually request http://staging.webpagetest.org/www.webpagetest.org/index.php

#### addHeader
Adds the specified header to every http request (in addition to the headers that exist, does not overwrite an existing header).
Browser Support: IE, Chrome, Firefox, Safari (no SSL)
```
usage: addHeader	<header>    {filter}
example: addHeader	Pragma: akamai-x-cache-on

<header> - Full header entry to add (including label)
{filter} - (optional) regex match for host names where the header should be added
```

#### setHeader
Adds the specified header to every http request, overriding the header if it already exists.
Browser Support: IE, Chrome, Firefox, Safari (no SSL)
```
usage: setHeader	<header>    {filter}
example: setHeader	UA-CPU: none-ya

<header> - Full header entry to set (including label)
{filter} - (optional) regex match for host names where the header should be set
```

#### resetHeaders
Clears any headers that were specified through addHeaders or setHeaders (in case you want to only override headers for part of a script).
Browser Support: IE, Chrome, Firefox, Safari
```
usage: resetHeaders
example: resetHeaders
```

### Misc

#### combineSteps
Causes multiple script steps to be combined into a single "step" in the results
Browser Support: IE, Chrome, Firefox, Safari
```
usage: combineSteps	[count]
example: combineSteps

[count] - Number of script steps to merge (optional, defaults to 0 which is ALL)
Sample Script:

combineSteps
navigate	www.google.com
navigate	www.yahoo.com
navigate	www.aol.com
```

#### if/else/endif
Conditionally execute a block of script code based on run number or cached state for the test.  Conditional blocks can be nested.
Browser Support: IE, Chrome, Firefox, Safari
```
usage:  if	[cached|run]    <value>
        else
        endif

example:    if    run    1
            if    cached    0
            <do something for first view of first run>
            endif
            else
            <do something else for everything but first run>
            endif

[cached|run] - Compare against run number or cached state
<value> - matching run number or cached state to execute block
```

#### expireCache
Expires any cache entries that will expire within the specified number of seconds.  This can be used to simulate a repeat view after a certain amount of time (for example, what it would be like to browse the page the next day).  It doesn't help with simulating content changes but any resources with a short expiration will end up being checked with if-modified-since requests.
Browser Support: IE
```
usage: expireCache	<seconds>
example: expireCache	86400

<seconds> - Any resources with a cache lifetime less than this amount of time will be forced to expire.
```

#### firefoxPref
Allows you to specify arbitrary preferences that will be configured before launching the browser.
Browser Support: Firefox
```
usage: firefoxPref	<pref>    <value>
examples:
firefoxPref    network.http.pipelining    false
firefoxPref    network.http.pipelining.maxrequests    5
firefoxPref    general.useragent.override    "Some User Agent String"

<pref> - The preference that is to be modified
<value> - The value to use.  String values should be enclosed in quotes like the example.
```

#### setEventName
Sets the name of the event for the next measurable operation. It is important to only set this right before the action that will generate the activity you want to measure so that you don't inadvertently measure other page activity. Without explicit event names each step will be automatically named Step_1, Step_2, etc.
Browser Support: IE
```
usage: setEventName	<event name>
example: setEventName	loadWebmail

<event name> - Name to use for the event about to occur (in resulting log files)
```

#### setLocation
Specifies a geolocation override position.
Browser Support: Chrome
```
usage: setLocation	<lat>,<lng>    <accuracy>
example: setLocation    38.954980,-77.447956    10

<lat> - Latitude
<lng> - Longitude
<accuracy> - Accuracy (in meters)
```

#### setViewportSize
Changes the size of the visible browser window so that the page viewport matches the given dimensions.  If you get black areas on your screen shots then the viewport is larger than the desktop.
Browser Support: IE, Chrome, Firefox, Safari
```
usage: setViewportSize	<width>    <height>
example: setViewportSize    320    365

<width> - Viewport Width
<height> - Viewport Height
```

#### sleep
Pauses the script operation for a given number of seconds.
Browser Support: IE, Chrome, Firefox, Safari
```
usage: sleep	<seconds to sleep>
example: sleep	5

<seconds to sleep> - An integer indicating how long to sleep.  The allowable range is 1-30.
```

## Sample scripts
### Mail test
```
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
```
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

* Create a fake DNS entry for www1.aol.com and have it lookup www.aol.com instead
* Force www.aol.com to resolve to 127.0.0.1
* Set a "zip" cookie on the www.aol.com domain
* Navigate and measure the time to load www.aol.com
```
setDnsName	www1.aol.com	www.aol.com
setDns	www.aol.com	127.0.0.1
setCookie	http://www.aol.com	zip=20166
navigate	http://www.aol.com
```

#### iPhone Spoofing
This script will:

* Use the iPhone user agent string
* Change the browser dimensions to match the iPhone
* Navigate to www.aol.com
```
setUserAgent	Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25
setViewportSize    320    356
navigate	http://www.aol.com
```
