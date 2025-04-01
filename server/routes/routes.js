//testing 

// routes/cards.js
const express = require('express');
const router = express.Router();

// Import the JSON file (adjust the path as needed)
const tarotData = require('../assets/cards.json');

// Route to get a random card
router.get('/cards/random', (req, res) => {
  const cards = tarotData.cards;
  const randomIndex = Math.floor(Math.random() * cards.length);
  const randomCard = cards[randomIndex];
  res.json(randomCard);
});

module.exports = router;