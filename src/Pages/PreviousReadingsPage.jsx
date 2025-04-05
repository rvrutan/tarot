import React, { useState, useEffect } from "react";
import BasicReading from "../components/BasicReading";

export default function PreviousReadingsPage() {
  const [savedReadings, setSavedReadings] = useState([]);
  const [selectedReading, setSelectedReading] = useState(null);

  // Load saved readings from localStorage
  useEffect(() => {
    const storedReadings = JSON.parse(localStorage.getItem("savedReadings")) || [];
    setSavedReadings(storedReadings);
  }, []);

  const handleSelectReading = (key) => {
    // Find the selected reading from saved readings
    const selected = savedReadings.find((reading) => reading.key === key);
    setSelectedReading(selected);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-center mb-6">Previous Tarot Readings</h1>

      {/* Display a list of saved readings */}
      <div className="mb-4">
        {savedReadings.length === 0 ? (
          <p>No saved readings found.</p>
        ) : (
          <ul>
            {savedReadings.map((reading) => (
              <li key={reading.key} className="mb-2">
                <button
                  onClick={() => handleSelectReading(reading.key)}
                  className="btn btn-sm btn-outline"
                >
                  {reading.key} {/* Display the key (card names) */}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Display the selected reading if any */}
      {selectedReading && (
        <div>
          <BasicReading
            cards={selectedReading.cards}
            reading={selectedReading.reading}
            isUprights={selectedReading.isUprights}
            onRevealComplete={() => {}}
          />
        </div>
      )}
    </div>
  );
}
