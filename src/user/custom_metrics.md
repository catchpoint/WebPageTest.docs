# Custom Metrics

WebPagetest can execute arbitrary javascript at the end of a test to collect custom metrics.  These can be defined statically in the server configuration or be specified at runtime on a per-test basis.

The javascript should be written as if it were executing inside of a function call and return the custom metric at the end.  Here is an example that finds the meta viewport for the page and extracts it:
```javascript
var viewport = undefined;
var metaTags=document.getElementsByTagName("meta");
for (var i = 0; i < metaTags.length; i++) {
    if (metaTags[i].getAttribute("name") == "viewport") {
        viewport = metaTags[i].getAttribute("content");
        break;
    }
}
return viewport;
```

## Supported Browsers
* Internet Explorer
* Chrome
* Firefox

## Things to watch out for
* Asynchronous operations are supported by returning a Promise, but it must resolve after 30 seconds.
* Custom metrics live in the same namespace as the built-in metrics and can override built-in metrics if they have the same name.
* Metric names should be simple alpha-numeric and probably without spaces.

## Specifying custom metrics at test time
The text input box for the metrics takes the metrics definitions in the form of an ini file for simplicity:
```ini
[metric-name]
<code>

[metric-2-name]
<metric 2 code>
```

Here is an example that collects 3 different metrics (2 numerical and one string):
```javascript
[iframe-count]
return document.getElementsByTagName("iframe").length;

[script-tag-count]
return document.getElementsByTagName("script").length;

[meta-viewport]
var viewport = undefined;
var metaTags=document.getElementsByTagName("meta");
for (var i = 0; i < metaTags.length; i++) {
    if (metaTags[i].getAttribute("name") == "viewport") {
        viewport = metaTags[i].getAttribute("content");
        break;
    }
}
return viewport;
```

## Specifying custom metrics statically (private instances)

Each metric lives as a separate file under settings/custom_metrics with a .js extension.  The file name will be the recorded name of the metric and the result of executing the code will be the value.

For example, a file ***settings/custom_metrics/meta-viewport.js*** would define a custom variable ***meta-viewport*** and the contents would look like:
```javascript
var viewport = undefined;
var metaTags=document.getElementsByTagName("meta");
for (var i = 0; i < metaTags.length; i++) {
    if (metaTags[i].getAttribute("name") == "viewport") {
        viewport = metaTags[i].getAttribute("content");
        break;
    }
}
return viewport;
```

## Accessing Requests Data (Chrome-only)

Usually custom metrics only have access to the DOM but WebPageTest supports a script substitution where it will replace any occurrences of **$WPT_REQUESTS** or **$WPT_BODIES** in the script with a javascript array that contains the raw request data, optionally including text bodies, headers and other details provided by the Chrome dev tools protocol. The requests are ordered in the order that theywere created, not necessarily the order they were sent on the network.

* **$WPT_REQUESTS** - All request data except for bodies (significantly smaller)
* **$WPT_BODIES** - All request data including bodies in the "response_body" entry

Non-Chrome browsers (or in the case of an error collecting the requests) the replacement will replace null instead of an array (so it can be checked explicitly and differently from an empty array). That should make it possible to use the same script across all browsers.

For example, this script will return the number of requests:
```javascript
[num-requests]
let requests = $WPT_REQUESTS;
return requests.length;
```

