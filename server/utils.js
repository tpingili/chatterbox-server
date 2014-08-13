var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "Content-Type" : "application/json",
  "access-control-max-age": 10 // Seconds.
};
var count = 1;
exports.sendResponse = function(response, data, statusCode){
  statusCode = statusCode || 200;
  response.writeHead(statusCode, defaultCorsHeaders);
  response.end(JSON.stringify(data));
};

exports.send404 = function(response){
  exports.sendResponse(response, "Not Found", 404 );
};
exports.getData = function(request, callback){
    var stream = "";

    request.on("data", function(bit){
      stream+=bit;
    });
    request.on("end", function(){
      jsonData = JSON.parse(stream);
      jsonData.createdAt = new Date();
      count++;
      jsonData.ObjectId = count;
      callback(jsonData);
    });
  };
