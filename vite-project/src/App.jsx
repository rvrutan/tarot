import React, { useState } from 'react';
import BasicReading from './components/BasicReading';

function App() {
  const [readingData, setReadingData] = useState(null); // Store cards, reading, and isUprights

  const handleNewReading = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/tarot-reading', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setReadingData(data);
    } catch (error) {
      console.error('Error fetching tarot reading:', error);
    }
  };

  return (
    <div className="min-h-screen">
      <header className="py-6 text-center">
        <h1 className="text-3xl font-bold">Tarot Reading</h1>
      </header>
      <main className="container mx-auto p-4">
        <div className="text-center mb-4">
          <button onClick={handleNewReading} className="btn btn-lg">
            New Reading
          </button>
        </div>
        {readingData ? (
          <BasicReading
            cards={readingData.cards}
            reading={readingData.reading}
            isUprights={readingData.isUprights}
          />
        ) : (
          <p className="text-center text-xl">
            Click "New Reading" to get your cards.
          </p>
        )}
      </main>
    </div>
  );
}

export default App;