This is an example of what each entry in the requests array looks like:
```javascript
{
    "id": "27F45246DFB3A2305FD309B6E7939FB8",
    "sequence": 1,
    "response_body": "<!DOCTYPE html>\r\n<html>...(or null if body is not available)",
    "url": "https:\/\/www.webpagetest.org\/",
    "status": 200,
    "connectionId": 65,
    "protocol": "http\/1.1",
    "connectionReused": false,
    "fromServiceWorker": false,
    "timing": {
        "requestTime": 10087.17201,
        "proxyStart": -1,
        "proxyEnd": -1,
        "dnsStart": 1.2210000000000001,
        "dnsEnd": 3.5819999999999999,
        "connectStart": 3.5819999999999999,
        "connectEnd": 12.978999999999999,
        "sslStart": 4.6310000000000002,
        "sslEnd": 12.970000000000001,
        "workerStart": -1,
        "workerReady": -1,
        "sendStart": 14.414,
        "sendEnd": 14.616,
        "pushStart": 0,
        "pushEnd": 0,
        "receiveHeadersEnd": 79.477000000000004
    },
    "fromDiskCache": false,
    "remoteIPAddress": "192.168.0.1",
    "remotePort": 443,
    "securityState": "secure",
    "securityDetails": {
        "protocol": "TLS 1.2",
        "keyExchange": "ECDHE_RSA",
        "keyExchangeGroup": "X25519",
        "cipher": "CHACHA20_POLY1305",
        "certificateId": 0,
        "subjectName": "webpagetest.org",
        "sanList": [
            "agent.webpagetest.org",
            "api.webpagetest.org",
            "cdn.webpagetest.org",
            "dev.webpagetest.org",
            "grafana.webpagetest.org",
            "origin.webpagetest.org",
            "staging.webpagetest.org",
            "static.webpagetest.org",
            "webpagetest.org",
            "www.webpagetest.org"
        ],
        "issuer": "Let's Encrypt Authority X3",
        "validFrom": 1585489109,
        "validTo": 1593265109,
        "signedCertificateTimestampList": [
            {
                "status": "Verified",
                "origin": "Embedded in certificate",
                "logDescription": "Cloudflare 'Nimbus2020' Log",
                "logId": "5EA773F9DF56C0E7B536487DD049E0327A919A0C84A112128418759681714558",
                "timestamp": 1585492709357.0002,
                "hashAlgorithm": "SHA-256",
                "signatureAlgorithm": "ECDSA",
                "signatureData": "3044022029B253B977007F0896D940711887D8B8FC53A5660448A41B1EAC953998D7629802207172001F3DCA94418A5A9BB7F5E212C52B15FC9A992BF4727C4CC3C8F67D7C57"
            },
            {
                "status": "Verified",
                "origin": "Embedded in certificate",
                "logDescription": "Google 'Xenon2020' log",
                "logId": "07B75C1BE57D68FFF1B0C61D2315C7BAE6577C5794B76AEEBC613A1A69D3A21C",
                "timestamp": 1585492709397,
                "hashAlgorithm": "SHA-256",
                "signatureAlgorithm": "ECDSA",
                "signatureData": "3045022064BD114975245658DDAB0494A2B79E87D9A2A43DD574041433AED26F6BE1ED8E02210083BBC6A4A68D15581374ACBB722D2AB99CF019BF0FF4DEF57AF1C75F20BE102B"
            }
        ],
        "certificateTransparencyCompliance": "compliant"
    },
    "fromPrefetchCache": false,
    "response_headers": {
        "Server": "nginx\/1.14.0 (Ubuntu)",
        "Date": "Wed, 08 Apr 2020 20:15:55 GMT",
        "Content-Type": "text\/html; charset=UTF-8",
        "Transfer-Encoding": "chunked",
        "Connection": "keep-alive",
        "Vary": "Accept-Encoding",
        "Access-Control-Allow-Origin": "*",
        "Set-Cookie": "o=d62f6783866a105f09bd9f6d43aa2b2259f5e4dc; expires=Thu, 08-Apr-2021 20:15:55 GMT; Max-Age=31536000; path=\/",
        "Timing-Allow-Origin": "*",
        "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
        "Link": "<https:\/\/www.webpagetest.org\/>; rel=\"canonical\"",
        "Content-Encoding": "gzip"
    },
    "request_headers": {
        "Host": "www.webpagetest.org",
        "Connection": "keep-alive",
        "Upgrade-Insecure-Requests": "1",
        "User-Agent": "Mozilla\/5.0 (X11; Linux x86_64) AppleWebKit\/537.36 (KHTML, like Gecko) Chrome\/81.0.4044.92 Safari\/537.36 PTST\/200408.160406",
        "Accept": "text\/html,application\/xhtml+xml,application\/xml;q=0.9,image\/webp,image\/apng,*\/*;q=0.8,application\/signed-exchange;v=b3;q=0.9",
        "Sec-Fetch-Site": "cross-site",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Dest": "document",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-US,en;q=0.9"
    },
    "initiator": {
        "type": "script",
        "stack": {
            "callFrames": [
                {
                    "functionName": "",
                    "scriptId": "8",
                    "url": "",
                    "lineNumber": 0,
                    "columnNumber": 209
                }
            ]
        }
    },
    "documentURL": "https:\/\/www.webpagetest.org\/",
    "timestamp": 10087.170656,
    "frameId": "995DB78860532C6756D0E882BFB492E6",
    "hasUserGesture": false,
    "type": "Document",
    "wallTime": 1586376955.1205921,
    "transfer_size": 39755
}
```
