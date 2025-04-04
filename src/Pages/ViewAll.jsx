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
    <div className="container mx-auto px-2 sm:px-4 py-6">
      {/* Sorting Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 sm:mb-0">
          All Tarot Cards
        </h1>
        <div className="form-control w-full sm:w-auto">
          <select
            className="select select-bordered w-full sm:w-48"
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="number">Number</option>
            <option value="suit">Suit</option>
            <option value="arcana">Arcana</option>
          </select>
        </div>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-4">
        {sortedCards.map((card, index) => (
          <div
            key={index}
            onClick={() => setSelectedCard(card)}
            className="cursor-pointer hover:scale-105 transition-transform duration-300"
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
            <p className="mt-2 text-center">{selectedCard.meanings.shadow.join(", ")}</p>
            <div className="modal-action">
              <button className="btn text-xl" onClick={() => setSelectedCard(null)}>Close</button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}
