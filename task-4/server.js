const express = require('express');
const app = express();
const port = 3000;

// Middleware to log requests
app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
});

// Route for homepage
app.get('/', (req, res) => {
    res.send('Welcome to the Express Server!');
});

// Route for about page
app.get('/about', (req, res) => {
    res.send('This is the About page');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});