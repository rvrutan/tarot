import React, { useState, useEffect } from "react";
import SmallCard from "../components/SmallCard";

export default function ViewAll() {
  const [readingData, setReadingData] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [sortType, setSortType] = useState("number"); // Default sorting type

  useEffect(() => {
    const fetchReadingData = async () => {
      try {
        const response = await fetch("https://tarot-reader-server-930bdc8d0742.herokuapp.com/api/all-cards");
        const data = await response.json();
        setReadingData(data);
      } catch (error) {
        console.error("Error fetching tarot reading:", error);
      }
    };
    fetchReadingData();
  }, []);

  // LOADING MESSAGE
  if (!readingData) {
    return <div>Loading...</div>;
  }

  // Sorting logic
  const sortedCards = [...readingData.cards].sort((a, b) => {
    if (sortType === "number") {
      // Major Arcana first
      if (a.arcana === "Major Arcana" && b.arcana !== "Major Arcana") {
        return -1;
      }
      if (a.arcana !== "Major Arcana" && b.arcana === "Major Arcana") {
        return 1;
      }
      // If both are Major or both are Minor, sort by number
      return parseInt(a.number) - parseInt(b.number);
    }
    if (sortType === "suit") {
      return a.suit.localeCompare(b.suit);
    }
    if (sortType === "arcana") {
      return a.arcana.localeCompare(b.arcana);
    }
    return 0;
  });
  

  return (
    <div>
      {/* Sorting Dropdown */}
      <div className="flex justify-end my-4 pt-4 pb-4 pr-[40px]">
        <select
          className="border p-2 rounded"
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="number">Number</option>
          <option value="suit">Suit</option>
          <option value="arcana">Arcana</option>
        </select>
      </div>

      {/* Card Grid */}
      <div className="flex flex-wrap justify-around">
        {sortedCards.map((card, index) => (
          <div
            key={index}
            className="group transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-2 cursor-pointer"
            onClick={() => setSelectedCard(card)}
          >
            <SmallCard card={card} />
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedCard && (
        <dialog id="modal" className="modal modal-open">
          <div className="modal-box">
            <h2 className="text-2xl text-center font-bold mb-2">{selectedCard.name}</h2>
            <p>{selectedCard.meanings.light.join(", ")}</p>
            <p className="mt-2">{selectedCard.meanings.shadow.join(", ")}</p>
            <div className="modal-action">
              <button className="btn text-xl" onClick={() => setSelectedCard(null)}>Close</button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}
