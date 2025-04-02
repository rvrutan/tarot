import React from "react";

// add props for reversed or upright
// add a prop for

const Card = ({ card, isUpright }) => {
  const imagePath = `${import.meta.env.BASE_URL}cards/${card.img}`;
  const meaningIndex = Math.floor(
    Math.random() * card.meanings[isUpright ? "light" : "shadow"].length
  );
  const meaning = card.meanings[isUpright ? "light" : "shadow"][meaningIndex];

  return (
    <div className="card shadow border p-4 text-center rounded-lg h-[1000px] flex flex-col items-center">
    {/* Card Name */}
    <h2 className="text-xl font-bold mb-2">{card.name}</h2>
    <h2 className={`badge badge-soft badge-lg p-4 flex items-center justify-center rounded-sm mb-4 w-full ${isUpright ? "invisible" : ""}`}>Reversed</h2>
    {console.log(isUpright)}
    {/* Card Image */}
    <img
      src={imagePath}
      alt={card.name}
      className={`w-full h-auto rounded-md mb-2 transform ${!isUpright ? "rotate-180" : ""}`}
    />
    {/* Arcana and Suit side by side */}
    <div className="p-4">
      <div className="text-xl font-bold mb-2 w-full">
        <span>{card.suit}</span>
      </div>
      {/* Description using Light = Upright, Dark = Reversed right now */}
      <p className="italic">{meaning}</p>
        </div>
    </div>
  );
};

export default Card;
