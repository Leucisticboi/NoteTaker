// Import the necessary modules
const express = require('express');
const notesRouter = require('./notes');

// Initialize application with express
const app = express();

// Use the 'notesRouter' for handling routes under the '/notes' endpoint
app.use('/notes', notesRouter);

// Export the Express application instance for use in other parts of the application
module.exports = app;
