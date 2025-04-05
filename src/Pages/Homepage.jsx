import React, { useState } from "react";
import BasicReading from "../components/BasicReading";
import logo from "../assets/logo.png";
import Navbar from "../components/Navbar";

export default function Homepage() {
  const [readingData, setReadingData] = useState(null);
  const [showInfo, setShowInfo] = useState(true);
  const [infoFadeOut, setInfoFadeOut] = useState(false);
  const [shrinkLogo, setShrinkLogo] = useState(false);
  const [showNewReadingButton, setShowNewReadingButton] = useState(false);
  const [buttonFadeOut, setButtonFadeOut] = useState(false);
  

  const handleNewReading = async () => {
    // Start fade out animations
    setButtonFadeOut(true);
    setInfoFadeOut(true);
    
    // Wait for fade out animations to complete
    setTimeout(async () => {
      setShrinkLogo(true);
      setShowInfo(false);
      setReadingData(null);
      setShowNewReadingButton(false);

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
        setReadingData(data);
      } catch (error) {
        console.error("Error fetching tarot reading:", error);
      }
    }, 500); // Wait for fade out animation
  };

  const handleRevealComplete = () => {
    setButtonFadeOut(false);
    setInfoFadeOut(false);
    setShowNewReadingButton(true);
  };

  return (
    <>
      <div className="h-screen">
        <main
          className={`container mx-auto p-2 pt-16 transition-all duration-1000 ${
            shrinkLogo ? "translate-y-[-30px] sm:translate-y-[-50px]" : ""
          }`}
        >
          <div className="text-center mb-4">
            <div className="mb-4">
              <div className="flex justify-center">
                <img
                  src={logo}
                  alt="Logo"
                  className={`transition-all duration-1000 ${
                    shrinkLogo
                      ? "w-24 h-22 sm:w-22 sm:h-44 translate-y-[-30px] sm:translate-y-[-50px]"
                      : "w-32 h-32 sm:w-48 sm:h-48"
                  } object-contain drop-shadow-lg`}
                />
              </div>

              <div className="container mx-auto">
                {showInfo && (
                  <h1
                    className={`text-center mb-4 max-w-lg mx-auto transition-opacity duration-500 ${
                      infoFadeOut ? "opacity-0" : "opacity-100"
                    }`}
                  >
                   Tarot is an ancient practice of divination that dates back
                    centuries, utilizing a deck of 78 beautifully illustrated
                    cards to provide insight into your life's journey. Tarot
                    readings can help you explore your past, understand your
                    present circumstances, and glimpse potential paths for your
                    future. Click the button below to get your personalized
                    reading and uncover what the cards have in store for you!                  </h1>
                )}
              </div>
            </div>

            {!readingData && (
              <button 
                onClick={handleNewReading} 
                className={`btn btn-xl transition-opacity duration-500 ${
                  buttonFadeOut ? 'opacity-0' : 'opacity-100'
                }`}
              >
                New Reading
              </button>
            )}
          </div>

          {readingData ? (
            <BasicReading
              cards={readingData.cards}
              reading={readingData.reading}
              isUprights={readingData.isUprights}
              onRevealComplete={handleRevealComplete}
            />
          ) : (
            <p className="text-center text-xs "></p>
          )}

          {showNewReadingButton && (
            <div className="text-center mt-4">
              <button 
                onClick={handleNewReading} 
                className={`btn btn-xl transition-opacity duration-500 ${
                  buttonFadeOut ? 'opacity-0' : 'opacity-100'
                }`}
              >
                New Reading
              </button>
            </div>
          )}
        </main>
      </div>
    </>
  );
}