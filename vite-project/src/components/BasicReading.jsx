import React from 'react';
import Card from './Card';

const BasicReading = ({ cards }) => {
  const positions = ['Past', 'Present', 'Future'];

  // Coin flip function to determine if the card is upright
  const coinFlip = () => {
    let headsOrTails = Math.round(Math.random());
    return headsOrTails === 1; // Returns true for upright, false for reversed
  };

  return (
    <div className="flex justify-around items-stretch my-5">
      {cards.map((card, index) => {
        const isUpright = coinFlip(); // Call coinFlip inside the map method
        return (
          <div key={index} className="flex-1 mx-2">
            <h3 className="text-center text-lg font-semibold mb-2 text-black">
              {positions[index]}
            </h3>
            <Card card={card} isUpright={isUpright} />
          </div>
        );
      })}
    </div>
  );
};

export default BasicReading;
