import React from "react";

const SmallCard = ({ card }) => {
  const imagePath = `${import.meta.env.BASE_URL}cards/${card.img}`;

  return (
    <div className="card shadow border p-4 text-center rounded-lg h-[1000px] flex flex-col items-center">
      <img
        src={imagePath}
        alt={card.name}
        className={`w-full h-auto rounded-md mb-2 transform`}
      />
    </div>
  );
};

export default SmallCard;
