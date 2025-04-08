import React, { useState, useEffect, useRef } from "react";
import BasicReading from "../components/BasicReading";

export default function PreviousReadingsPage() {
  const [savedReadings, setSavedReadings] = useState([]);
  const [selectedReading, setSelectedReading] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const storedReadings =
      JSON.parse(localStorage.getItem("savedReadings")) || [];
    setSavedReadings(storedReadings);
  }, []);

  const handleSelectReading = (key) => {
    const selected = savedReadings.find((reading) => reading.key === key);
    setSelectedReading(selected);
    setIsRevealed(false);
    setIsOpen(false);
  };

  const handleRemoveReading = () => {
    const updatedReadings = savedReadings.filter(
      (reading) => reading.key !== selectedReading.key
    );
    localStorage.setItem("savedReadings", JSON.stringify(updatedReadings));
    setSavedReadings(updatedReadings);
    setSelectedReading(null);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-center mb-6">Your Readings</h1>
      <div className="mb-4 text-center">
        {savedReadings.length === 0 ? (
          <p>No saved readings.</p>
        ) : savedReadings.length >= 1 ? (
          <div className="relative w-64 mx-auto" ref={dropdownRef}>
            <button
              className="w-full rounded-md shadow-xl border py-2 px-4 text-left focus:outline-none focus:ring-2 "
              onClick={() => setIsOpen(!isOpen)}
            >
              {selectedReading ? selectedReading.key : "Choose a Reading"}
            </button>
            {isOpen && (
              <div className="absolute mt-1 w-full rounded-md ring-opacity-5 z-10">
                <ul className="py-1">
                  {savedReadings.map((reading) => (
                    <li
                      key={reading.key}
                      className="px-2 py-1 border bg-base-100  hover:bg-gray-700 md:hover:bg-transparent rounded-md cursor-pointer"
                      onClick={() => handleSelectReading(reading.key)}
                    >
                      {reading.key}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : null}
      </div>
      {selectedReading && (
        <div>
          <BasicReading
            cards={selectedReading.cards}
            reading={selectedReading.reading}
            isUprights={selectedReading.isUprights}
            onRevealComplete={() => setIsRevealed(true)}
          />
          {isRevealed && (
            <div className="text-center mt-4">
              <button onClick={handleRemoveReading} className="btn btn-xl">
                Remove Reading
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}