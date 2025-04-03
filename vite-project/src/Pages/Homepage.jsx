import React, { useState } from "react";
import BasicReading from "../components/BasicReading";
import logo from "../assets/logo.png";
import Navbar from '../components/Navbar'


export default function Homepage() {
  const [readingData, setReadingData] = useState(null); // Store cards, reading, and isUprights
  const [showInfo, setShowInfo] = useState(true); // Track visibility of the info section

  const handleNewReading = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/tarot-reading', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setReadingData(data);
    } catch (error) {
      console.error("Error fetching tarot reading:", error);
    }
  };

  return (
    <>
    <div className="h-screen">
      <main className="container mx-auto p-4">
        <div className="text-center mb-4">
          <div className="mb-6">
            <div className="flex justify-center">
              <img
                src={logo}
                alt=""
                className="w-48 h-48 object-contain drop-shadow-lg animate-pulse"
              />
            </div>
            <header className="py-6 text-center">
              <h1 className="text-2xl font-bold">Tarot Reading</h1>
            </header>
            <div className="container mx-auto">
            <h1 className={`text-center mb-2 max-w-lg mx-auto transition-opacity duration-1000 ease-in-out ${showInfo ? 'opacity-100' : 'opacity-0 hidden'}`}>                Tarot is an ancient practice of divination that dates back
                centuries, utilizing a deck of 78 beautifully illustrated cards
                to provide insight into your life’s journey. Tarot readings can help you explore your
                past, understand your present circumstances, and glimpse
                potential paths for your future. Click the
                button below to get your personalized reading and uncover what
                the cards have in store for you!
              </h1>
            </div>
          </div>
          <button onClick={() => { setShowInfo(false); setReadingData(null); handleNewReading(); }} className="btn btn-lg">            New Reading
          </button>
        </div>
        {readingData ? (
          <BasicReading
            cards={readingData.cards}
            reading={readingData.reading}
            isUprights={readingData.isUprights}
          />
        ) : (
          <p className="text-center text-xs">
            Click "New Reading" to get your cards.
          </p>
        )}
      </main>
    </div>
    </>
  );
}
