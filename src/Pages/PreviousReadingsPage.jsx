import React, { useState, useEffect } from "react";
import BasicReading from "../components/BasicReading";

export default function PreviousReadingsPage() {
  const [savedReadings, setSavedReadings] = useState([]);
  const [selectedReading, setSelectedReading] = useState(null);

  // Load saved readings from localStorage
  useEffect(() => {
    const storedReadings =
      JSON.parse(localStorage.getItem("savedReadings")) || [];
    setSavedReadings(storedReadings);
  }, []);

  const handleSelectReading = (key) => {
    // Find the selected reading from saved readings
    const selected = savedReadings.find((reading) => reading.key === key);
    setSelectedReading(selected);
  };

  const handleRemoveReading = () => {
    // Retrieve existing saved readings
    const savedReadings =
      JSON.parse(localStorage.getItem("savedReadings")) || [];
    savedReadings.pop(selectedReading);

    localStorage.setItem("savedReadings", JSON.stringify(savedReadings));

    location.reload();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-center mb-6">Your Readings</h1>
      {/* Display a dropdown of saved readings */}
      <div className="mb-4 text-center">
        {savedReadings.length === 0 ? (
          <p>No saved readings.</p>
        ) : savedReadings.length >= 1 ? (
          <div className="form-control">
            <label className="label"></label>
            <select
              className="select select-bordered w-full max-w-xs mx-auto"
              onChange={(e) => handleSelectReading(e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>
                Choose a Reading
              </option>
              {savedReadings.map((reading) => (
                <option key={reading.key} value={reading.key}>
                  {reading.key}
                </option>
              ))}
            </select>
          </div>
        ) : null}
      </div>{" "}
      {/* Display the selected reading if any */}
      {selectedReading && (
        <div>
          <BasicReading
            cards={selectedReading.cards}
            reading={selectedReading.reading}
            isUprights={selectedReading.isUprights}
            onRevealComplete={() => {}}
          />
          <div className="text-center mt-4">
            <button onClick={handleRemoveReading} className="btn btn-xl">
              Remove Reading
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
