# Google Cloud Test Agents
There is a public image available for creating test agent instances.  It is published from the ```webpagetest-official``` project and has the name ```wpt-linux-20180313```.  There is also an [automated script](https://github.com/WPO-Foundation/wptagent/blob/master/docs/gce_walkthrough.md) for creating an image on Google Cloud from an Ubuntu 16.04 base image if more control over the image is needed (or if there are problems accessing the public image).

The agents automatically install all system and browser updates before starting testing so there is no need to manually update the image.

**n1-standard-2** or faster instances are recommended (faster may not show any benefit).

# Configuration
The configuration of the test agents is done through instance metadata when instances are started.  The instance location can automatically be set to the region it was launched in if not explicitly specified making it possible to use a single instance template for all regions.

## Parameters

* **wpt_server** - the web server where WebPagetest is running (i.e. www.webpagetest.org)
* **wpt_loc** - The location ID (if not specified it will fall back to using the instance region - us-east4 for example)
* **wpt_key** - secret key for the specified location

Less common options:
* **wpt_url** - (Optional in place of the server if https needs to be specified) Base URL to the work directory for fetching.  i.e. https://www.webpagetest.org/work/
* **wpt_timeout** - default timeout setting for each test in seconds (overridden by server settings on a per-test basis)
* **wpt_username** - username for basic authentication with WPT server. Ignored if wpt_password is not specified.
* **wpt_password** - password for basic authentication with WPT server. Ignored if wpt_username is not specified.
* **wpt_validcertificate** - Ignored unless the scheme of the wpt_server is 'https' If the value is '0', the hostname and expiry of the certificate are not checked. If the value is '1', the CN of the WPT server SSL certificate must match the hostname specified in the wpt_server parameter, and the certificate must be valid. (defaults to '0')

## Example metadata
```
wpt_server=www.webpagetest.org wpt_key=xxxxx
```

![GCE Metadata](images/gce_metadata.png)

## Sample locations.ini

A [sample locations.ini](https://github.com/WPO-Foundation/webpagetest/blob/master/www/settings/locations.ini.GCE-sample) for the server is available that is configured with all of the available GCE regions.

# Auto-Scaling

The linux agents auto-scale well for bulk testing using a [Managed Instance group](https://cloud.google.com/compute/docs/instance-groups/).  In that mode it is recommended to use preemptable instances and set a target CPU utilization to 10% (for n1-standard-2 instances) and with a cool-down period of 600 seconds.  One instance will need to be running in each region at all times and it will scale up as needed when running tests.