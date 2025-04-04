import React, { useState } from "react";
import BasicReading from "../components/BasicReading";
import logo from "../assets/logo.png";
import Navbar from "../components/Navbar";

export default function Homepage() {
  const [readingData, setReadingData] = useState(null); // Store cards, reading, and isUprights
  const [showInfo, setShowInfo] = useState(true); // Track visibility of the info section
  const [shrinkLogo, setShrinkLogo] = useState(false); // State to control logo size and position

  const handleNewReading = async () => {
    setShrinkLogo(true); // Shrink and move logo
    setShowInfo(false);
    setReadingData(null);

    try {
      const response = await fetch(
        "https://tarot-reader-server-930bdc8d0742.herokuapp.com/api/tarot-reading",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      setReadingData(data); // Set the response containing cards, reading, and isUprights
    } catch (error) {
      console.error("Error fetching tarot reading:", error);
    }
  };

  return (
    <>
      <div className="h-screen">
        <main
          className={`container mx-auto p-2 transition-all duration-1000 ${
            shrinkLogo ? "translate-y-[-50px]" : ""
          }`}
        >
          <div className="text-center mb-4">
            <div className="mb-4">
              <div className="flex justify-center">
                <img
                  src={logo}
                  alt="Logo"
                  className={`transition-all duration-1000 ${
                    shrinkLogo ? "w-22 h-22 translate-y-[-50px]" : "w-48 h-48"
                  } object-contain drop-shadow-lg`}
                />
              </div>

              <header className="text-center mb-2">
                <h1 className="text-2xl font-bold">Tarot Reading</h1>
              </header>

              <div className="container mx-auto">
                <h1
                  className={`text-center mb-4 max-w-lg mx-auto transition-opacity duration-10000 ease-in-out ${
                    showInfo ? "opacity-100" : "opacity-0 hidden"
                  }`}
                >
                  Tarot is an ancient practice of divination that dates back
                  centuries, utilizing a deck of 78 beautifully illustrated
                  cards to provide insight into your life’s journey. Tarot
                  readings can help you explore your past, understand your
                  present circumstances, and glimpse potential paths for your
                  future. Click the button below to get your personalized
                  reading and uncover what the cards have in store for you!{" "}
                </h1>
              </div>
            </div>

            <button
              onClick={() => {
                setShowInfo(false);
                setReadingData(null);
                handleNewReading();
              }}
              className="btn btn-xl"
            >
              New Reading
            </button>
          </div>

          {readingData ? (
            <BasicReading
              cards={readingData.cards}
              reading={readingData.reading}
              isUprights={readingData.isUprights}
            />
          ) : (
            <p className="text-center text-xs ">
              {/* Click "New Reading" to get your cards. */}
            </p>
          )}
        </main>
      </div>
    </>
  );
}
