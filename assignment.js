/*
1) Create a database mydatabase
2) create table customers
3) Insert some values of 10 customers
4) Retrieve this info and display it on the webpage
5) Take input from the user on html page,where the user types the address(Pune) and display the list of customers on the webpage
*/

var http = require('http')
var mysql = require('mysql2')
var url = require('url')
var con = mysql.createConnection({
  host: 'localhost',
  user: 'vratik',
  password: 'Pass@123'
})

con.connect(err => {
  if (err) throw err
  console.log('Connected to MySQL!')

  con.query('CREATE DATABASE IF NOT EXISTS myDatabase', err => {
    if (err) throw err
    console.log('Database created or already exists!!')

    con.query('USE myDatabase', err => {
      if (err) throw err
      console.log('Using database: myDatabase')

      const createTable = `
        CREATE TABLE IF NOT EXISTS customers(
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        address VARCHAR(255)
        )`

      con.query(createTable, err => {
        if (err) throw err
        console.log('Table created or already exists!')

        con.query('SELECT COUNT(*) AS count FROM customers', (err, result) => {
          if (err) throw err
          if (result[0].count === 0) {
            const insertQuery = 'INSERT INTO customers(name, address) VALUES ?'
            const values = [
              ['HCL', 'Pune'],
              ['Persistent', 'Noida'],
              ['Pinnacle', 'Mysore'],
              ['Zomato', 'Delhi'],
              ['Flipkart', 'Nagpur'],
              ['Amazon', 'Bengaluru'],
              ['Capgemini', 'Hyderabad'],
              ['Cognizant', 'Gurugram'],
              ['Infosys', 'Kolkata'],
              ['Makemytrip', 'Mumbai']
            ]

            con.query(insertQuery, [values], function(err, result) {
              if (err) throw err
              console.log('Number of rows inserted: ', result.affectedRows)
            })
          }
        })
      })
    })
  })
})

// Create an HTTP server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true)
  const path = parsedUrl.pathname
  const query = parsedUrl.query

  if (path === '/customers') {
    // Retrieve customer data based on address (if provided)
    const address = query.address || ''
    const sql = address
      ? `SELECT * FROM customers WHERE address = '${address}'`
      : 'SELECT * FROM customers'

    con.query(sql, (err, results) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' })
        res.end('Database error')
        return
      }

      // Display results as HTML
      res.writeHead(200, { 'Content-Type': 'text/html' })

      res.write(`
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 20px;
            }
            h1 {
              color: #333;
            }
            form {
              margin-bottom: 20px;
            }
            input[type="text"] {
              padding: 8px;
              width: 200px;
              border: 1px solid #ccc;
              border-radius: 4px;
            }
            button {
              padding: 8px 12px;
              background-color: #28a745;
              color: white;
              border: none;
              border-radius: 4px;
              cursor: pointer;
            }
            button:hover {
              background-color: #218838;
            }
            ul {
              list-style-type: none;
              padding: 0;
            }
            li {
              background-color: white;
              margin: 5px 0;
              padding: 10px;
              border: 1px solid #ddd;
              border-radius: 4px;
            }
          </style>
        </head>
        <body>
          <h1>Customer List</h1>
          <form action="/customers" method="get">
            <input type="text" name="address" placeholder="Enter address (e.g., Pune)">
            <button type="submit">Filter</button>
          </form>
          <ul>
      `)

      results.forEach(customer => {
        res.write(`<li>${customer.name} - ${customer.address}</li>`)
      })
      res.write('</ul>')
      res.end()
    })
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('Page not found')
  }
})

// Start the server
server.listen(8080, () => {
  console.log('Server is running on http://localhost:8080')
})
