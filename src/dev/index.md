# WebPageTest System Design

WebPageTest is made up of several components that work together to provide the full end-to-end experience. There are 2 primary components to WebPageTest:

[WebPageTest server](https://github.com/WPO-Foundation/webpagetest): PHP-based component that runs the main UI, API endpoints and manages the queuing and processing of the tests.

[wptagent](https://github.com/WPO-Foundation/wptagent): Python-based cross-platform (Linux, Windows, MacOS, iOS, Android, Raspbian) component responsible for running tests and posting the results to the WebPageTest server.

Additionally, there are several utilities used by the main components or helper scripts for automating installation:

[wptserver-install](https://github.com/WPO-Foundation/wptserver-install): Installation script for automating the install of a new WebPageTest server with Nginx and php-fpm on an Ubuntu server instance.

[wptagent-install](https://github.com/WPO-Foundation/wptagent-install): Installation script for automating the install and configuration of wptagent on an Ubuntu server image and MacOS (including browser installation, automatic agent startup and updating, etc).

[iWptBrowser](https://github.com/WPO-Foundation/iWptBrowser): On-device iOS component that works with wptagent for iOS device testing.

[win-shaper](https://github.com/WPO-Foundation/win-shaper): Windows implementation of packet-level traffic-shaping similar to dummynet and used by wptagent on Windows.

[vpn-reverse-tether](https://github.com/WPO-Foundation/vpn-reverse-tether): Android implementation of reverse-tethering for use by wptagent when testing Android devices.

[browser-install](https://github.com/WPO-Foundation/browser-install): Windows helper utility for installing browsers and keeping them up to date.

## WebPageTest Server

### Processing Flows
#### Submitting a test
#### Test Processing
#### Viewing a test result

### Test Archiving

### Load Balancing Multiple Servers

## wptagent

### Testing Flow
### Class Hierarchy
