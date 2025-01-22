//File path: /index.js (root)
// Import required modules
const express = require('express');
const path = require('path');

// Create an Express application
const app = express();

// Define the port for the server to listen on
const port = 3000;

// Set Pug as the view engine
app.set('view engine', 'pug');

// Set the views directory to 'views' in the current directory
app.set('views', path.join(__dirname, 'views'));

// Define a route to render the Pug template when the root path is accessed
app.get('/', (req, res) => {
  // Data to be sent to the Pug template
  const data = {
    message: 'Hello from Sai Compusys!',
    courses: ['Web Development', 'DSA', 'Java','Python','C','C++','React','Angular']
  };

  // Render the Pug template named 'index' and pass the data
  res.render('index', data);
});

// Start the server and listen on the specified port
app.listen(port, () => {
  // Display a message when the server starts successfully
  console.log(`Server is running at http://localhost:${port}`);
});
