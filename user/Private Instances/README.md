# Private Instances
WebPagetest is available as a software package for installation and running of private instances. 

## Releases

The latest release is [available on GitHub](https://github.com/WPO-Foundation/webpagetest/releases)

## Easy Deployment (on EC2)

There is an [EC2 AMI](https://github.com/WPO-Foundation/webpagetest/blob/master/docs/EC2/Server%20AMI.md) available for the WebPageTest server that provides a lot of benefits:
* No configuration required (up and running in 5 minutes).
* Automatically starts and stops EC2 test agents in all of the EC2 regions as needed.
* Automatically updates to the latest server and agent code.

# System Requirements

WebPageTest can be configured to run all on one system (with the web server and test machines all running on the same PC) or with separate systems for the web server and testers.

## Web Server

The Web Server can be any OS that supports PHP (Linux and Windows have both been tested).

* Nginx (php-fpm recommended) or Apache 2.x+:
* PHP 5.3.0 or later (7.x+ recommended) with the following modules:
    * gd
    * zip
    * zlib
    * mbstring
    * curl
    * sqlite (if you want to be able to edit test labels)
* Command-line tools available in the path:
    * ffmpeg (used for rendering video)
        * Needs to be compiled with x264 support (usually is)
        * Needs the legacy tools to be installed for Windows (convert, etc)
    * imagemagick
    * jpegtran
    * exiftool

Debian/Ubuntu install:
```bash
sudo apt-get update && \
sudo apt-get -y dist-upgrade && \
sudo apt-get -y install python2.7 nginx php-fpm php-cli php-xml php-apcu php-gd php-zip php-mbstring php-curl php-sqlite3 beanstalkd imagemagick ffmpeg libjpeg-turbo-progs libimage-exiftool-perl python-setuptools python-dev build-essential python-pip python-numpy python-scipy && \
sudo pip install monotonic ujson pillow pyssim
```

## Test Machine(s)

VM's or physical machines are both supported for desktop testing on Windows, Linux and OS X.  Non-emulated mobile testing requires Android or iOS devices as well as a tethered host to control the devices (Raspberry Pi's are recommended).

# Installation

The zip archive contains 2 folders.  The www folder is the web server software. The agent folder contains the legacy wptdriver agent for the test machine(s).  For the test agents it is recommended to use the newer [cross-platform agent](https://github.com/WPO-Foundation/wptagent/blob/master/docs/install.md) (which is distributed separately).

The configuration files in the archive have a .sample extension so if you are updating an existing install you can just overwrite the current files with the new ones from the archive.


# Web Server Install

1. If you will be using agents that upload .pcap files, consider setting upload_max_filesize and post_max_size to large values (10mb should be enough) and in php.ini.
1. If you will be collecting Chrome dev tools traces, consider setting memory_limit to a large value or disabling the memory limit by setting it to -1.
1. Copy the files from the www folder in the archive to the DocumentRoot location (e.g. /var/www/webpagetest).
1. Grant the apache or nginx user read/write permissions to the following folders under the DocumentRoot:
    * tmp
    * dat
    * results
    * work/jobs
    * work/video
    * logs
1. There are several settings files in the settings folder that can be used to configure the site.  Make a copy of all of the .sample files (removing the .sample extension) as a template for your configuration settings.  Most of the settings can be used as-is with the exception of locations.ini (particularly if you are configuring more than one test location).
1. More information on configuring locations.ini is available here:  https://sites.google.com/a/webpagetest.org/docs/private-instances/locations 

After configuring the web server visit http://{server}/install/ and the software will run a self-check to make sure all of the permissions are ok and all of the required utilities are installed and available.

## Apache
Configure Apache with the required modules and set to allow for .htaccess overrides.

A sample site configuration file might look like this:
```
<Directory "/var/www/webpagetest">
        AllowOverride all
        Order allow,deny
        Allow from all
</Directory>
<VirtualHost *:80>
        DocumentRoot /var/www/webpagetest
</VirtualHost>
```

Using the PHP DSO handler mod_php can dramatically reduce the CPU required when working with large numbers of agents uploading results.

## Nginx
Configure the server root to point to the www directory, to pass php to php_fpm and include the nginx.conf bundled with the code.

A sample server configuration block might look like this:
```
server {
        listen 80 default;
        server_name _;

        root   /var/www/webpagetest/www;

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        location ~ \.php$ {
                limit_except GET POST HEAD {
                        deny all;
                }
                #fastcgi_pass   127.0.0.1:9000;
                fastcgi_pass    unix:/run/php/php7.0-fpm.sock;
                #fastcgi_index  index.php;
                fastcgi_param  SCRIPT_FILENAME  /var/www/webpagetest/www$fastcgi_script_name;
                fastcgi_param  HTTP_MOD_REWRITE On;
                include fastcgi.conf;
        }

        include /var/www/webpagetest/www/nginx.conf;
}
```

# Test Agent Install

The wptagent installation docs are available [here](https://github.com/WPO-Foundation/wptagent/blob/master/docs/install.md).

The legacy wptdriver installation docs are available [here](wptdriver.md).

There are public AMI's for [running test agents on Amazon EC2](ec2_agents.md) and a [walkthrough doc](https://github.com/WPO-Foundation/wptagent/blob/master/docs/gce_walkthrough.md) for setting up test agents to run on Google's Cloud.

# Troubleshooting

* Waiting at the front of the queue
    * Commonly the issue is in your locations.ini. Double check that your location settings match that of which your agent is pulling the server with. Also note if you're using a key, do they match. You can check your Apache access logs for incoming requests being made by your test agent. 
* The test completed but there were no successful results
    * If you're using a 64-bit Windows client you will be unable to perform traffic shaping (using dummynet.) In your locations.ini, add connectivity=LAN to the test location.
* Waterfall charts are missing
    * Check if the GD library is installed. The GD library is used for drawing the waterfalls and generating thumbnail images.
    * Look to see if php-zip, php5-zip or a similar zip library is installed. With some default PHP distributions the library is not present.
* Screen captures are black
    * When disconnecting from RDP, try rebooting the instance versus disconnecting from the RDP client. RDP locks up the desktop when you disconnect which will cause the screen shots and video to break.
* Error message like this in /var/log/apache2/error.log:
    * [Mon Apr 30 10:18:14 2012] [error] [client 1.2.3.4] PHP Warning: POST Content-Length of 22689689 bytes exceeds the limit of 8388608 bytes in Unknown on line 0
    * PHP enforces a limit on the size of uploaded files, and an agent is uploading something larger than this limit. Change upload_max_filesize and post_max_filesize to larger values in php.ini.