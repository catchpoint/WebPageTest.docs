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

The Linux images include Chrome, Chrome Beta, Chrome Dev, Firefox Stable, Firefox Nightly and Firefox ESR.

The Windows images include IE 11, Chrome and Firefox (current stable releases).

## North America

### us-east-1 (Virginia)

* Linux - ami-0cfdf52233b05f834
* Windows (wptagent) - ami-0137821046846369e

### us-east-2 (Ohio)

* Linux - ami-04ac0aec91799a9cf
* Windows (wptagent) - ami-0a98bb237df9af133

### us-west-1 (California)

* Linux - ami-0f61cbaff5d639885
* Windows (wptagent) - ami-048a5e62197a602db

### us-west-2 (Oregon)

* Linux - ami-0e58152654e5a6ae2
* Windows (wptagent) - ami-0897d1ae40fa1a1d3

### ca-central-1 (Canada Central)

* Linux - ami-0f7a22dfd1072f0dc
* Windows (wptagent) - ami-0135a2cddc6342cff

## South America

### sa-east (Sao Paulo)

* Linux - ami-0f5cad80fb1abded7
* Windows (wptagent) - ami-02999bb04bc882183

## Europe

### eu-west-1 (Ireland)

* Linux - ami-05e797bb427383997
* Windows (wptagent) - ami-03009a026570febbb

### eu-west-2 (London)

* Linux - ami-0f5d55366ed9d1ed5
* Windows (wptagent) - ami-0bfd048263183c4ae

### eu-west-3 (Paris)

* Linux - ami-0ba3cc462d20f0c3b
* Windows (wptagent) - ami-01dfded38684ffcd2

### eu-central-1 (Frankfurt)

* Linux - ami-0ba8a4913a238c388
* Windows (wptagent) - ami-0f997690f364fc126

### eu-north-1 (Stockholm)

* Linux - ami-0fd3d8baaadf6f1b4
* Windows (wptagent) - ami-0653186ac8283a45c

## Asia

### ap-south-1 (Mumbai)

* Linux - ami-026b2c0a39a1dbd85
* Windows (wptagent) - ami-0a33c03a5877c94ca

### ap-east-1 (Hong Kong)

* Linux - ami-0b1d0d324e29f435d
* Windows (wptagent) - ami-05a28524d0486371e

### ap-northeast-1 (Tokyo)

* Linux - ami-0b9d031244a8f2ca3
* Windows (wptagent) - ami-07a931524bd2cde14

### ap-northeast-2 (Seoul)

* Linux - ami-049b79a1321af4d2f
* Windows (wptagent) - ami-06ab5d0ec63b30b00

### ap-southeast-1 (Singapore)

* Linux - ami-037d62015ec4dd8cc
* Windows (wptagent) - ami-095c29723d8dee5f2

## Oceania

### ap-southeast-2 (Sydney)

* Linux - ami-0579780e20deef40c
* Windows (wptagent) - ami-027cdaac89ade2d51
