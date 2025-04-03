import React, { useState } from "react";
import Card from "./Card";
import cardBackImage from "/public/cards/aa-tarot-card-back-removebg-preview.png"; // Adjust the path if needed

const BasicReading = ({ cards, reading, isUprights }) => {
  const positions = ["Past", "Present", "Future"];
  const [revealed, setRevealed] = useState([false, false, false]);
  const [allRevealed, setAllRevealed] = useState(false);

  const handleReveal = (index) => {
    const newRevealed = [...revealed];
    newRevealed[index] = true;
    setRevealed(newRevealed);
    
    if (newRevealed.every((r) => r)) {
      setTimeout(() => setAllRevealed(true), 500); // Delay text appearance after all cards are revealed
    }
  };

  return (
    <div>
      <div className="flex justify-around items-stretch my-5">
        {cards.map((card, index) => (
          <div key={index} className="flex-1 mx-2 cursor-pointer" onClick={() => handleReveal(index)}>
            <div className="flex items-center justify-center rounded-sm mb-4 w-full">
              <h3 className="text-center text-xl font-semibold m-0">
                {positions[index]}
              </h3>
            </div>
            <div className={`transition-transform duration-700 ${revealed[index] ? "rotate-y-180" : ""}`}>
              {revealed[index] ? (
                <Card card={card} isUpright={isUprights[index]} />
              ) : (
                <img src={cardBackImage} alt="Card Back" className="w-full h-auto " />
              )}
            </div>
          </div>
        ))}
      </div>
      {allRevealed && (
        <div className="mt-5 p-4 opacity-0 transition-opacity duration-1000 ease-in border rounded" style={{ opacity: allRevealed ? 1 : 0 }}>
          <h2 className="text-xl font-semibold mb-3">Tarot Reading</h2>
          <p>{reading}</p>
        </div>
      )}
    </div>
  );
};

export default BasicReading;
