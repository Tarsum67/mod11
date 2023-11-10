const notesRouter = require('express').Router();


// Get all notes
notesRouter.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });
  
  // Create a new note
  notesRouter.post('/', (req, res) => {
    const newNote = req.body; // Assuming you send the new note data in the request body
    // Add validation or other logic as needed
    // For simplicity, this example assumes the data is valid
    readFromFile('./db/db.json').then((data) => {
      const notes = JSON.parse(data);
      notes.push(newNote);
      writeToDb('./db/db.json', JSON.stringify(notes))
        .then(() => res.json({ success: true }))
        .catch((err) => res.status(500).json({ success: false, error: err.message }));
    });
  });
module.exports = notesRouter;