‘use strict’
var express = require(‘express’);
var mongoose = require(‘mongoose’);
//and create our instances
var app = express();
//set our port to either a predetermined port number if you have set 
//it up, or 3001
var port = 3000;


//starts the server and listens for requests
app.listen(port, function() {
 console.log(`api running on port ${port}`);
});