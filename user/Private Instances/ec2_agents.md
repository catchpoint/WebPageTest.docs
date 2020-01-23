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

The Linux images include Chrome, Chrome Beta, Chrome Dev, Firefox Stable, Firefox Nightly, Firefox ESR and Brave.

The Windows images include IE 11, Chrome and Firefox (current stable releases).

## North America

### us-east-1 (Virginia)

* Linux - ami-0f94f56c4cc69dae2
* Windows - ami-0137821046846369e

### us-east-2 (Ohio)

* Linux - ami-0fdfcccf8825d4af4
* Windows - ami-0a98bb237df9af133

### us-west-1 (California)

* Linux - ami-0358d365c4f991905
* Windows - ami-048a5e62197a602db

### us-west-2 (Oregon)

* Linux - ami-04ef5ac6b0d1524ae
* Windows - ami-0897d1ae40fa1a1d3

### ca-central-1 (Canada Central)

* Linux - ami-06e5b38b8c4cc400b
* Windows - ami-0135a2cddc6342cff

## South America

### sa-east (Sao Paulo)

* Linux - ami-010a3899eac30e55b
* Windows - ami-02999bb04bc882183

## Europe

### eu-west-1 (Ireland)

* Linux - ami-04374a4e528b659ed
* Windows - ami-03009a026570febbb

### eu-west-2 (London)

* Linux - ami-034152a90760dfbfc
* Windows - ami-0bfd048263183c4ae

### eu-west-3 (Paris)

* Linux - ami-03a05ac3058792d04
* Windows - ami-01dfded38684ffcd2

### eu-central-1 (Frankfurt)

* Linux - ami-03f1df117741eba18
* Windows - ami-0f997690f364fc126

### eu-north-1 (Stockholm)

* Linux - ami-0fd3d8baaadf6f1b4
* Windows - ami-09c6529cb8cbc072e

## Middle East

### me-south-1 (Bahrain)
* Linux - ami-03aff98e7eb678b08
* Windows - ami-099c65b608dce0ba3

## Asia

### ap-south-1 (Mumbai)

* Linux - ami-0d5f5f5acb2b2d24f
* Windows - ami-0a33c03a5877c94ca

### ap-east-1 (Hong Kong)

* Linux - ami-0e1f3fef5103f6a39
* Windows - ami-05a28524d0486371e

### ap-northeast-1 (Tokyo)

* Linux - ami-0d4189aa7b901dacf
* Windows - ami-07a931524bd2cde14

### ap-northeast-2 (Seoul)

* Linux - ami-027e565771dffa36d
* Windows - ami-06ab5d0ec63b30b00

### ap-southeast-1 (Singapore)

* Linux - ami-052046e2398ff8468
* Windows - ami-095c29723d8dee5f2

## Oceania

### ap-southeast-2 (Sydney)

* Linux - ami-0745a1fc6cdb2333e
* Windows - ami-027cdaac89ade2d51
