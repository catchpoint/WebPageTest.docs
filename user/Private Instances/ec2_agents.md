# EC2 Test Agents

We have prepared public AMI's for EC2 that can be used as WebPagetest testers that are configured dynamically through the instance user data. The images have all of the software needed on a test system installed and configured (including AVISynth for generating videos and dummynet for doing the traffic shaping).

**c4.large** or faster instances are recommended (faster may not show any benefit).  The m3.medium instances seem to be getting slower (or browsers are getting more bloated).

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

The Windows (wptagent) images include IE 11, Chrome and Firefox (current stable releases)

## us-east-1 (Virginia)

* Linux - ami-e120c99c
* Windows (wptagent) - ami-7463650e
* IE9/Chrome/Firefox/Safari - ami-83e4c5e9 (deprecated)
* IE10/Chrome/Firefox/Safari - ami-0ae1c060 (deprecated)
* IE11/Chrome/Firefox/Safari - ami-4a84a220 (deprecated)

## us-east-2 (Ohio)

* Linux - ami-7c0d3a19
* Windows (wptagent) - ami-29e4d14c
* IE9/Chrome/Firefox/Safari - ami-c86933ad (deprecated)
* IE10/Chrome/Firefox/Safari - ami-55742e30 (deprecated)
* IE11/Chrome/Firefox/Safari - ami-c96933ac (deprecated)

## us-west-1 (California)

* Linux - ami-db3932bb
* Windows (wptagent) - ami-ab5f50cb
* IE9/Chrome/Firefox/Safari - ami-03d6a263 (deprecated)
* IE10/Chrome/Firefox/Safari - ami-05eb9f65 (deprecated)
* IE11/Chrome/Firefox/Safari - ami-678afe07 (deprecated)

## us-west-2 (Oregon)

* Linux - ami-d460e9ac
* Windows (wptagent) - ami-373b804f
* IE9/Chrome/Firefox/Safari - ami-03e80c63 (deprecated)
* IE10/Chrome/Firefox/Safari - ami-fdeb0f9d (deprecated)
* IE11/Chrome/Firefox/Safari - ami-b4ab4fd4 (deprecated)

## ca-central-1 (Canada Central)

* Linux - ami-2ff0774b
* Windows (wptagent) - ami-62ef6b06
* IE9/Chrome/Firefox/Safari - ami-184efc7c (deprecated)
* IE10/Chrome/Firefox/Safari - ami-13328077 (deprecated)
* IE11/Chrome/Firefox/Safari - ami-0345f767 (deprecated)

## eu-west-1 (Ireland)

* Linux - ami-5273092b
* Windows (wptagent) - ami-57fa972e
* IE9/Chrome/Firefox/Safari - ami-2d5fea5e (deprecated)
* IE10/Chrome/Firefox/Safari - ami-3b45f048 (deprecated)
* IE11/Chrome/Firefox/Safari - ami-a3a81dd0 (deprecated)

## eu-west-2 (London)

* Linux - ami-8b38dcec
* Windows (wptagent) - ami-f0f1eb94
* IE9/Chrome/Firefox/Safari - ami-4ad6dc2e (deprecated)
* IE10/Chrome/Firefox/Safari - ami-2dd5df49 (deprecated)
* IE11/Chrome/Firefox/Safari - ami-4bd6dc2f (deprecated)

## eu-west-3 (Paris)

* Linux - ami-4370c63e
* Windows (wptagent) - ami-96b305eb
* IE9/Chrome/Firefox/Safari - ami-734bfc0e (deprecated)
* IE10/Chrome/Firefox/Safari - ami-8a4ef9f7 (deprecated)
* IE11/Chrome/Firefox/Safari - ami-f84cfb85 (deprecated)

## eu-central-1 (Frankfurt)

* Linux - ami-1c690473
* Windows (wptagent) - ami-17a03a78
* IE9/Chrome/Firefox/Safari - ami-879c85eb (deprecated)
* IE10/Chrome/Firefox/Safari - ami-ec9b8280 (deprecated)
* IE11/Chrome/Firefox/Safari - ami-87f2ebeb (deprecated)

## ap-northeast-1 (Tokyo)

* Linux - ami-964601f0
* Windows (wptagent) - ami-40bcd726
* IE9/Chrome/Firefox/Safari - ami-4ed6e820 (deprecated)
* IE10/Chrome/Firefox/Safari - ami-ebd3ed85 (deprecated)
* IE11/Chrome/Firefox/Safari - ami-2f221c41 (deprecated)

## ap-northeast-2 (Seoul)

* Linux - ami-bc9a37d2
* Windows (wptagent) - ami-2f08ab41
* IE9/Chrome/Firefox/Safari - ami-b2e12fdc (deprecated)
* IE10/Chrome/Firefox/Safari - ami-76e12f18 (deprecated)
* IE11/Chrome/Firefox/Safari - ami-15e52b7b (deprecated)

## ap-southeast-1 (Singapore)

* Linux - ami-55743c29
* Windows (wptagent) - ami-7b9ade07
* IE9/Chrome/Firefox/Safari - ami-f87ab69b (deprecated)
* IE10/Chrome/Firefox/Safari - ami-ce78b4ad (deprecated)
* IE11/Chrome/Firefox/Safari - ami-3e55995d (deprecated)

## ap-southeast-2 (Sydney)

* Linux - ami-7c92541e
* Windows (wptagent) - ami-1eeb137c
* IE9/Chrome/Firefox/Safari - ami-306c4853 (deprecated)
* IE10/Chrome/Firefox/Safari - ami-25644046 (deprecated)
* IE11/Chrome/Firefox/Safari - ami-e88eab8b (deprecated)

## ap-south-1 (Mumbai)

* Linux - ami-48396627
* Windows (wptagent) - ami-f7c69698
* IE9/Chrome/Firefox/Safari - ami-7a86ec15 (deprecated)
* IE10/Chrome/Firefox/Safari - ami-bf80ead0 (deprecated)
* IE11/Chrome/Firefox/Safari - ami-d498f2bb (deprecated)

## sa-east (Sao Paulo)

* Linux - ami-89e6aee5
* Windows (wptagent) - ami-2c521d40
* IE9/Chrome/Firefox/Safari - ami-79c54515 (deprecated)
* IE10/Chrome/Firefox/Safari - ami-7cc54510 (deprecated)
* IE11/Chrome/Firefox/Safari - ami-203abb4c (deprecated)
