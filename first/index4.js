var express = require('express');
var app = express();

app.get('/pqr/:name/:id', function(req, res) {
   res.send('id: ' + req.params.id + ' and name: ' + req.params.name);
});
app.listen(3000);