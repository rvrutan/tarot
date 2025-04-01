import React from 'react';
import Card from './Card';

const BasicReading = ({ cards }) => {
  const positions = ['Past', 'Present', 'Future'];

  return (
    <div className="flex justify-around items-stretch my-5">
      {cards.map((card, index) => (
        <div key={index} className="flex-1 mx-2">
          <h3 className="text-center text-lg font-semibold mb-2">
            {positions[index]}
          </h3>
          <Card card={card} />
        </div>
      ))}
    </div>
  );
};

export default BasicReading;
