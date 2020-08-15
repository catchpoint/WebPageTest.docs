# Hosting a Test Location
**The public instance of WebPageTest is not currently accepting new partner locations.**

## Security Considerations
**EXPECT TO BE HACKED!**


If you are going to run a test location for the public instance of WebPagetest you should treat the test system as if it will be hacked. You are running a machine where anyone on the Internet can direct your system to browse any page, even pages designed to exploit browser vulnerabilities. There are a lot of protections you can put in place to minimize the risk but you can never eliminate it so do not put the test system anywhere where it has privileged access to anything.


Some of the things to consider:

* If you can, put the test system into a DMZ where it doesn't have access to anything you care about
Windows-specific:
* The test system should be set to automatically install Windows Updates
* Because of how video recording is done, the test system also needs to stay logged in to an administrator account's desktop so physical security of the system should be considered.


## System Requirements
For Chrome, Firefox and IE support, Windows is required:

* Windows (7 or later, Server 2003 R2 or later). 32 or 64-bit are both fine (OS needs to support the browser you want to offer)
For just Chrome and Firefox testing, Linux is a possibility (and tends to be more stable and secure):
* Ubuntu 16.04 LTS is known to work well. At a minimum, Sudo access and a kernel with IFB available (so a real VM, not a container)

In both cases:
* A dedicated PC (2GB RAM Minimum) or an equivalent VM (dedicated or cloud instance). Burstable/shared CPU instances are not recommended.
* An internet connection - the faster the better (and with minimal latency). Any connections will work but faster connections will be able to traffic shape to slower connections so they provide more possibilities for connection types.
Realistically, anything 5MBps (down) with <28ms RTT latency will work though 10Mb Ethernet would be preferred.


## What I need to configure a new location
I need some basic information about the test location and system itself:

* Which version of IE will be supported (if Windows)
* City, Region (if applicable) and Country where the test system is running
* Connectivity information (up/down bandwidth and first hop RTT)
* Contact information (email address) for where to send notifications if the location appears to be having issues

Additionally, by hosting a test location, you get promotional logos and banners displayed on the site:

* The main site banner will display your banner whenever someone is running a test or viewing results from your location (as well as being in rotation for display on the main landing page). The banner space is 728x90 (though smaller banners will also work)
* There is also a "Provided By" logo that needs to fit within a 180px x 40px area.
* I need the graphic files for the 2 logo spots as well as a location you would like them linked to (and alt text)


## Configuring the test system
Once I have the necessary information I will configure the new location on the server and provide the testing software properly configured. Configuring the test system is fairly straightforward.  

Follow the same steps as if you were [configuring a private instance](Private%20Instances/README.md)
If you RDP into the system, reboot after you are done so the desktop does not remain locked.

If you provide me remote system access (RDP or VNC) I can take care of installing the software on the agent as well and also take care of maintaining it.

## Ongoing support
Aside from any unexpected outages the system should just run itself.

If you provide me remote access to the system I can triage any outages, otherwise I will need a point of contact.