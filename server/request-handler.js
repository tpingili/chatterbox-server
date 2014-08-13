
var url = require("url");
var query = require("querystring");
var utils = require("./utils.js");

var messages = {results: []};

var handleOptions = function(request, response){
    utils.sendResponse(response);
};

var handleGet = function(request, response){
  var urlParts = url.parse(request.url);
  var queryObj = query.parse(urlParts.query);
  if (queryObj['order']){
    var sorted = messages.results.sort(function(a,b){
      return b.createdAt - a.createdAt;
    });
    utils.sendResponse(response, {results: sorted});
  }else{
    utils.sendResponse(response, messages);
  }
};
var handlePost = function(request, response){
    utils.getData(request, function(data){
      messages.results.push(data);
      utils.sendResponse(response, "Posted", 201);
    });
};
var actionMap = {
  'GET': handleGet,
  'POST':handlePost,
  'OPTIONS':handleOptions
};
exports.handler = function(request, response) {
  var action = actionMap[request.method];
  if(action){
    action(request,response);
  }else{
    utils.send404(response);
  }
};


