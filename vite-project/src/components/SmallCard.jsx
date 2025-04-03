import React from "react";

const SmallCard = ({ card }) => {
  const imagePath = `${import.meta.env.BASE_URL}cards/${card.img}`;

  return (
    <div className="flex flex-wrap">
        <div className="card min-h-[210px] p-1 rounded-md flex flex-col items-center transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:-translate-y-2">
          <img
            src={imagePath}
            alt={card.name}
            className={`w-full h-auto rounded-md mb-2 transform`}
          />
        </div>
    </div>
  );
};

export default SmallCard;
