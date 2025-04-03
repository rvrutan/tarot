import React, { useState, useEffect } from "react";
import SmallCard from "../components/SmallCard";

export default function ViewAll() {
  const [readingData, setReadingData] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    const fetchReadingData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/all-cards");
        const data = await response.json();
        setReadingData(data);
      } catch (error) {
        console.error("Error fetching tarot reading:", error);
      }
    };
    fetchReadingData();
  }, []);

  if (!readingData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-wrap justify-around">
      {readingData.cards.map((card, index) => (
        <div
          key={index}
          className="group transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-2 cursor-pointer"
          onClick={() => setSelectedCard(card)}
        >
          <SmallCard card={card} />
        </div>
      ))}

      {selectedCard && (
        <dialog id="modal" className="modal modal-open">
          <div className="modal-box">
            <h2 className="text-2xl text-center font-bold mb-2">{selectedCard.name}</h2>
            <p className="">{selectedCard.meanings.light.join(", ")}</p>
            <p className=" mt-2">{selectedCard.meanings.shadow.join(", ")}</p>
            <div className="modal-action">
              <button className="btn text-xl" onClick={() => setSelectedCard(null)}>Close</button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}