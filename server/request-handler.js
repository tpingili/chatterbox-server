/* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */
var messages = {results: []};
exports.handleRequest = function(request, response) {
  var statusCode;
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "text/plain";
  if (request.url !== '/classes/messages'){
    statusCode = 404;
    response.writeHead(statusCode,headers);
    response.end();
    return;
  }
  /* the 'request' argument comes from nodes http module. It includes info about the
  request - such as what URL the browser is requesting. */

  /* Documentation for both request and response can be found at
   * http://nodemanual.org/0.8.14/nodejs_ref_guide/http.html */
  if(request.method === "GET"){
    console.log("get request");
    statusCode = 200;
    response.writeHead(statusCode,headers);
    response.end(JSON.stringify(messages));
  }else if(request.method === "POST"){
    console.log("post request");
    var data = "";
    var jsonData;
    request.on("data", function(bit){
      data+=bit;
    });
    request.on("end", function(){
      jsonData = JSON.parse(data);
      messages.results.push(jsonData);
    });
    statusCode = 201;
    response.writeHead(statusCode, headers);
    response.end("Posted");
  }else if(request.method === "OPTIONS"){
    statusCode = 200;
    response.writeHead(statusCode,headers);
    response.end();
    console.log("options request");
  }
  console.log("Serving request type " + request.method + " for url " + request.url);



  /* Without this line, this server wouldn't work. See the note
   * below about CORS. */



  /* .writeHead() tells our server what HTTP status code to send back */
  response.writeHead(statusCode, headers);

  /* Make sure to always call response.end() - Node will not send
   * anything back to the client until you do. The string you pass to
   * response.end() will be the body of the response - i.e. what shows
   * up in the browser.*/
  response.end("Hello, World!" );
};

/* These headers will allow Cross-Origin Resource Sharing (CORS).
 * This CRUCIAL code allows this server to talk to websites that
 * are on different domains. (Your chat client is running from a url
 * like file://your/chat/client/index.html, which is considered a
 * different domain.) */
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept, type",
  "access-control-max-age": 10 // Seconds.
};
