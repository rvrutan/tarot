import React, { useState, useEffect } from "react";

const Card = ({ card, isUpright }) => {
  const [meaningIndex, setMeaningIndex] = useState(null);

  useEffect(() => {
    if (meaningIndex === null) {
      setMeaningIndex(
        Math.floor(
          Math.random() * card.meanings[isUpright ? "light" : "shadow"].length
        )
      );
    }
  }, [meaningIndex, card, isUpright]);

  const meaning =
    meaningIndex !== null
      ? card.meanings[isUpright ? "light" : "shadow"][meaningIndex]
      : "";

  return (
    <div className="sm:p-6 text-center rounded-lg flex flex-col items-center ">
      <img
        src={`${import.meta.env.BASE_URL}cards/${card.img}`}
        alt={card.name}
        className={`w-32 sm:w-40 h-auto rounded-md mb-3 sm:mb-2 transform ${
          !isUpright ? "rotate-180" : ""
        }`}
      />
      <h2 className="text-lg sm:text-xl font-bold mb-2 break-words">{card.name}</h2>
      <h2
        className={`badge badge-soft badge-lg p-2 flex items-center justify-center rounded-sm mb-1 sm:mb-1 w-24 sm:w-32 ${
          isUpright ? "invisible" : ""
        }`}
      >
        Reversed
      </h2>
      <div className="p-2 sm:block hidden">
        <p className="italic text-sm sm:text-base break-words">{meaning}</p>
      </div>
    </div>
  );
};

export default Card;