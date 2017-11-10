# Microsoft Edge Agent Design

## Failed Designs

### Extension Direct to wptagent
The initial plan for detecting the browser activity for Microsoft Edge was to use the same architecture as the Firefox agent where an extension listens to [webNavigation](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/webNavigation) and [webRequest](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/webRequest) events and forwards them to wptagent using fetch to POST the data to http://127.0.0.1:8888/.

