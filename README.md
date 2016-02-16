# Collaborative-Geo-Data-v0.1.02
Allows people to collaboratively add geo-based data to a google map, save the data to a database, and share it with others. 
See a [live demo here](http://christroutner.com:3000/MultipleMaps.html).


# Overview

This program allows easy sharing and crowdsourcing of geo-location data. Written completely in JavaScript, the source code is intended as foundation of code to build from rather than a turn-key product. The emphasis is on simplicity and good code commenting. Error handling is minimal to avoid obfuscation of the code.

The program has two code bases – one that runs on the *server* using Node and one that runs in the *client*’s web browser. 

Data is stored on the server in two ways: 

1.	A CSV file contains the basic information needed to populate a Google Map with markers. 
2.	The detailed data for each location is stored in an XML file. 

Node.js handlers for POST requests allow clients to send information that the server uses to update these files. For larger, scalable systems, the use of a database would be more appropriate, but using CSV and XML reduces complexity and allows use of the program without needing to know the fine art of database interfacing and management.

The client side JavaScript downloads the CSV file and creates the map. When a marker on the map is clicked, the detailed XML data is then downloaded and displayed. This information can also be edited in the client’s browser and the data sent to the web server for updating the CSV and XML files.

[View an illustration of the process.](http://christroutner.com/geodata/Overview.jpg)

## Server Side Files
The web server running Node.js will use the files located in the Node directory. The following file list gives a brief explanation of each file. The coding model follows that laid out in the [The Node Beginner Book](http://www.nodebeginner.org/), an excellent introduction to Node.js.

* Index.js is the primary file that starts up the web server. This is the file that runs with `node index.js`. It points to all the other files.

* Server.js and router.js are the respective server and router files as the layout convention used in The Node Beginner Book.

* requestHandlers.js handle the various POST request. This is where the magic happens. This is the primary library file that handles the data flow.

## Apache Server (Client) Files
Although these files are identified as ‘client’ files, they live in the Apache server folder (typically ‘www’) and are simply web pages served to the client. The javascript contained in the files is run by the client web browser. Because of security issues around downloading and opening files over the internet, the Apache server needs to live on the same server running Node.js. There are workarounds ([enabling CORS](http://stackoverflow.com/questions/7067966/how-to-allow-cors-in-express-node-js)), but this code will not work out-of-the-box otherwise.

* MultipleMaps.html is the primary user interface. This page downloads the MarkerData.xml file from the server and populates a Google Map with the data.

* ModifyLocation.htm is opened by clicking on a dynamic link. This link is created when clicking on one of the locations in MultipleMaps.html. The dynamic link contains a UniqueID that allows this page to retrieve the XML file for that location and populate the web forms used to edit the data. Clicking the submit button will then upload the data to the web server to update the XML file.

* Add_new_test.html is used to add new location data. This is different than editing an existing location, which is the primary job of ModifyLocation.htm.

* ViewDetails.htm loads the detailed data for a location. This data is contained in an XML file on the server. This page is also loaded through a dynamic link which is generated by MultipleMaps.htm when a map marker is clicked.

## Server Setup
Here are the step-by-step direction for setting up and running the program. It's assumed you have Node installed already. The server used to test the steps below was a Raspberry Pi running Raspbian. However, the steps below should work for any Debian or Ubuntu based Linux server.

You will need to install the following npm packages:

```
npm install csv-parse
npm install elementtree
npm install rander
npm install ya-csv
```

-In the Node directory is a MarkerData.csv file and a /locations folder. Move these to the root www folder on the server. 

-All HTML files will need to be updated with the URL to these server files.

-If the server-side files are on a different machine than the HTML pages, then you'll need to configure the server for this with the appropriate HTTP header.

-Server starts on port 3000 by default




