var url = require('url');
var adr = 'http://localhost:8080/abcd.html?year=2025&month=february';
//Parse the address:
var q = url.parse(adr, true);

/*The parse method returns an object containing url properties*/
console.log(q.host);
console.log(q.pathname);
console.log(q.search);

/*The query property returns an object with all the querystring parameters as properties:*/
var qdata = q.query;
console.log(qdata.month);
console.log(qdata.year);

var adr = 'http://localhost:8080/abcd.html?firstname='Ramesh'&lastname='Sharma'&email='ramesh@gmail.com';