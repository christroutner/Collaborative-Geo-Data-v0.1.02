var http = require("http"); //http is a node.js module.
var url = require("url"); //url is a node.js module.

//Create a server and have it listen on port 8888.
//Passing in the route function as an argument, to route requests.
function start(route, handle) {
  //Http Request Handler:
  function onRequest(request, response) {
    //Retrieve the url path requested and write it to the log.
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    var postData = ""; //A 'bucket' to collect POST data.

    request.setEncoding("utf8");

    //This listener collects all POST data and drops it into a bucket varible.
    request.addListener("data", function(postDataChunk) {
      postData += postDataChunk; //Add chunk to bucket.
      console.log("Received POST data chunk '"+ postDataChunk +"'.");
    });

    //Once all POST data has been collected, it is passed on to the router.
    request.addListener("end", function() {
      route(handle, pathname, response, postData);
    });

  }


  http.createServer(onRequest).listen(8888);
  console.log("Server has started on port 8888.");
}

exports.start = start;
