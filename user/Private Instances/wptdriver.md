# wptdriver
Legacy Windows-only WebPageTest Agent.  This agent is deprecated in favor of the cross-platform [wptagent](https://github.com/WPO-Foundation/wptagent).

# System Requirements

Windows (Vista or later) (if you use 64-bit you will need WebPagetest 2.9 or later to support traffic shaping)

# Installation

Fasterize has a powershell script that will automate agent installation as well as a perfplanet blog post describing how to use it. Otherwise, for manual installation:

1. Install the browsers you want to use for testing
1. Configure the test system to automatically log-on to an administrator account. The easiest and most reliable way for this to work is to use the autologon app from Microsoft Technet.
1. Disable any screen savers (the desktop needs to remain visible for the video capture to work)
1. Disable UAC (Vista or later - slide to "never notify")
1. Uninstall IE Enhanced-Security Mode (Windows Server)
1. Force windows to use a stable clock if running in a VM (particularly KVM)
    * /USEPMTIMER to boot.ini for XP or Server 2003
    * "bcdedit /set {default} useplatformclock true" from an administrator shell otherwise
1. Configure Windows to boot directly to the desktop (Server 2012)
    * Install desktop experience
    * http://www.win2012workstation.com/tag/start-screen/#manual
1. Disable Shutdown Event Tracker (Windows Server - for convenience)
    * run gpedit.msc
    * Open "Computer Configuration\Administrative Templates\System"
    * Open "Display Shutdown Event Tracker"
    * Set it to disabled
1. Copy the test software from the agent folder to the system (to "c:\webpagetest" for this example)
1. For pre-Windows 8.1 (or server 2012 R2) test agents, Install the DUMMYNET ipfw driver
    * If you are installing on 64-bit Windows, right-click on  "testmode.cmd" in the c:\webpagetest\dummynet\64bit folder and select "Run as Administrator".  Reboot the system to enable testmode.  If you do not run this then traffic shaping will not work after a reboot.
    * Copy the files from either the webpagetest\dummynet\32bit or webpagetest\dummynet\64bit directory into the webpagetest\dummynet directory (depending on your OS)
    * Pull up the properties for the Network Adapter that is used to access the Internet
    * Click "Install"
    * Select "Service" and click "Add"
    * Click "Have Disk" and navigate to webpagetest\dummynet
    * Select the ipfw+dummynet service (and click through any warnings about the driver being unsigned)
1. Windows 10, if testing with Microsoft Edge (work in progress):
    * Install Python 2.7 for all users to c:\Python27 (default install directory)
    * Install selenium from a cmd shell
      * c:\Python27\Scripts\pip install selenium
    * Install pyWin32 from the agent folder (may need to be run from an administrator command prompt)
    * Install Imagemagick
    * Install Windows Performance Toolkit (uncheck all of the other options from the adk setup)
1. You need a separate machine/VM for each version of IE but the rest of the browsers can all be run on the same machine and share a machine with IE (tests will not run at the same time, they will alternate)
1. Create a task scheduler task to run wptdriver.exe at logon:
    * Configure it to run with the highest privliges
    * Have it run at logon of the user account
    * Make sure it is not configured to terminate after 3 days (the default task scheduler configuration)
1. Make a copy of the settings file (wptdriver.ini) based on the sample
    * wptdriver can automatically install Chrome and Firefox (and keep Firefox up to date). If you would prefer to manually install the browsers then remove the installer=... entry for each of the browsers you want tp manually install
    * Make sure the path to the browser executables are correct for your system (if you are automatically installing Chrome and Firefox they will only install after the first time you run wptdriver)
    * Configure the location to match the location defined on the server in locations.ini
    * Configure the location key to match the server in locations.ini
    * Make sure the available browsers in the ini file match the list defined in locations.ini in the browsers=x,y,z entry for the location.
1. Launch wptdriver and let it install any software it needs to install (exit when it gets to "waiting for work").
1. Reboot to make sure everything starts up correctly

If you connect a remote desktop to the test machine, make sure to reboot the machine when you are done, otherwise the desktop will remain locked and screen captures will not work.

# Headless Servers (including Google Compute Engine)

Screen shots and video capture both require that the desktop be visible for testing.  Some servers have no video device available or resolution that is too low for using for testing.  In those cases the setup becomes a bit more complicated (but is still possible).  The test machine needs 2 user accounts and needs to run a RDP session to itself and run the testing inside of the RDP session which will give it a virtual display to use.  This can also be used as a security technique if you are not comfortable leaving the desktop unlocked at all times.

1. Create 2 user accounts.  We'll call them "user" and "administrator".  The "user" account will be the one that is used at startup to create the RDP session and the "administrator" account is where testing will be run.  The "user" account doesn't need to be an admin account
1. Set up the testing account:
    * Connect with RDP to the "administrator" account and set it up to run tests using the normal WPT configuration
    * Log out of the RDP session (don't just disconnect, log the user out but leave the system running)
    * Re-connect through RDP to the "administrator" account and make sure testing starts up and runs correctly automatically as soon as you connect
1. Set up the RDP host account:
    * Connect with RDP to the "user" account
    * Configure autologon to log in to the "user" account automatically at startup.  I usually use the autologon app from Microsoft to do the configuration.
    * Connect with RDP to 127.0.0.2 using the administrator account and have it remember the credentials (can't be localhost or 127.0.0.1 because RDP will block those attempts but it allows 127.0.0.2 which is still localhost)
    * Open a cmd shell
    * Store the administrator password for RDP using "cmdkey /generic:TERMSRV/127.0.0.2 /user:administrator /pass:<adminpass>"
    * enter "mstsc /w:1920 /h:1200 /v:127.0.0.2" and make sure it opens a RDP connection and starts testing (close the session after verifying it works)
    * Create a task scheduler task to run at logon of the "user" account that runs mstsc.exe with command line options "/w:1920 /h:1200 /v:127.0.0.2"

Now when you reboot the server it should automatically log into the "user" account which will then RDP to the local instance with the "administrator" account and testing will run inside of the RDP session

# Updating Test Agents

The test agents will automatically update their code from the server if there are update files in place (in /work/update on the server).  Each update consists of a zip file (the actual updata) and an ini file that contains some meta-data about the update (most importantly, the software version).  There are separate updates for the IE agent (update.zip/update.ini) and the Chrome/Firefox agent (wptupdate.zip/wptupdate.ini).

Each new release includes updated agent binaries but sometimes it is helpful or necessary to update the agents in between releases if you need a bug fix or functionality that has been made available on the public instance but that hasn't been packaged up in a new release yet.  In this case you can download the update from the public instance of WebPagetest and deploy it on your private instance (the agents are backwards compatible so you do not need to update the web code unless you need updated functionality there).  

With WebPageTest 2.18 or later, the server can automatically update to the latest version as it is released.  In settings/settings.ini on the server, add:

```
agentUpdate=http://cdn.webpagetest.org/
```

To download and update manually:
* Download the agent updates:
    * http://www.webpagetest.org/work/update/update.zip
    * http://www.webpagetest.org/work/update/wptupdate.zip
* Extract the ini file from within the zip files (update.ini and wptupdate.ini)
* Copy the zip files to the /work/update folder on your server (you may want to back up the existing agent updates so you can roll back if necessary)
* Copy the ini files to the /work/update folder on your server

After uploading the updates, each agent will automatically download and install the update before running their next test so you can be guaranteed that the update will be deployed before any more testing occurs.

# Troubleshooting

## Low disk space
* WebPagetest doesn't maintain any temporary files but sometimes Windows itself leaves stuff lying around and the disks can fill up. When that happens there are a few common things you can do to clean it up:
    * You can delete everything in "C:\Windows\SoftwareDistribution\Download". Windows keeps the full installer for every software update it installs and it doesn't need them after the install.
    * Try right-clicking on the c drive -> properties -> Disk Cleanup. There might be some crash reports it can cleanup
* If that doesn't free enough space there are a few more things you can do:
    * Use windirstat to see what is taking up the disk space
    * It's possible the IE temporary Internet files got corrupt and is growing out of control. CCleaner can help fix that sometimes
    * Make sure hibernation is disabled (no hiberfile.sys on the c drive)
    * Worst case, you can disable the swap file to get back a gig or two