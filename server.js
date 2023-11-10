const express = require('express');
const homeRouter = require('./routes/home');
const notesRouter = require('./routes/api'); // Assuming you have a separate file for notes routes

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware and parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.use('/api/', notesRouter); // Use a unique path for notes routes
app.use('/', homeRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
