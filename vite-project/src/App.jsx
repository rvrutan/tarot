import React, { useState, useEffect } from 'react';
import BasicReading from './components/BasicReading';

function App() {
  const [readingCards, setReadingCards] = useState([]);
  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/cards')
      .then((res) => res.json())
      .then((data) => setCardsData(data.cards))
      .catch((error) => console.error('Error fetching cards:', error));
  }, []);

  const getRandomCards = () => {
    if (!cardsData.length) return [];
    const shuffled = [...cardsData].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  };

  const handleNewReading = () => {
    setReadingCards(getRandomCards());
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