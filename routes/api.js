const express = require('express');
const apiRoutes = express.Router();
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Function to read from a file
const readFromFile = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return data;
  } catch (error) {
    console.error('Error reading file:', error);
    throw new Error('Failed to read data from file.');
  }
};

// Function to append data to a file
const readAndAppend = async (data, filePath) => {
  try {
    // Read existing data from the file
    const existingData = await readFromFile(filePath);
    
    // Parse existing data as JSON
    const jsonData = JSON.parse(existingData);

    // Append the new data to the array
    jsonData.push(data);

    // Write the updated data back to the file
    await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2));

  } catch (error) {
    console.error('Error appending to file:', error);
    throw new Error('Failed to append data to file.');
  }
};

// Get existing notes
apiRoutes.get('/notes', async (req, res) => {
  try {
    console.info(`${req.method} request received for notes`);
    const data = await readFromFile('./db/db.json');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to read data.' });
  }
});

// Add a new note
apiRoutes.post('/notes', async (req, res) => {
  try {
    console.info(`${req.method} request received to add a note`);

    const note = req.body;

    // Error handling
    if (!note || !note.title || !note.text) {
      res.status(400).json({ error: 'Invalid data. Both title and text are required.' });
      return;
    }

    // Create note object
    const newNote = {
      title: note.title,
      text: note.text,
      id: uuidv4(), // give note a unique ID
    };

    // Append the new note to the 'db.json' file
    await readAndAppend(newNote, './db/db.json');

    const response = {
      status: 'success',
      body: newNote,
    };

    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while saving the note.' });
  }
});

// DELETE /api/notes/:id
apiRoutes.delete('/notes/:id', async (req, res) => {
    try {
      const noteId = req.params.id;
  
      // Read existing data from the file
      const existingData = await readFromFile('./db/db.json');
  
      // Parse existing data as JSON
      const jsonData = JSON.parse(existingData);
  
      // Find the index of the note with the specified ID
      const noteIndex = jsonData.findIndex((note) => note.id === noteId);
  
      // Check if the note with the specified ID was found
      if (noteIndex !== -1) {
        // Remove the note from the array
        jsonData.splice(noteIndex, 1);
  
        // Write the updated data back to the file
        await fs.writeFile('./db/db.json', JSON.stringify(jsonData, null, 2));
  
        res.json({ status: 'success', message: 'Note deleted successfully.' });
      } else {
        res.status(404).json({ error: 'Note not found.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete the note.' });
    }
  });
  
module.exports = apiRoutes;
