const express = require('express');
const path = require('path');

const homeRouter = express.Router();

// Define a route handler for the /notes path
homeRouter.get('/notes', (req, res) => {
  // Assuming 'notes.html' is in your public directory
  res.sendFile(path.join(__dirname, '../public/notes.html'));
});

// Define a catch-all route for paths not ending with /notes
homeRouter.get('*', (req, res) => {
  // Assuming 'index.html' is in your public directory
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = homeRouter;
