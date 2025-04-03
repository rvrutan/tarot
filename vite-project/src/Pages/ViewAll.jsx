import React, { useState, useEffect } from "react";
import SmallCard from "../components/SmallCard";
import Card from "../components/Card"; // Currently unused
import Modal from "../components/Modal";

export default function ViewAll() {
  const [readingData, setReadingData] = useState(null); // Stores cards, reading, and isUprights
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  // Fetch all card data on mount
  useEffect(() => {
    const fetchReadingData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/all-cards", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setReadingData(data);
      } catch (error) {
        console.error("Error fetching tarot reading:", error);
      }
    };

    fetchReadingData();
  }, []);

  // Show loading state while fetching
  if (!readingData) {
    return <div>Loading...</div>;
  }

  // Modal handlers
  const openModal = (card) => {
    setSelectedCard(card);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCard(null);
  };

  return (
    <div className="flex flex-wrap justify-around">
      {readingData.cards.map((card, index) => (
        <div
          key={index}
          className="group transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-2 cursor-pointer"
          onClick={() => openModal(card)}
        >
          <SmallCard card={card} />
        </div>
      ))}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedCard && (
          <div>
            <h2 className="text-xl font-bold mb-2">{selectedCard.name}</h2>
            <p className="text-gray-700">
              {selectedCard.meanings.light[0]}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}