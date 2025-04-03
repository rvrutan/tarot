import React, { useState, useEffect } from "react";

const Card = ({ card, isUpright }) => {
  const [meaningIndex, setMeaningIndex] = useState(null);

  useEffect(() => {
    // Only set the meaningIndex when it's first rendered
    if (meaningIndex === null) {
      setMeaningIndex(Math.floor(Math.random() * card.meanings[isUpright ? "light" : "shadow"].length));
    }
  }, [meaningIndex, card, isUpright]); 

  const meaning = meaningIndex !== null ? card.meanings[isUpright ? "light" : "shadow"][meaningIndex] : "";

  return (
    <div className="card shadow p-16 text-center rounded-lg h-[1000px] flex flex-col items-center rotate-y-180">
      {/* Card Name */}
      <h2 className="text-xl font-bold mb-2">{card.name}</h2>
      <h2 className={`badge badge-soft badge-lg p-4 flex items-center justify-center rounded-sm mb-4 w-full ${isUpright ? "invisible" : ""}`}>Reversed</h2>

      {/* Card Image */}
      <img
        src={`${import.meta.env.BASE_URL}cards/${card.img}`}
        alt={card.name}
        className={`w-full h-auto rounded-md mb-2 transform ${!isUpright ? "rotate-180" : ""}`}
      />

      {/* Meaning */}
      <div className="p-4">
        <p className="italic">{meaning}</p>
      </div>
    </div>
  );
};

export default Card;