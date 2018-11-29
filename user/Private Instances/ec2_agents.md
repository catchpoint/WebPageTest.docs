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

The Windows images include IE 11, Chrome and Firefox (current stable releases).

## us-east-1 (Virginia)

* Linux - ami-0c381f1dda90c3675
* Windows (wptagent) - ami-0137821046846369e

## us-east-2 (Ohio)

* Linux - ami-0274b92d8c52fc6b4
* Windows (wptagent) - ami-0a98bb237df9af133

## us-west-1 (California)

* Linux - ami-074d3bf6c09399fe4
* Windows (wptagent) - ami-048a5e62197a602db

## us-west-2 (Oregon)

* Linux - ami-05005dae47dbf7f84
* Windows (wptagent) - ami-0897d1ae40fa1a1d3

## ca-central-1 (Canada Central)

* Linux - ami-00c89b2d9a56b638f
* Windows (wptagent) - ami-0135a2cddc6342cff

## eu-west-1 (Ireland)

* Linux - ami-0866ef4003c1ed81a
* Windows (wptagent) - ami-03009a026570febbb

## eu-west-2 (London)

* Linux - ami-0216e20b9b9641702
* Windows (wptagent) - ami-0bfd048263183c4ae

## eu-west-3 (Paris)

* Linux - ami-0be6ed98c2016f3e9
* Windows (wptagent) - ami-01dfded38684ffcd2

## eu-central-1 (Frankfurt)

* Linux - ami-06d9cb9d0b774eeff
* Windows (wptagent) - ami-0f997690f364fc126

## ap-northeast-1 (Tokyo)

* Linux - ami-02eb0667991d551fa
* Windows (wptagent) - ami-07a931524bd2cde14

## ap-northeast-2 (Seoul)

* Linux - ami-0a3d9d26ccf940667
* Windows (wptagent) - ami-06ab5d0ec63b30b00

## ap-southeast-1 (Singapore)

* Linux - ami-078835ef69447d0a3
* Windows (wptagent) - ami-095c29723d8dee5f2

## ap-southeast-2 (Sydney)

* Linux - ami-03b4d42e8c041c3bd
* Windows (wptagent) - ami-027cdaac89ade2d51

## ap-south-1 (Mumbai)

* Linux - ami-06ab31a6641705cf4
* Windows (wptagent) - ami-0a33c03a5877c94ca

## sa-east (Sao Paulo)

* Linux - ami-0a1e71c5eeb90c66d
* Windows (wptagent) - ami-02999bb04bc882183
