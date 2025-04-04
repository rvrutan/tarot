import React from "react";

const SmallCard = ({ card }) => {
  const imagePath = `${import.meta.env.BASE_URL}cards/${card.img}`;

  return (
    <div className="card bg-base-100 shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="card-body p-2 text-center">
        <h2 className="text-sm md:text-base font-semibold truncate">
          {card.name}
        </h2>
      </div>
      <figure className="px-2 pb-2">
        <img
          src={imagePath}
          alt={card.name}
          className="rounded-md w-full h-auto object-cover"
          loading="lazy"
        />
      </figure>
    </div>
  );
};

export default SmallCard;
