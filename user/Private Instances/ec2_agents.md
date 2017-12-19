# EC2 Test Agents

We have prepared public AMI's for EC2 that can be used as WebPagetest testers that are configured dynamically through the instance user data. The images have all of the software needed on a test system installed and configured (including AVISynth for generating videos and dummynet for doing the traffic shaping).

c4.large or faster instances are recommended (faster may not show any benefit).  The m3.medium instances seem to be getting slower (or browsers are getting more bloated).

# Configuration

The configuration of the test agents is done through user data strings when instances are started.

## Parameters

* **wpt_server** - the web server where WebPagetest is running
* **wpt_url** - (Linux agents only) Base URL to the work directory for fetching.  i.e. https://www.webpagetest.org/work/
* **wpt_loc** - The location ID (if not specified it will fall back to wpt_location or be built from the region - ec2-us-east for example)
* **wpt_location** - (deprecated) The location name to use for URLBlast (if not specified it will be built from the region and browser - ec2-us-east-IE8 for example).  wptdriver will append _wptdriver to this location ID if wpt_loc is not set.
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

A [sample locations.ini](https://github.com/WPO-Foundation/webpagetest/blob/master/www/settings/ec2_locations.ini) for the server is available that is configured with all of the available EC2 regions.

# AMI Images

The instances will automatically install the latest supported versions of Chrome and Firefox when they start up (and will automatically update while they are running).

The Linux images include Chrome, Chrome Beta, Chrome Dev, Firefox Stable, Firefox Nightly, Opera, Opera Beta and Opera Developer.

## us-east-1 (Virginia)

* IE9/Chrome/Firefox/Safari - ami-83e4c5e9
* IE10/Chrome/Firefox/Safari - ami-0ae1c060
* IE11/Chrome/Firefox/Safari - ami-4a84a220
* Linux - ami-68dd6812

## us-east-2 (Ohio)

* IE9/Chrome/Firefox/Safari - ami-c86933ad
* IE10/Chrome/Firefox/Safari - ami-55742e30
* IE11/Chrome/Firefox/Safari - ami-c96933ac
* Linux - ami-e6012e83

## us-west-1 (California)

* IE9/Chrome/Firefox/Safari - ami-03d6a263
* IE10/Chrome/Firefox/Safari - ami-05eb9f65
* IE11/Chrome/Firefox/Safari - ami-678afe07
* Linux - ami-660f3006

## us-west-2 (Oregon)

* IE9/Chrome/Firefox/Safari - ami-03e80c63
* IE10/Chrome/Firefox/Safari - ami-fdeb0f9d
* IE11/Chrome/Firefox/Safari - ami-b4ab4fd4
* Linux - ami-71a36909

## ca-central-1 (Canada Central)

* IE9/Chrome/Firefox/Safari - ami-184efc7c
* IE10/Chrome/Firefox/Safari - ami-13328077
* IE11/Chrome/Firefox/Safari - ami-0345f767
* Linux - ami-ac3981c8

## eu-west-1 (Ireland)

* IE9/Chrome/Firefox/Safari - ami-2d5fea5e
* IE10/Chrome/Firefox/Safari - ami-3b45f048
* IE11/Chrome/Firefox/Safari - ami-a3a81dd0
* Linux - ami-d754f4ae

## eu-west-2 (London)

* IE9/Chrome/Firefox/Safari - ami-4ad6dc2e
* IE10/Chrome/Firefox/Safari - ami-2dd5df49
* IE11/Chrome/Firefox/Safari - ami-4bd6dc2f
* Linux - ami-460a1622

## eu-west-3 (Paris)

* IE9/Chrome/Firefox/Safari - ami-734bfc0e
* IE10/Chrome/Firefox/Safari - ami-8a4ef9f7
* IE11/Chrome/Firefox/Safari - ami-f84cfb85
* Linux - ami-424dfa3f

## eu-central (Frankfurt)

* IE9/Chrome/Firefox/Safari - ami-879c85eb
* IE10/Chrome/Firefox/Safari - ami-ec9b8280
* IE11/Chrome/Firefox/Safari - ami-87f2ebeb
* Linux - ami-deef6bb1

## ap-northeast-1 (Tokyo)

* IE9/Chrome/Firefox/Safari - ami-4ed6e820
* IE10/Chrome/Firefox/Safari - ami-ebd3ed85
* IE11/Chrome/Firefox/Safari - ami-2f221c41
* Linux - ami-ba9738dc

## ap-northeast-2 (Seoul)

* IE9/Chrome/Firefox/Safari - ami-b2e12fdc
* IE10/Chrome/Firefox/Safari - ami-76e12f18
* IE11/Chrome/Firefox/Safari - ami-15e52b7b
* Linux - ami-33ba1e5d

## ap-southeast-1 (Singapore)

* IE9/Chrome/Firefox/Safari - ami-f87ab69b
* IE10/Chrome/Firefox/Safari - ami-ce78b4ad
* IE11/Chrome/Firefox/Safari - ami-3e55995d
* Linux - ami-ad4c00ce

## ap-southeast-2 (Sydney)

* IE9/Chrome/Firefox/Safari - ami-306c4853
* IE10/Chrome/Firefox/Safari - ami-25644046
* IE11/Chrome/Firefox/Safari - ami-e88eab8b
* Linux - ami-3e14fa5c

## ap-south-1 (Mumbai)

* IE9/Chrome/Firefox/Safari - ami-7a86ec15
* IE10/Chrome/Firefox/Safari - ami-bf80ead0
* IE11/Chrome/Firefox/Safari - ami-d498f2bb
* Linux - ami-6bde9304

## sa-east (Sao Paulo)

* IE9/Chrome/Firefox/Safari - ami-79c54515
* IE10/Chrome/Firefox/Safari - ami-7cc54510
* IE11/Chrome/Firefox/Safari - ami-203abb4c
* Linux - ami-b3007bdf