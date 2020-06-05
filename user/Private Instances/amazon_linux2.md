## EC2 server

Create an autoscaling group. Attach a launch config with userdata script  (below setup can be included in the userdata bash commands) and an amazon linux2 ami (t2.micro). Create a loadbalancer and target group for the server (we can pass the load balancer url to the agents and when we restack, we don’t have to depend on the static ip). For security group, make sure you allow right ingress rules so that the test agents can connect to the loadbalancer. This way all the agents connect to the server using the loadbalancer url.

	1. Install the epel repo
	2. Install the remi repo
	3. Install the rpmFusion repo
	4. Install the NUX repo
	5. Install fribidi seperately
	6. Install all the required things for web page test
	yum install unzip gcc nginx python-pip php72-php-gd php72-php-cli php72-php-mbstring php72-php-curl php72-php-zlib php72-php-sqlite3 php72-php-xml php72-php-xmlreader php72-php-zip php72-php-sqlite php72-php-fpm php72-php-common ImageMagick libjpeg libjpeg-turbo perl-Image-ExifTool ffmpeg-devel ffmpeg -y
	7. Install libjpeg-turbo-utils seperately
	8. Update all packages
	yum update -y
	9. PIP install Pillow
	sudo pip install Pillow SSIM pyssim
	10. move to a decent directory
	mkdir /app
	cd /app
	11. Download the wpt files (it can be copied to s3 bucket and then downloaded from there, you can also have modified settings.ini and locations.ini files).
	12. Set directory permissions
	chmod 777 /app/
	chmod 777 /var/www/webpagetest/
	chmod 755 /var/www/
	chmod 777 -R /var/www/webpagetest/www/tmp/
	chmod 777 -R /var/www/webpagetest/www/dat/
	chmod 777 -R /var/www/webpagetest/www/work/
	chmod 777 -R /var/www/webpagetest/www/logs/
	chmod 777 -R /var/www/webpagetest/www/results/
	
	13. Restart / start services
	sudo systemctl start php72-php-fpm
	sudo systemctl restart nginx
	chmod 777 -R /app/www/results/
	chmod 777 -R /app/www/logs/
	14. Restart Collectd
	sudo service collectd stop
	sudo service collectd start
	sudo systemctl restart nginx
	
	
## EC2 Test Agents
**c4.large** or faster instances are recommended (faster may not show any benefit).  The m3.medium instances seem to be getting slower (or browsers are getting more bloated).
### Configuration
The configuration of the test agents is done through bash commands which are passed through the user data strings when instances are started.

Install all the necessary packages from the package manager (RPM)

	1. EPEL
	2. Install the remi repo
	3. Install the rpmFusion repo
	4. Install the NUX repo
	5. Install libva package
	6. Install fribidi seperately
	7. Install liberation-fonts
	8. Install all the required things for web page test
	sudo yum install unzip gcc nginx python-pip php72-php-gd php72-php-cli php72-php-mbstring php72-php-curl php72-php-zlib php72-php-sqlite3 php72-php-xml php72-php-xmlreader php72-php-zip php72-php-sqlite php72-php-fpm php72-php-common ImageMagick libjpeg libjpeg-turbo perl-Image-ExifTool ffmpeg-devel ffmpeg -y
	9. Install libjpeg-turbo-utils seperately
	
	10. Install all the required things for web page test
	sudo yum install tc git Xvfb unzip gcc bind bind-utils python-pip python-devel ImageMagick libjpeg libjpeg-turbo perl-Image-ExifTool ffmpeg-devel ffmpeg traceroute wget dbus-x11 libcgroup libcgroup-tools liberation-mono-fonts liberation-narrow-fonts liberation-sans-fonts liberation-serif-fonts -y
	11. install Xvfb
	12. PIP install
	13. sudo pip install wheel
	14. sudo pip install dnspython monotonic Pillow psutil requests ujson xvfbwrapper marionette_driver 'mozrunner==6.15' 'tornado>=5.0.2,<6.0'
	15. Install nodejs
	16. NPM install lighthouse, the default setup doesn't properly create a symlink
	17. move to a decent directory ex:- /app/ and download the wpt files (it can be copied to s3 bucket and then downloaded from there)
	18. Install Chrome
	19.  Set directory permissions
	chmod 777 -R /app/
	mkdir /app/wptagent/work/
	chmod 777 -R /app/wptagent/work/
	
	20. Restart Collectd
	sudo service collectd stop
	sudo service collectd start
	runuser -l <ec2-user> -c 'nohup python /app/wptagent/wptagent.py --xvfb -vvvv --server "<server-loadbalancer url>/work/" --key "<location-key>" --location "<location>" &'
	
### Troubleshooting
	1. If you see an error "First View: Test Error: Error configuring traffic-shaping", the check the userdata logs and check if there are any error "sudo: tc: command not found", remove iptables before installing all the packages i.e.- "yum remove iptables".
	
###  EC2 setup using autoscaling/lc
   create a launch configuration with userdata script and amazon-linux2        ami and attach it to an autoscaling group. This any number of agents can be scaled up based on the need.

