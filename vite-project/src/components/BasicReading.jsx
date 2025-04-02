import React from 'react';
import Card from './Card';

const BasicReading = ({ cards, reading, isUprights }) => {
  const positions = ['Past', 'Present', 'Future'];

  return (
    <div>
      <div className="flex justify-around items-stretch my-5">
        {cards.map((card, index) => (
          <div key={index} className="flex-1 mx-2">
            <h3 className="text-center text-lg font-semibold mb-2">
              {positions[index]}
            </h3>
            <Card card={card} isUpright={isUprights[index]} />
          </div>
        ))}
      </div>
      {reading && (
        <div className="mt-5 p-4 border rounded">
          <h2 className="text-xl font-semibold mb-3">Tarot Reading:</h2>
          <p>{reading}</p>
        </div>
      )}
    </div>
  );
};

export default BasicReading;
