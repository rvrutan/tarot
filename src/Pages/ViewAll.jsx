import React, { useState, useEffect } from "react";
import SmallCard from "../components/SmallCard";

export default function ViewAll() {
  const [readingData, setReadingData] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
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

  const filteredCards = readingData.cards.filter((card) => {
    const lowerCaseName = card.name.toLowerCase();
    const lowerCaseSearch = searchTerm.toLowerCase();

    return (
      lowerCaseName.includes(lowerCaseSearch) ||
      (card.suit && card.suit.toLowerCase().includes(lowerCaseSearch)) ||
      card.number === searchTerm
    );
  });

  const handlePageChange = (page) => {
    setCurrentPage(page); // Change to the selected page in the modal
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 py-6">
      {/* Search Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 sm:mb-0">
          All Tarot Cards
        </h1>
        <div className="form-control w-full sm:w-96">
          <input
            type="text"
            placeholder="Search cards by name, number, or suit..."
            className="input input-bordered w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-4">
        {filteredCards.map((card, index) => (
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
          <div className="modal-box max-h-[90vh] overflow-y-auto z-50 relative bg-base-200 p-8 rounded-lg shadow-xl">
            <h2 className="text-3xl text-center font-bold mb-4">
              {selectedCard.name}
            </h2>
            <div className="flex justify-center mb-6">
              <img
                src={`${import.meta.env.BASE_URL}cards/${selectedCard.img}`}
                alt={selectedCard.name}
                className="w-32 sm:w-40 h-auto rounded-lg border border-gray-200 shadow-sm"
              />
            </div>

            {/* Tabs for page navigation */}
            <div className="tabs tabs-boxed justify-center mb-4">
              <a
                className={`tab cursor-pointer ${
                  currentPage === 1 ? "tab-active" : ""
                }`}
                onClick={() => handlePageChange(1)}
              >
                Fortune Telling / Keywords
              </a>
              <a
                className={`tab cursor-pointer ${
                  currentPage === 2 ? "tab-active" : ""
                }`}
                onClick={() => handlePageChange(2)}
              >
                Interpretations
              </a>
              <a
                className={`tab cursor-pointer ${
                  currentPage === 3 ? "tab-active" : ""
                }`}
                onClick={() => handlePageChange(3)}
              >
                More...
              </a>
            </div>

            {/* Conditional Rendering of Pages */}
            {currentPage === 1 && (
              <div className="space-y-4">
                {/* Fortune Telling Section */}
                <div>
                  <p className="text-left text-lg font-semibold">
                    Fortune Telling
                  </p>
                  <hr className="w-full bg-base-100 opacity-70 my-1" />
                  <ul className="list-disc list-inside">
                    {selectedCard.fortune_telling.map((fortune, index) => (
                      <li key={index}>{fortune}</li>
                    ))}
                  </ul>
                </div>

                {/* Keywords Section */}
                <div className="mt-4">
                  <p className="text-left text-lg font-semibold">Keywords</p>
                  <hr className="w-full bg-base-100 opacity-70 my-1" />
                  <ul className="list-disc list-inside">
                    {selectedCard.keywords.map((keyword, index) => (
                      <li key={index} className="capitalize">
                        {keyword}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {currentPage === 2 && (
              <div className="space-y-4">
                {/* Upright Interpretations Section */}
                <div>
                  <p className="text-left text-lg font-semibold">
                    Upright Interpretations
                  </p>
                  <hr className="w-full bg-base-100 opacity-70 my-1" />
                  <ul className="list-disc list-inside">
                    {selectedCard.meanings.light.map((meaning, index) => (
                      <li key={index}>{meaning}</li>
                    ))}
                  </ul>
                </div>

                {/* Reversed Interpretations Section */}
                <div className="mt-4">
                  <p className="text-left text-lg font-semibold">
                    Reversed Interpretations
                  </p>
                  <hr className="w-full bg-base-100 opacity-70 my-1" />
                  <ul className="list-disc list-inside">
                    {selectedCard.meanings.shadow.map((meaning, index) => (
                      <li key={index}>{meaning}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {currentPage === 3 && (
              <div className="space-y-4">
                {/* Mythical / Spiritual Section */}
                {selectedCard.Spiritual && (
                  <div>
                    <p className="text-left text-lg font-semibold">
                      Mythical / Spiritual
                    </p>
                    <hr className="w-full bg-base-100 opacity-70 my-1" />
                    <p>{selectedCard.Spiritual}</p>
                  </div>
                )}

                {/* Affirmation Section */}
                {selectedCard.Affirmation && (
                  <div className="mt-4">
                    <p className="text-left text-lg font-semibold">
                      Affirmation
                    </p>
                    <hr className="w-full bg-base-100 opacity-70 my-1" />
                    <p>{selectedCard.Affirmation}</p>
                  </div>
                )}

                {/* Questions to Ask Section */}
                <div className="mt-4">
                  <p className="text-left text-lg font-semibold">
                    Questions to Ask
                  </p>
                  <hr className="w-full bg-base-100 opacity-70 my-1" />
                  <ul className="list-disc list-inside">
                    {selectedCard.Questions.map((question, index) => (
                      <li key={index}>{question}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Close Button */}
            <div className="modal-action mt-6">
              <button
                className="btn btn-lg btn-primary w-full"
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