import React from "react";

const SmallCard = ({ card }) => {
  const imagePath = `${import.meta.env.BASE_URL}cards/${card.img}`;

  return (
    
    <div className="flex flex-wrap">
      <div className="flex flex-col items-center ">
        <div className="badge badge-soft p-4 mt-10"><h1 className="text-xl">{card.name}</h1></div>
          <div className="card min-h-[210px] p-6 rounded-md flex flex-col items-center transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:-translate-y-2 w-60">
            <img
              src={imagePath}
              alt={card.name}
              className={`w-full h-auto rounded-md mb-3 transform`}
            />
          </div>
      </div>
    </div>
  );
};

export default SmallCard;
