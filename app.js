"use strict";

const request = require('request');
const http = require('http');

const myRequest = (url, cb) => {
  /*
  create your own request module here.
  It should take a url to make a http GET request, and a callback function with three arguments;
  1. error (String: if an error occurred),
  2. response(Object; includes the response & statusCode of the request),
  3. body (String; includes the body of the request)
  */
  http.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    cb(null, res, data);
  });
}).on('error', (err) => {
  cb(err);
});
};

// Helper
const testRequest = (module) => {
  module('http://jsonplaceholder.typicode.com/users/1', function (error, response, body) {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    console.log('body:', body);
  });
};

// request module test
testRequest(request);

// // myRequest module test
testRequest(myRequest);
