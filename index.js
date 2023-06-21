const express = require('express');
const path = require('path');

const app = express();
let port = 3000;

function startServer() {
  // Serve static files from the 'build' directory
  app.use(express.static(path.join(__dirname, 'build')));

  // Serve the index.html file for all requests
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

app.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    // Port is already in use, try the next one
    port++;
    startServer();
  } else {
    // Other errors occurred
    console.error('An error occurred while starting the server:', err);
  }
});

startServer();
