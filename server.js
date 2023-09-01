const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define your routes
const apiRouter = require('./routes/index');
app.use('/api', apiRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});
