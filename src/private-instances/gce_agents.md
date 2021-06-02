---
title: 'Google Clolud Test Agents'
eleventyNavigation:
    parent: Private Instances 
    key: Google Cloud Agents
---
# Google Cloud Test Agents
If you are using the agents with a server in Google cloud, make sure to set up the server first so you will have the agent configuration information available.

## Create a base server image

* Start with an Ubuntu 18.04 instance (in any region), configured to keep the disk image after the instance has been terminated.
* SSH in to the server
* Run the [GCE agent install script](https://github.com/WPO-Foundation/wptagent-install#on-google-cloud)
* Shut down the instance ```sudo poweroff```
* Terminate the instance but without deleting the disk
* Create an image from the disk using the cloud console
* Once the image is created, delete the disk

## Create an Instance Template
Create an instance template for preemptable n1-standard-2 instances using the agent image.

The agents are configured through a metadata string with the name "wpt_data":

### Parameters

* **wpt_server** - the web server where WebPagetest is running
* **wpt_url** - (optional in place of wpt_server) Base URL to the work directory for fetching.  i.e. https://www.webpagetest.org/work/
* **wpt_loc** - The location ID (if not specified it will fall back to wpt_location or be built from the region - ec2-us-east for example)
* **wpt_key** - secret key for the specified location
* **wpt_timeout** - default timeout setting for each test in seconds (overridden by server settings on a per-test basis)
* **wpt_username** - username for basic authentication with WPT server. Ignored if wpt_password is not specified.
* **wpt_password** - password for basic authentication with WPT server. Ignored if wpt_username is not specified.
* **wpt_validcertificate** - Ignored unless the scheme of the wpt_server is 'https' If the value is '0', the hostname and expiry of the certificate are not checked. If the value is '1', the CN of the WPT server SSL certificate must match the hostname specified in the wpt_server parameter, and the certificate must be valid. (defaults to '0')

### Example metadata string
```
wpt_server=www.webpagetest.org wpt_loc=Test wpt_key=xxxxx
```

## Auto-Scaling

The linux agents auto-scale well for bulk testing using a [Managed Instance group](https://cloud.google.com/compute/docs/instance-groups/).  In that mode it is recommended to use preemptable instances and set a target CPU utilization to 20% (for n1-standard-2 instances) and with a cool-down period of 600 seconds.  One instance will need to be running in each region at all times and it will scale up as needed when running tests.

The instances take a few minutes to connect to the server after launching because they install all of the latest OS and browser updates and reboot before starting to process work.

![GCE Instance Group](/img/gce_mig.png)
