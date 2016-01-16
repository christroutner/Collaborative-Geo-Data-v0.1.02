var server = require("./server"); //Import the server.js file
var router = require("./router"); //Import the router.js file
var requestHandlers = require("./requestHandlers"); 

var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/csvtest"] = requestHandlers.csvtest;
handle["/add_new"] = requestHandlers.add_new;

server.start(router.route, handle);
