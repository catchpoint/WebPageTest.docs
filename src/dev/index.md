---
title: 'WebPageTest System Design'
---
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
![Submit test flow](/img/submit-test-flow.png)
All tests are submitted through the runtest.php entrypoint.  The UI pages for submitting tests are just forms that populate the appropriate API parameters. Resubmitting an existing test is a slight exception in that it doesn't provide all of the test params in the call to runtest.php, it passes the existing test ID and runtest.php loads all of the params from the existing test.

runtest.php does a fair bit of processing to the request before generating the test job:
* Validate recaptcha (if enabled).
* Validate the hash used for manual tests (generated when the form page loads, has a 1-hour lifetime) to prevent UI automation.
* Split the location into the actual location, browser and connectivity.
* Validate the test location requested.
* Validate the API key (if provided).
* For non-API tests, check the block lists:
  * Check the user's IP address against the block list (blockip.txt in settings)
  * Check the domain against the domain block list (load the URL through curl, following redirects to make sure it isn't a redirector to a blocked domain as well) (blockdomains.txt in settings)
  * Check the url against the URL regex list to make sure the URL isn't on the block list (used for more complicated URL blocking, usually when multiple domains are involved) (blockurl.txt in settings)
* Populate the mobile device emulation parameters if using mobile emulation.
* Load the connectivity settings if using a named connection profile.
* Create a unique test ID for the test.
* Create a directory for the test using the unique ID for the test folder location (YY/MM/DD/Hash/ID).
* Store the test information in the local test folder.
* Build a JSON job file for the test agent to run.
* Queue the test for testing. This can be done a few different ways:
  * **Catchpoint Scheduler**: If the location is configured to use scheduler, post the job JSON to the scheduler and mark the test as "scheduled" in the local folder.
  * **Local work queue**: write the job JSON to a local directory specific to the location, prefixing the job file with a timestamp so they can be kept in order.
    * If beanstalkd is configured, add the job file path to the beanstalkd queue for the given location (much faster than sorting raw files for high-volume servers).
  * If there are multiple runs and sharding is enabled, a job is queued for each of the runs so that they can be handed out in parallel to multiple agents (or interrupted when higher priority work gets queued).
* Deduct the number of runs used by the test from the balance for the given API key.
* Log the test details to the test history log.
* Respond appropriately:
  * f=XML : respond with XML-formatted details of the test (ID, URLs for the results)
  * f=json : respond with JSON-formatted details of the test
  * otherwise: redirect to the HTML test results page

#### Test Processing
Once a test has been queued, both the test Agent and User operate on the test, waiting for it to be complete:

**Agent**:
* Get a test job:
  * **Catchpoint Scheduler** : Agent polls the scheduler for its location for jobs.
    * Agent pings work/started.php on the server that generated the test to let the server know that the test has started running
  * **Server work queue**: Polls /work/getwork.php for job files with details of the location the agent supports, and location key
    * getwork.php checks beanstalkd if configured for a job for the given location
    * if beanstalk is not used, the work directory for the given location is listed, sorted and the first job in the queue is removed
* The server marks the test locally as "running"
* The agent runs the test as configured in the job file.
* The agent posts the test result to /work/workdone.php on the server that generated the test.
* The server marks the test as "complete" when all of the runs have been reported.

**User**
* All pages load common.inc at the beginning which does a bunch of common bookkeeping:
  * Gets the user account info if they are logged in
  * Checks the test, restoring it from archive if not available locally
* Both the API and User browser go to /results.php with the test ID for the test they are viewing (/result/xxx/ is rewritten to testresult.php?test=xxx)
* results.php uses testStatus.inc to check the status of the given test.
* If the test is complete then it loads the main result page:
  * result.inc for html result
  * xmlResult.php for XML result
  * jsonResult.php for JSON result
* If the test isn't found, an error page is generated
* If the test is "running", "scheduled" or "waiting" then "running.inc" is loaded for the test running view.
  * The running page polls testStatus.php every 15 seconds while the test is waiting to update the UI.
  * Once started, it polls testStatus.php every 1 second
  * Once the test is complete, the page is reloaded, causing results.php to load the test result page.

### Test Archiving
WebPageTest can be configured to archive tests to a central archive for long-term storage, using the local storage as a cache and while tests are being processed.
* S3 (Google storage using the S3 compatibility)
* Local directory (usually a NFS mount to a NAS or magnetic storage instead of SSD)
* HTTP PUT/GET endpoint
* Catchpoint capture server
* /dev/null is a special archive endpoint that deletes the test after the archive period expires

When archiving is configured, tests will be stored into the archive (but not deleted) as soon as a test is complete.

There is an hourly "cron" (cron/hourly.php) that is triggered by agents polling for work that will run the archive script (cli/archive.php). Tests will be deleted after the configured archive time has passed since they were last accessed.

When a test is accessed, common.inc will see if the test is available locally.  If it is not and an archive endpoint is configured, it will attempt to restore the test from the archive. This will allow any front-end WPT server to view any test that is available in the archive, even if the test was created on a different server.

Every time the test is accessed, the main test file is "touch"ed so the last accessed time of the test can be updated.

### Load Balancing Multiple Servers

WebPageTest servers are largely independent but they can be run in parallel for high-availability or to scale thruput. Tests are "sticky" to the server that they were created on but there are several server settings (settings.ini) that are needed to make it work smoothly.  

The settings.ini configuration is a combination of the settings in 3 different files which allows for a shared site-specific configuration as well as server-specific overrides:
* /settings/settings.ini : The base settings file used for single-instance deployments
* /settings/common/settings.ini : Common site-wide settings. Any settings in here override the base settings.
  * host : The hostname that should be used for any URLs returned to the user. i.e. ```host=www.webpagetest.org```
  * server_X : where X is the serverID of a given server and there are entries for all of the servers in the deployment. This is used if you want servers to be able to fetch tests from each other instead of going through the archive (particularly useful when viewing the compare page and viewing tests owned by multiple servers). i.e. ```server_A="https://servera.webpagetest.org/"```. For this to work, all servers need to share the same keys.ini (or at least the server secret keys) because the secret key is used to validate server-to-server sync requests.
  * work_servers : A comma-delimited list of URLs to each server's work endpoint. Used if local queuing is used for tests. The list of URLs will be provided to the test agents and the agents will round-robin the test servers for work, pulling jobs from the local queues on all of the servers. i.e. ```work_servers="http://a.webpagetest.org/work/,http://b.webpagetest.org/work/"```
* /settings/server/settings.ini : Server-specific settings. These are the settings that are specific to each individual server.
  * serverID : The unique server ID used in the test ID's to identify this server. i.e. ```serverID=Z``` will result in test ID's that look like YYMMDD_Zi....
  * work_server : The full URL to the work path on this specific server. This must be reachable from the test agents and is included in the job files created on this server so that the test agent knows which server to post the test results back to for a given job. i.e. ```work_server="http://servera.webpagetest.org/work/"```
  * hostname : The host name for the current server, used to identify when a test needs to be requested from a different server or belongs to the current server and for loopback requests.

Once the servers have unique ID's and can be configured to sync with each other then the servers can run transparently behind a load-balancer. The load balancer needs to be configured to route requests that have a URL that includes \d\d\d\d\d\d_Ai to the "A" server (etc for each server ID) and other requests can be balanced randomly.

## wptagent

### Testing Flow
### Class Hierarchy
