// import { useState } from 'react'
// // import './App.css'
// import Card from './components/Card'
// // import 'm00.jpg' from '../../server/assets/cards'

// function App() {
//   const [count, setCount] = useState(0)
//   const name = "Fool"
//   const image = '/cards/m00.jpg'

//   return (
//     <>
//     <Card name={name} image={image}/>
//     </>
//   )
// }

// export default App

// client/src/App.jsx
import React, { useState } from 'react';
import BasicReading from './components/BasicReading';
import cardsData from '../../server/assets/cards.json';

function App() {
  const [readingCards, setReadingCards] = useState([]);

  // Function to get three random cards from the deck
  const getRandomCards = () => {
    const deck = cardsData.cards;
    // Shuffle the deck and take the first three cards
    const shuffled = deck.slice().sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  };

  // Handler for the "New Reading" button
  const handleNewReading = () => {
    const cards = getRandomCards();
    setReadingCards(cards);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="py-6 bg-primary text-white text-center">
        <h1 className="text-3xl font-bold">Tarot Reading</h1>
      </header>
      <main className="container mx-auto p-4">
        <div className="text-center mb-4">
          <button onClick={handleNewReading} className="btn btn-lg btn-primary">
            New Reading
          </button>
        </div>
        {readingCards.length === 3 ? (
          <BasicReading cards={readingCards} />
        ) : (
          <p className="text-center text-xl text-gray-600">
            Click "New Reading" to get your cards.
          </p>
        )}
      </main>
    </div>
  );
}

export default App;
