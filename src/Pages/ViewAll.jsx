import React, { useState, useEffect } from "react";
import SmallCard from "../components/SmallCard";

export default function ViewAll() {
  const [readingData, setReadingData] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [sortType, setSortType] = useState("number"); // Default sorting type
  const [currentPage, setCurrentPage] = useState(1); // State to track the active page in the modal

  useEffect(() => {
    const fetchReadingData = async () => {
      try {
        const response = await fetch(
          "https://tarot-reader-server-930bdc8d0742.herokuapp.com/api/all-cards"
        );
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

  const handlePageChange = (page) => {
    setCurrentPage(page); // Change to the selected page in the modal
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 py-6">
      {/* Sorting Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
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

      <div className="flex justify-center mb-4">
        <button
          className="btn"
          onClick={() => {
            const randomIndex = Math.floor(Math.random() * sortedCards.length);
            setSelectedCard(sortedCards[randomIndex]);
          }}
        >
          Pull a Card{" "}
        </button>
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
          <div className="modal-box max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl text-center font-bold mb-1">
              {selectedCard.name}
            </h2>
            <div className="flex justify-center mb-1">
              <img
                src={`${import.meta.env.BASE_URL}cards/${selectedCard.img}`}
                alt={selectedCard.name}
                className="w-32 sm:w-40 h-auto rounded-md"
              />
            </div>

            {/* Tabs for page navigation */}
            <div className="tabs tabs-boxed justify-center">
              <a
                className={`tab ${currentPage === 1 ? "tab-active" : ""}`}
                onClick={() => handlePageChange(1)}
              >
                Interpretations
              </a>
              <a
                className={`tab ${currentPage === 2 ? "tab-active" : ""}`}
                onClick={() => handlePageChange(2)}
              >
                Additional Info
              </a>

              <a
                className={`tab ${currentPage === 3 ? "tab-active" : ""}`}
                onClick={() => handlePageChange(3)}
              >
                Additional Info Cont'd
              </a>
            </div>

            {/* Conditional Rendering of Pages */}
            {currentPage === 1 && (
              <div>
                <p className="text-center modal-header">Fortune Telling</p>
                {selectedCard.fortune_telling.map((fortune, index) => (
                  <div key={index}>
                    <li>{fortune}</li>
                  </div>
                ))}
                <p className="text-center modal-header">Keywords</p>
                {selectedCard.keywords.map((keywords, index) => (
                  <div key={index}>
                    <li className="capitalize">{keywords}</li>
                  </div>
                ))}
              </div>
            )}

            {currentPage === 2 && (
              <div>
                <p className="text-center modal-header">
                  Upright Interpretations
                </p>
                {selectedCard.meanings.light.map((meaning, index) => (
                  <div key={index}>
                    <li>{meaning}</li>
                  </div>
                ))}
                <p className="text-center modal-header">
                  Reversed Interpretations
                </p>
                {selectedCard.meanings.shadow.map((meaning, index) => (
                  <div key={index}>
                    <li>{meaning}</li>
                  </div>
                ))}
              </div>
            )}

            {currentPage === 3 && (
              <div>
                {/* Conditionally render Mythical/Spiritual if it exists */}
                {selectedCard.Spiritual && (
                  <>
                    <p className="text-center modal-header">
                      Mythical/Spiritual
                    </p>
                    <p>{selectedCard.Spiritual}</p>
                  </>
                )}

                {/* Conditionally render Affirmation if it exists */}
                {selectedCard.Affirmation && (
                  <>
                    <p className="text-center modal-header">Affirmation</p>
                    <p className="text-center">{selectedCard.Affirmation}</p>
                  </>
                )}

                {/* Always render Questions to Ask since it exists on every card */}
                <p className="text-center modal-header">Questions to Ask</p>
                {selectedCard.Questions.map((questions, index) => (
                  <div key={index}>
                    <li>{questions}</li>
                  </div>
                ))}
              </div>
            )}

            {/* Close Button */}
            <div className="modal-action">
              <button
                className="btn text-xl"
                onClick={() => setSelectedCard(null)}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}
