const nb = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

nb.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);

    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

nb.post('/', (req, res) => {
    console.info(`${req.method} request received to submit new note`);

    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };

        readAndAppend(newNote, './db/db.json');

        const response = {
            status: 'success',
            body: newNote,
        };

        res.json(response);
    } else {
        res.json('Error in saving note');
    }
});

nb.delete('/:id', (req, res) => {
    console.info(`${req.method} request received to delete note`);
    const noteId = req.params.id;

    readFromFile('./db/db.json')
    .then((data) => {
      const notes = JSON.parse(data);

      // Find the index of the note with the specified ID
      const noteIndex = notes.findIndex((note) => note.id === noteId);

      if (noteIndex === -1) {
        // Note with the specified ID was not found
        return res.status(404).json({ error: 'Note not found' });
      }

      // Remove the note from the array
      const updatedNotes = notes.filter((note) => note.id !== noteId);

      // Write the updated notes back to db.json
      writeToFile('./db/db.json', updatedNotes);

      res.json({ message: 'Note deleted successfully' });
    })
})

module.exports = nb;
