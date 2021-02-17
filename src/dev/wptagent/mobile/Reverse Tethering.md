# Reverse Tethering

Mobile device testing can be done independent of the device's connection to the Internet since it is all controlled over USB.  This allows for testing on real carrier networks, WiFi connections or reverse-tethered to the attached computer.  Reverse tethering has a lot of benefits:

* By far the most stable/consistent form of connectivity.  Provides consistent sub-millisecond network connectivity with at least 20 Mbps bandwidth.  WiFi can vary by 10's of milliseconds and real cellular connectivity is even more variable.
* Scales to large numbers of devices.  WiFi is limited by the shared spectrum as well as the number of clients that each access point can handle.
* Allows for traffic-shaping on the tethered host (making the phone + PC a stand-alone testing module).  WiFi setups require a remote traffic-shaping bridge in the network path upstream of the access point.

<insert diagram with phone, usp, pi, ethernet and traffic-shaping>

# Requirements

## PC
Only Linux hosts are currently supported for reverse-tethering. Using a Raspberry Pi (or similar ARM-based single-board-computer) is highly recommended.

## Phone
* Android 4.4 or later
* iOS 9 or later (supervised-mode device)

# Overview

# Setup Walkthrough

## PC (or Raspberry Pi)

## Android

## iOS

# Other Reverse-tethering options

## rndis (Android)
For devices that include USB ethernet (usually phones and not tablets) it is possible to bring up the USB interface for networking and statically configure the routing tables to route all traffic through the USB connection.

This is the original method that was used for reverse-tethering and is supported in wptagent with the --rndis command-line option (either for dhcp or with a static IP address).

rndis does not work in Android 5.0 or later for reverse-tethering (at least in any way that has been tried).  The interface can be brought up but the routing tables are separate for the user accounts and browser traffic can't be routed over the interface.

## SimpleRT (Android)
[SimpleRT](https://github.com/vvviperrr/SimpleRT) is a reverse-tethering app that uses the VPN support in android to route traffic over a custom USB device exposed on the tethered USB connection.  It consists of an app that runs on the phone and a process that runs on the host PC to terminate the VPN connection and route traffic from the device.

The app is included in the wptagent distribution under the simple-rt directory and can be installed over USB.

It is supported in wptagent through the --simplert command-line option.

## vpn-reverse-tether
[vpn-reverse-tether](https://github.com/google/vpn-reverse-tether/) 

# Failed reverse-tethering experiments