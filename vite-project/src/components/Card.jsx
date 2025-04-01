import React from 'react';

const Card = ({ card }) => {
  const imagePath = `${import.meta.env.BASE_URL}cards/${card.img}`;

  return (
    <div className="card shadow border border-gray-300 p-4 text-center rounded-lg text-black">
      {/* Card Name */}
      <h2 className="text-xl font-bold mb-2">{card.name}</h2>

      {/*Card Image*/}
      <img
        src={imagePath}
        alt={card.name}
        className="w=full h-auto round-md mb-2"
      />

      {/*Arcana and Suit side by side*/}
      <div className="flex justify-between font-bold mb-2 text-black">
        <span>{card.arcana}</span>
        <span>{card.suit}</span>
      </div>

      {/*Description using fortune_telling right now*/}
      <p className="italic text-black">{card.fortune_telling[0]}</p>
    </div>
  );
};

export default Card;
