// Import required modules and set up the Express application
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Impport api routes from 'index.js' file in the 'routes' directory
const api = require('./routes/index');

// Mount the API routes under the '/api' endpoint
app.use('/api', api);

// Route to serve the 'index.html' file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// Route to serve the 'notes.html' file
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

// Start the Express application and listen on the specified port
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});
