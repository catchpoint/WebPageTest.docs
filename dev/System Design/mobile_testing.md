# Mobile Testing
Note: These docs are outdated and parts reference the old agent architecture

For mobile testing you have a few options for network connectivity:
* Real mobile network with an actual carrier
* WiFi with no traffic shaping
* WiFi with a fixed traffic shaping profile
* WiFi with per-test traffic shaping
This is what the mobile testing network looks like for the public instance of WebPagetest (at least as of this writing in 2014):

![Network Diagram](/img/mobile_testing.png)

The different configuration build on top of each other:
## Devices
Testing with the new Node.js agent requires Android devices running 4.4 (Kit Kat) or later or iOS devices running a recent version of iOS (more iOS documentation and improved support coming soon).  In both cases the devices need to be rooted (jailbroken in the case of iOS) in order to be able to delete the browser cache.  For Android, Nexus and Motorola devices are known to work well and provide a wide range of capabilities.  Separate devices are required for testing portrait vs landscape (mostly an issue for tablet testing).

## Real mobile network with an actual carrier
The simplest set-up is running a device on a carrier network.  In this case you just need the phone(s) and a tethered host to control them.  Multiple devices can be controlled from a single host (as many as the OS will allow USB connections).  Any OS that supports adb and Node.js should work though Windows and Linux get the most testing.

If the host has USB 3 controllers and you want to use Linux you need to make sure it is a VERY recent kernel as USB 3 support in earlier releases was REALLY buggy.

For Windows there is also a support application adbwatch that watches adb and if it dies (stops responding as it sometimes does) it will automatically restart it allowing the system to run with no human intervention for extended periods.

The public instance currently has 10 devices connected to an Intel i5 NUC running Windows 7 with adbwatch managing the agent instances and keeping adb running.  One tip for running the NUC's as headless servers (for the newer haswell models that do not support AMT) is to use VNC and the Microsoft video drivers shipped with Windows, not the Intel ones.  If you use the Intel drivers the display will be disabled and VNC will not work.

The data flow for test results and agent <-> WebPagetest server communication all happen from the tethered host so the only use of the data connection will be the actual test data (and any software updates).

## WiFi with no traffic shaping
Testing over a WiFi connection gives you much more control over the stability of the results and usually produces much more consistent results than testing on a carrier network.  The main issues with running a stable WiFi test connection are:
* Using a stable access point: Most consumer WiFi devices are horrible, crash consistently and can't maintain connections for long periods.  Business devices tend to be more reliable but I have found that the Apple Air Port devices work incredibly well and use them exclusively.  They are rock-solid and never freeze/hang/reboot, allow for running in access point mode and support both 2.4 and 5GHz bands simultaneously.
* Using a clear WiFi Frequency: In an office or urban environment this is probably going to be the most difficult issue to work through.  I use inssider to find a clear non-overlapping frequency band to use for the test network.  For the public instance I am lucky in that there are no neighbor networks that interfere so I have my pick of the full spectrum.
* Don't overload the WiFi network: Putting too many devices on a single channel or using the same network for other traffic can cause contention and may limit your actual bandwidth.  With devices that can talk 802.11n or 802.11ac it becomes less of an issue but if you are deploying a LOT of devices it is worth keeping in mind.  The only way to deal with this is to split traffic across multiple networks, insulate segments of devices and access points (putting them in a Faraday cage) or using rndis wired networking instead of WiFi.

The main downside of testing an unshaped WiFi connection is that you are running at the full connection speed of your ISP and it may not match your end-user's experience.

## WiFi with a fixed traffic shaping profile

Adding traffic shaping to the WiFi test configuration allows you to test with end-user connection characteristics but maintain the consistency of regular WiFi testing.  The traffic shaping has to be done on the far side of the access point and is best done with a FreeBSD machine that bridges the network connection from the access point to the rest of the wired network (there is also a linux port of dummynet but the FreeBSD implementation has been a lot more consistent in our testing).

With a fixed traffic shaping profile you have to pick one profile and use that for all of the traffic for a given device (or all devices).  When setting up the dummynet configuration it is important to remember to give each device it's own "pipe" so they are not sharing a virtual connection.

As far as hardware goes, any machine that supports FreeBSD and has 2+ network interfaces will work.  I like the Supermicro Atom servers because they are cheap, super low-power and support remote management.

Here is the ipfw configuration that the public instance uses:
```bash
# 3G profile - 1.6Mbps down, 768Kbps up, 300ms RTT
# The src-ip and dst-ip masks ensure that each client gets it's own pipe
ipfw pipe 1 config bw 1600Kbit/s delay 150ms noerror mask dst-ip 0xffffffff
ipfw pipe 2 config bw 768Kbit/s delay 150ms noerror mask src-ip 0xffffffff

# em1 is the network interface that is connected to the access point.
# Data "transmitted" to the access point is the "in" data on the devices.
ipfw add pipe 1 ip from any to any out xmit em1
ipfw add pipe 2 ip from any to any out recv em1
```

## WiFi with per-test traffic shaping
Instead of using a fixed connection profile for all of the devices, it is possible to have the test agent configure them on a per-test basis.  The Node.js agent can call out to an ipfw shell script on the agent with information about which test agent to configure and the connection profiles.  There is sample code in github that creates a pipe dynamically and assigns the appropriate profile.

For the public instance the plan is to statically configure multiple pipes, a pair for each device and then when the script configures the shaping it will just set the parameters for pipes associated with that device.  This is how the desktop agents work and avoids any edge-cases where rules are left in the configuration if something dies.  Once things are set up and working I will provide the script and configuration that is implemented on the public instance.

## rndis tethering instead of WiFi
One of the more difficult issues with configuring a larger lab is managing the WiFi network(s).  It is possible to reverse-tether the devices so that their networking traffic is routed over the USB connection to the tethered host.  This can provide even more consistent results but you need to be careful to not overload the USB bus (which is also transferring videos and test results for the other tethered devices) and the reliability hasn't been as good as WiFi (devices tend to fall offline).