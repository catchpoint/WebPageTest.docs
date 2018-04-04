# Google WebPageTest Server

## Create Cloud Storage Bucket (optional)
If you want to keep the tests archived in cloud storage you should set up a bucket and developer key before configuring the WebPageTest Server (the install script will prompt you for the information).  If you will not be archiving tests to cloud storage or plan to configure it manually later you can skip this step.

## Set Up Server

### Start with a Ubuntu 16.04 instance
Create an instance using the Ubuntu 16.04 image and using a SSD persistent disk.  The size of the instance is going to depend on how many agents are going to be connecting to it. the 1-2 CPU instance sizes should handle most deployments though REALLY large deployments with thousands of agents can require up to 32-64 CPU's to handle the web server traffic.  The amount of storage will entirely depend on how many tests are going to be kept on the server before being archived or deleted.  A 1MB average for each test result is a reasonable ballpark for planning purposes.  If archiving to cloud storage, the default settings are configured to archive tests after a day so planning for 2 days of local results should be sufficient.

[boot disk image]

Make sure that the server is reachable over http from the networks where you want to access it. Also provide a SSH key if you want to use a native SSH client to manage the server instead of the in-browser SSH support from the cloud console.

