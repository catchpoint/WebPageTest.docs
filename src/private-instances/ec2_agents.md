---
title: 'EC2 Test Agents'
eleventyNavigation:
    parent: Private Instances 
    key: EC2 Agents
---
# EC2 Test Agents

You will need to set up agent AMI's in all of the regions where you will be running agents. This can be done by creating an image in one region and then copying the AMI to the other regions.

* Start with a vanilla Ubuntu 18.04 image running on a c5.large (or similar) instance
* SSH into the VM
* Run the [EC2 agent installation script](https://github.com/WPO-Foundation/wptagent-install#on-amazon-ec2)
* Shutdown the VM ```sudo poweroff```
* Create an image from the instance in the EC2 console and make note of the AMI ID
* Terminate the instance after the image has been created
* Copy the image to the regions where you will be testing from, making note of the AMI ID's for each region

# Configuration

The configuration of the test agents is done through user data strings when instances are started (this is how the same image can be used in all of the regions).

## Parameters

* **wpt_server** - the web server where WebPageTest is running
* **wpt_url** - (optional in place of wpt_server) Base URL to the work directory for fetching.  i.e. https://www.webpagetest.org/work/
* **wpt_loc** - The location ID (if not specified it will fall back to wpt_location or be built from the region - ec2-us-east for example)
* **wpt_key** - secret key for the specified location
* **wpt_timeout** - default timeout setting for each test in seconds (overridden by server settings on a per-test basis)
* **wpt_username** - username for basic authentication with WPT server. Ignored if wpt_password is not specified.
* **wpt_password** - password for basic authentication with WPT server. Ignored if wpt_username is not specified.
* **wpt_validcertificate** - Ignored unless the scheme of the wpt_server is 'https' If the value is '0', the hostname and expiry of the certificate are not checked. If the value is '1', the CN of the WPT server SSL certificate must match the hostname specified in the wpt_server parameter, and the certificate must be valid. (defaults to '0')

## Example User Data string
```
wpt_server=www.webpagetest.org wpt_loc=Test wpt_key=xxxxx
```

![EC2 user data](/img/ec2config.png)

## Sample locations.ini

A [sample ec2_locations.ini](https://github.com/WPO-Foundation/webpagetest/blob/master/www/settings/ec2_locations.ini) for the server is available that is configured with all of the available EC2 regions. Copy this file over locations.ini on the server and update the AMI ID's to match the AMI ID's that you have in each region if you want the server to auto-scale the agents (omit the AMI ID's if you will be manually scaling agents).
