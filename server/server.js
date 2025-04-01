const express = require('express');
const app = express();
const port = 3000;

// Import the cards route
const cardsRouter = require('./routes/routes.js');

// Use the cards router
app.use('/', cardsRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});