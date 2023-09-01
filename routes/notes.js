const nb = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
const path = require('path');
const dbFilePath = path.join(__dirname, '../db/db.json');

nb.get('/notes', (req, res) => {
    console.info(`${req.method} request received for notes`);

    readFromFile(dbFilePath).then((data) => res.json(JSON.parse(data)));
});

nb.post('/notes', (req, res) => {
    console.info(`${req.method} request received to  submit new note`);

    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            note_id: uuid(),
        };

        readAndAppend(newNote, dbFilePath);

        const response = {
            status: 'success',
            body: newNote,
        };

        res.json(response);
    } else {
        res.json('Error in posting feedback');
    }
});

module.exports = nb;
