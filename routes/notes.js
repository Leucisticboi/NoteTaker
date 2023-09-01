// Import the necessary modules and functions
const nb = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// Route for getting all notes
nb.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    // Read data from db.json file and send it as a JSON response
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// Route for submitting a new note
nb.post('/', (req, res) => {
    console.info(`${req.method} request received to submit new note`);

    const { title, text } = req.body;

    if (title && text) {
        // Create a new note object with a unique ID
        const newNote = {
            title,
            text,
            id: uuid(),
        };

        // Append the new note to the database file's array
        readAndAppend(newNote, './db/db.json');

        // Send a success response with the new note data
        const response = {
            status: 'success',
            body: newNote,
        };

        res.json(response);
    } else {
        // If title or text is missing, send an error response
        res.json('Error in saving note');
    }
});

// Route for deleting a note by ID
nb.delete('/:id', (req, res) => {
    console.info(`${req.method} request received to delete note`);
    const noteId = req.params.id;

    // Read the data from the db.json file
    readFromFile('./db/db.json')
    .then((data) => {
      const notes = JSON.parse(data);

      // Find the index of the note with the specified ID
      const noteIndex = notes.findIndex((note) => note.id === noteId);

      if (noteIndex === -1) {
        // If the note with the specified ID was not found, send a 404 error
        return res.status(404).json({ error: 'Note not found' });
      }

      // Remove the note from the array
      const updatedNotes = notes.filter((note) => note.id !== noteId);

      // Write the updated notes back to db.json
      writeToFile('./db/db.json', updatedNotes);

      res.json({ message: 'Note deleted successfully' });
    })
})

// Export the router module
module.exports = nb;
