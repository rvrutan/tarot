import React, { useState } from "react";
import Card from "./Card";
import cardBackImage from "/public/cards/aa-tarot-card-back-removebg-preview.png"; 

const BasicReading = ({ cards, reading, isUprights }) => {
  const positions = ["Past", "Present", "Future"];
  const [revealed, setRevealed] = useState([false, false, false]);
  const [allRevealed, setAllRevealed] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0); // Track the currently revealed card

  const handleReveal = (index) => {
    const newRevealed = [...revealed];
    newRevealed[index] = true;
    setRevealed(newRevealed);
    
    setTimeout(() => {
      if (currentCardIndex < cards.length - 1) {
        setCurrentCardIndex(currentCardIndex + 1);
      }
    }, 500); // Delay between revealing each card

    if (newRevealed.every((r) => r)) {
      setTimeout(() => setAllRevealed(true), 500); // Delay text appearance after all cards are revealed
    }
  };

  return (
    <div>
      <div className="flex justify-around items-stretch my-10">
        {cards.map((card, index) => (
          <div key={index} className={`flex-1 mx-2 cursor-pointer transition-opacity duration-700 ${index <= currentCardIndex ? 'opacity-100' : 'opacity-0'}`} onClick={() => handleReveal(index)}>
            <div className="flex items-center justify-center rounded-sm  w-full">
              <h3 className="text-center text-xl font-semibold m-0">
                {positions[index]}
              </h3>
            </div>
            <div className={`transition-transform duration-700 ${revealed[index] ? "rotate-y-180" : ""}`}>
              {revealed[index] ? (
                <Card card={card} isUpright={isUprights[index]} />
              ) : (
                <img src={cardBackImage} alt="Card Back" className="" />
              )}
            </div>
          </div>
        ))}
      </div>
      {allRevealed && (
        <div className="p-4 opacity-0 transition-opacity duration-1000 ease-in border rounded text-center text-lg" style={{ opacity: allRevealed ? 1 : 0 }}>
          <h2 className="text-2xl font-semibold mb-2 text-center">Tarot Reading</h2>
          <p>{reading}</p>
        </div>
      )}
    </div>
  );
};

export default BasicReading;
