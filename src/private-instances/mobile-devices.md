---
title: 'Mobile Agent Configuration'
eleventyNavigation:
    parent: Private Instances 
    key: Mobile Device Agents
---
# Example Mobile Agent Configuration (physical devices)
(Pictures coming soon)

This is documentation for how the mobile agents are set up and configured (hardware and software) for the [public WebPageTest instance](https://www.webpagetest.org/). Properly configured the agents can run for months at a time with no human intervention and for the rare cases where intervention is needed, it can be managed remotely.

The hardware described is the hardware in use by the public instance but exact pieces can be swapped out as available (i.e. the exact model switch, cpu heatsinks, etc are probably not critical).

# Recommended Hardware
## Phones
### Android
* Devices need to be rootable (watch out for specific models of Samsung devices - some are rootable, some are not)
* Preferably running android 4.4 through 6 to support reverse-tethering  which allows for self-contained networking and traffic-shaping directly on the Raspberry pi.  The configuration gets substantially more involved for devices that can not be reverse-tethered (still possible and reliable, just requires a FreeBSD bridge upstream of the wifi access point to do traffic-shaping).  Dev work is ongoing on fixing the support for reverse-tethering for Android 7+ which will significantly improve the situation for more modern devices.
* Motorola and Google (Nexus or Pixel) devices are recommended as unlocking the bootloader on them is officially supported. The [Moto G4](https://www.amazon.com/gp/product/B01DZJFSZ4/ref=oh_aui_search_detailpage?ie=UTF8&psc=1) in particular is highly recommended and is the main test device on WebPageTest.

### iOS
* The iOS agent does not yet support reverse-tethering (design is done and development is underway so hopefully soon it will be available). Any iOS devices need to be run over WiFi with [remote traffic-shaping](https://github.com/WPO-Foundation/webpagetest/blob/master/docs/Private%20Instances/MobileAgentRaspberryPi.md#traffic-shaping).
* All recent iOS devices should work as test agents as long as they are running iOS 9.3 or later.

## Support Hardware
* [Raspberry Pi 4 model B](https://www.raspberrypi.org/products/raspberry-pi-4-model-b/) with [POE Hat](https://www.raspberrypi.org/products/poe-hat/) - One per phone
* [Sandisk A1+ Micro SD Card - 32GB+](https://shop.westerndigital.com/c/memory-cards.SD.microsd_cards) - One per Raspberry Pi
* [8-port](https://www.amazon.com/gp/product/B00LW9A328/ref=oh_aui_search_detailpage?ie=UTF8&psc=1) or [48-port](https://www.amazon.com/NETGEAR-ProSAFE-GS752TP-Gigabit-GS752TP-100NAS/dp/B00BGTPQO4/) managed PoE switch
* [RJ-45 SFP Transceiver](https://www.amazon.com/gp/product/B01FRQJ1Y2/ref=oh_aui_search_detailpage?ie=UTF8&psc=1) (optional) - One per switch. Allows use of SFP port on switch for uplink connection saving PoE ports for test devices
* [Slim Ethernet patch cable](https://www.amazon.com/gp/product/B01BGV2ZC2/ref=oh_aui_search_detailpage?ie=UTF8&psc=1) - One per Raspberry Pi, length as appropriate to reach from switch to test device
* [Micro USB cable](https://www.amazon.com/gp/product/B00UFG5GVM/ref=oh_aui_search_detailpage?ie=UTF8&psc=1) - One per phone (Or just use cable that came with phone)
* [USB 3.0 Hub](https://www.amazon.com/gp/product/B06XG5CP6D/ref=oh_aui_search_detailpage?ie=UTF8&psc=1) - As needed for large tablets (full-size iPads). Use the power adapter from the tablet to power the hub.
* [AirPort Express Base Station](https://www.amazon.com/gp/product/B008ALA2RC/ref=oh_aui_search_detailpage?ie=UTF8&psc=1)
* [3-D Printed](https://www.tinkercad.com/things/3SfNUY30eFd-shelf-large-vertical-phone-stand-85mm-max-width) or [store-bought](https://www.amazon.com/dp/B07438NMTX/) Phone Stand - One per Phone

# Hardware Configuration
* Configure the switch and assign it a static IP address for management
* Install [Raspberry Pi OS Lite](https://www.raspberrypi.org/software/operating-systems/#raspberry-pi-os-32-bit) to the micro SD Card and install it in the Raspberry Pi
* Connect the Raspberry Pi to a keyboard and monitor and go through the initial OS configuration
    * Enable SSH
    * Assign it a static IP address
* Attach the Raspberry Pi to the back of the phone stand with zip ties - optionally with [3M heavy-duty fasteners](https://www.amazon.com/gp/product/B00PX0R8W0/ref=oh_aui_search_detailpage?ie=UTF8&psc=1) behind the Pi for spacing, particularly if the phone stand is metal.
* Mount the phone onto the stand
* Route the Micro USB cable from the Pi to the Phone (through the stand)
* Attach the slim ethernet cable from the PoE Hat to the PoE switch

At this point you should have the phone and Pi as a stand-alone package connected by a single slim ethernet cable to the PoE switch

# Device Setup

### Android
* Unlock the bootloader (this will reset the device so don't bother doing any software configuration until after it is unlocked)
* Connect to the WiFi access point
    * If using remote shaping (not reverse-tethered for testing) assign the device a static IP address that matches one of the pipe configurations on the remote BSD bridge.
* Enable Developer Mode
* In developer options:
    * Enable USB debugging
    * Disable checking of apps installed over USB
    * Configure the display to stay awake when connected
* In Security settings:
    * Make sure there is no pin or pattern configured
    * Set the lock screen to "None"
* In account settings, disable sync for all of the services
* Go to the play store and install the browsers that will be used for testing
* Root The Phone
* Go into SuperSU and configure:
    * Default access to grant
    * Disable logging
    * Disable notification

### iOS
* Configurion iOS test agents requires building the [iWptBrowser app](https://github.com/WPO-Foundation/iWptBrowser) and installing it onto the phones.  There is a detailed walkthrough for setting up the phones so they automatically boot into the agent software [here](https://github.com/WPO-Foundation/iWptBrowser/blob/master/docs/walkthrough.md).

# Raspberry Pi Configuration
The [wptagent-install script](https://github.com/WPO-Foundation/wptagent-install#raspberry-pi-raspbian-stretch) can automatically configure the agent software starting with a raspbian server image.

# Operational Notes

Optimally the agent will automatically update the agent software hourly and daily it will update the OS, lighthouse and trim the SD card.

If something fails with the agent itself or the raspberry Pi locks up the watchdog will reboot the Pi and it should continue operating seamlessly.  The /getTesters.php page on the WebPageTest server will show the agent uptime.  If there is an agent with a consistently lower uptime than the others it may be worth looking at the hardware and software config to understand why it keeps rebooting.

You can monitor the agent activity directly by connecting ssh to the pi and running "screen -r" to connect to the screen session running the agent (make sure to disconnect the screen session, not kill the agent process).

If the phone goes offline but the pi is still responding you can ssh into the pi and "adb reboot" the phone.  When the phone finishes rebooting it should automatically start testing again.

If the pi goes offline and isn't responding to ssh (and wasn't automatically recovered by the watchdog) you can connect to the management interface on the PoE switch, going into the PoE port settings, disabling the port the pi is connected to and then re-enabling it (that cuts power to the Pi and restores it).
