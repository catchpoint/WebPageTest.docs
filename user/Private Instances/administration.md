# Administration of Private Instances

## Useful Pages for Debugging

The following pages are available on the WebPageTest master, which can be helpful in
determining the state of your cluster:

### /getLocations.php

Add the ?f=html query parameter for a more human readable format.

getLocations returns back information on the number of testers and the tests being
executed in each location.

### /getTesters.php

Add the ?f=html query parameter for a more human readable format.

getTesters returns a table of the active test machines with detailed information on
the current state.

## Administrative Operations

### Clearing of WebPageTest Queues

WebPageTestQueue objects live in $DATA_ROOT/work/jobs directory on the master. Deleting those files will remove the jobs from the queue.