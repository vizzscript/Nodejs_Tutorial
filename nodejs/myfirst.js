var http = require('http');

http.createServer(function (req, res) {
  	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write("Pinnacle");
	res.write("Nagpur");
  	res.end('Sai Compusys!');
}).listen(8080);