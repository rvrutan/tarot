import React, { useState } from "react";
import BasicReading from "../components/BasicReading";
import logo from "../assets/logo.png";

export default function Homepage() {
  const [readingData, setReadingData] = useState(null);
  const [showInfo, setShowInfo] = useState(true);
  const [infoFadeOut, setInfoFadeOut] = useState(false);
  const [shrinkLogo, setShrinkLogo] = useState(false);
  const [showNewReadingButton, setShowNewReadingButton] = useState(false);
  const [buttonFadeOut, setButtonFadeOut] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(false);

  const handleNewReading = async () => {
    // Start fade out animations
    setButtonFadeOut(true);
    setInfoFadeOut(true);
    setTypingComplete(false);
    setButtonsVisible(false);

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
  };

  const handleTypingComplete = () => {
    setTypingComplete(true);
    setShowNewReadingButton(true);
    // Add a small delay before showing buttons to ensure smooth animation
    setTimeout(() => {
      setButtonsVisible(true);
    }, 100);
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
                    className={`text-center text-lg mb-4 max-w-lg mx-auto transition-opacity duration-500 mt-4 ${
                      infoFadeOut ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    Embark on a journey through the mystical world of Tarot, a
                    practice with roots tracing back to 15th-century Italy.
                    Initially used for games, the beautifully illustrated
                    78-card deck evolved into a powerful tool for divination,
                    offering profound insights into life's complexities. At
                    ForTune, we honor this rich history while embracing modern
                    trends and technology. Experience the ancient wisdom of the
                    Tarot as each card reveals its meaning, accompanied by a
                    musical chords associated with each card. Explore your past,
                    understand your present, and glimpse potential futures with
                    our personalized readings.{" "}
                  </h1>
                )}
              </div>
            </div>

            {!readingData && (
              <button
                onClick={handleNewReading}
                className={`btn btn-xl transition-all duration-500 ${
                  buttonFadeOut ? "opacity-0" : "opacity-100"
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
              onTypingComplete={handleTypingComplete}
            />
          ) : (
            <p className="text-center text-xs "></p>
          )}

          {showNewReadingButton && typingComplete && (
            <div
              className={`text-center transition-all duration-700 ease-out ${
                buttonsVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <button onClick={handleNewReading} className="btn btn-xl">
                New Reading
              </button>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
