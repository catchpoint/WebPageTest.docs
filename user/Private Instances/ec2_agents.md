# EC2 Test Agents

We have prepared public AMI's for EC2 that can be used as WebPagetest testers that are configured dynamically through the instance user data. The images have all of the software needed on a test system installed and configured (including AVISynth for generating videos and dummynet for doing the traffic shaping).

**c4.large** or faster instances are recommended (faster may not show any benefit).  The m3.medium instances seem to be getting slower (or browsers are getting more bloated).

# Configuration

The configuration of the test agents is done through user data strings when instances are started.

## Parameters

* **wpt_server** - the web server where WebPagetest is running
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

![EC2 user data](images/ec2config.png)

## Sample locations.ini

A [sample ec2_locations.ini](https://github.com/WPO-Foundation/webpagetest/blob/master/www/settings/ec2_locations.ini) for the server is available that is configured with all of the available EC2 regions.

# AMI Images

The instances will automatically install the latest supported versions of Chrome and Firefox when they start up (and will automatically update while they are running).

The Linux images include Chrome, Chrome Beta, Chrome Dev, Firefox Stable, Firefox Nightly, Opera, Opera Beta and Opera Developer.

The Windows images include IE 11, Chrome and Firefox (current stable releases)

Remote Desktop to a Windows Test Agent:

The password is: 2dialit

## us-east-1 (Virginia)

* Linux - ami-a88c20d5
* Windows (wptagent) - ami-c682c3b9

## us-east-2 (Ohio)

* Linux - ami-b13505d4
* Windows (wptagent) - ami-ef08368a

## us-west-1 (California)

* Linux - ami-236f7f43
* Windows (wptagent) - ami-b725c1d4

## us-west-2 (Oregon)

* Linux - ami-5e305726
* Windows (wptagent) - ami-07d7947f

## ca-central-1 (Canada Central)

* Linux - ami-8871f7ec
* Windows (wptagent) - ami-57078433

## eu-west-1 (Ireland)

* Linux - ami-6758061e
* Windows (wptagent) - ami-f9414d80

## eu-west-2 (London)

* Linux - ami-6d1afb0a
* Windows (wptagent) - ami-cd8668aa

## eu-west-3 (Paris)

* Linux - ami-9d00b6e0
* Windows (wptagent) - ami-902f9eed

## eu-central-1 (Frankfurt)

* Linux - ami-dceab537
* Windows (wptagent) - ami-b725165c

## ap-northeast-1 (Tokyo)

* Linux - ami-1771676b
* Windows (wptagent) - ami-77925d08

## ap-northeast-2 (Seoul)

* Linux - ami-1b2e8175
* Windows (wptagent) - ami-76923818

## ap-southeast-1 (Singapore)

* Linux - ami-ba4267c6
* Windows (wptagent) - ami-ec0b0c90

## ap-southeast-2 (Sydney)

* Linux - ami-aed01ecc
* Windows (wptagent) - ami-b7c11ed5

## ap-south-1 (Mumbai)

* Linux - ami-e5f0d58a
* Windows (wptagent) - ami-4481a92b

## sa-east (Sao Paulo)

* Linux - ami-717b2d1d
* Windows (wptagent) - ami-3f570c53
