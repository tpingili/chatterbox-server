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
    return handleGet(request,response);
  }else if(request.method === "POST"){
    return handlePost(request, response);
  }else if(request.method === "OPTIONS"){
    return handleOptions(request, response);
  }
};
var handleOptions = function(request, response){
    var statusCode = 200;
    var headers = defaultCorsHeaders;
    response.writeHead(statusCode,headers);
    response.end();
    console.log("Serving request type " + request.method + " for url " + request.url);
};
var handlePost = function(request, response){
    var statusCode = 201;
    var headers = defaultCorsHeaders;
    var data = "";
    var jsonData;
    request.on("data", function(bit){
      data+=bit;
    });
    request.on("end", function(){
      jsonData = JSON.parse(data);
      messages.results.push(jsonData);
      response.writeHead(statusCode, headers);
      console.log("Serving request type " + request.method + " for url " + request.url);
      response.end("Posted");
    });
};
var handleGet = function(request, response){
  var statusCode = 200;
  var headers = defaultCorsHeaders;
  response.writeHead(statusCode,headers);
  console.log("Serving request type " + request.method + " for url " + request.url);
  response.end(JSON.stringify(messages));
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
