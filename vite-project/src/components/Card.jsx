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
    <div className="card shadow border border-gray-300 p-4 text-center rounded-lg text-black">
      {/* Card Name */}
      <h2 className="text-xl font-bold mb-2">{card.name}</h2>
      <h2 className={`text-xl font-bold mb-2 ${!isUpright ? "" : "hidden"}`}>Reversed</h2>
      {console.log(isUpright)}

      {/*Card Image*/}

      <img
        src={imagePath}
        alt={card.name}
        className={`w-full h-auto rounded-md mb-2 transform ${
          !isUpright ? "rotate-180" : ""
        }`}
      />

      {/*Arcana and Suit side by side*/}
      <div className="flex justify-between font-bold mb-2 text-black">
        <span>{card.arcana}</span>
        <span>{card.suit}</span>
      </div>

      {/*Description using Light = Upright, Dark = Reversed right now*/}
      <p className="italic text-black">{meaning}</p>
    </div>
  );
};

export default Card;
