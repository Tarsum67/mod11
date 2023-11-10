const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { v4: uuid } = require('uuid');


const apiRoutes = express.Router();

// Get existing notes
apiRoutes.get('/notes', async (req, res) => {
    try {
        console.info(`${req.method} request received for notes`);
        const data = await fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8');
        const dbData = JSON.parse(data);
        res.json(dbData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to read data.' });
    }
});

// Add a new note
apiRoutes.post('/notes', async (req, res) => {
    try {
        console.info(`${req.method} request received to add a note`);
        const { title, text } = req.body;
        if (title && text) {
            const newNote = {
                title,
                text,
                id: uuid(), // Assigns a random, unique number value
            };

            const data = await fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8');
            const notes = JSON.parse(data);
            notes.push(newNote);

            await fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(notes, null, 2));
            console.log('New note has been written to JSON file');
            res.json(newNote);
        } else {
            res.status(400).json({ error: 'Title and text are required.' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to write data.' });
    }
});

module.exports = apiRoutes;
