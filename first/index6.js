var express = require('express');
var app = express();

//Middleware function to log request protocol
app.use('/pqr', function(req, res, next){
   console.log("A request for things received at " + Date.now());
   next();
});

// Route handler that sends the response
app.get('/pqr', function(req, res){
   res.send('Pinnacle');
});

app.listen(3000);