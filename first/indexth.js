var express = require('express');
var app = express();

var things = require('./things.js');

//both index.js and things.js should be in same directory
app.use('/th', things);

app.listen(3000);