const express = require('express');
const homeRouter = express.Router();

// Define a route handler for the /notes path
homeRouter.get('/notes', (req, res) => {
  // Assuming 'notes.html' is in your views directory
  res.sendFile('notes.html', { root: __dirname });
});
// Define a catch-all route for paths not ending with /notes
homeRouter.get('*', (req, res) => {
    // Assuming 'index.html' is in your views directory
    res.sendFile('index.html', { root: __dirname });
  });
module.exports = homeRouter;
