import React, { useState, useEffect } from "react";
import Card from "./Card";
import Typewriter from "./Typewriter";
import cardBackImage from "/public/cards/aa2-tarot-card-back-removebg-preview.png";
import * as Tone from "tone";

const BasicReading = ({ cards, reading, isUprights, onRevealComplete, onTypingComplete }) => {
  const positions = ["Past", "Present", "Future"];
  const [revealed, setRevealed] = useState([false, false, false]);
  const [allRevealed, setAllRevealed] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [cardsVisible, setCardsVisible] = useState([false, false, false]);
  const [storeReading, setStoreReading] = useState([]);
  const [saveButtonVisible, setSaveButtonVisible] = useState(true);
  const [rotating, setRotating] = useState([false, false, false]);
  const [showFront, setShowFront] = useState([false, false, false]);
  const [typingComplete, setTypingComplete] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(false);

  const readingKey = cards.map((card) => card.name).join("-");

  useEffect(() => {
    const savedReadings = JSON.parse(localStorage.getItem("savedReadings")) || [];
    const readingExists = savedReadings.some((savedReading) => savedReading.key === readingKey);
    setSaveButtonVisible(!readingExists);
  }, [cards]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCardsVisible([true, false, false]);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleReveal = (index) => {
    const newRotating = [...rotating];
    newRotating[index] = true;
    setRotating(newRotating);

    if (cards[index].cardChord) {
      playChord(cards[index].cardChord);
    }

    setTimeout(() => {
      const newShowFront = [...showFront];
      newShowFront[index] = true;
      setShowFront(newShowFront);
    }, 500);

    setTimeout(() => {
      const newRevealed = [...revealed];
      newRevealed[index] = true;
      setRevealed(newRevealed);
      setRotating(newRotating.map((_, i) => i === index ? false : _));

      if (currentCardIndex < cards.length - 1) {
        setCurrentCardIndex(currentCardIndex + 1);
        setTimeout(() => {
          const newVisible = [...cardsVisible];
          newVisible[currentCardIndex + 1] = true;
          setCardsVisible(newVisible);
        }, 500);
      }

      if (newRevealed.every((r) => r)) {
        setTimeout(() => {
          setAllRevealed(true);
          if (onRevealComplete) onRevealComplete();
        }, 1000);
      }
    }, 1000);
  };

  const playChord = (chord) => {
    const notes = chord.map((note) => Tone.Frequency(note, "midi").toNote());
  
    const reverb = new Tone.Reverb({
      decay: 6,
      preDelay: 0.01,
      wet: 0.6,
    }).toDestination();
  
    reverb.generate();
  
    const chorus = new Tone.Chorus(4, 2.5, 0.3).start();
    chorus.wet.value = 0.5;
  
    const filter = new Tone.Filter(1000, "lowpass"); // roll off the high end, less harsh
  
    const synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "triangle" }, //can swap in sine, square, sawtooth, or triangle
      envelope: {
        attack: 1,
        decay: 0.5,
        sustain: 0.7,
        release: 8, // this is the big fade out part
      },
      volume: -24,
    }).chain(chorus, filter, reverb);
  
    // Start the chord
    synth.triggerAttack(notes);
  
    // Let it ring, then release
    setTimeout(() => {
      synth.triggerRelease(notes); // begins the fade-out
    }, 2000); // sustain for 3 seconds
  
    // Dispose everything a bit after release finishes
    setTimeout(() => {
      synth.dispose();
      chorus.dispose();
      filter.dispose();
      reverb.dispose();
    }, 5000); // give time for release to finish
  };
  
  const handleSaveReading = () => {
    const newReading = {
      key: readingKey, // Use the key made from the card names
      cards: cards,
      reading: reading,
      isUprights: isUprights,
    };

    // Retrieve existing saved readings
    const savedReadings = JSON.parse(localStorage.getItem("savedReadings")) || [];
    savedReadings.push(newReading);

    // Save updated readings to localStorage
    localStorage.setItem("savedReadings", JSON.stringify(savedReadings));

    // Hide the save button after saving
    setSaveButtonVisible(false);
  };

  const handleTypingComplete = () => {
    setTypingComplete(true);
    // Add a small delay before showing buttons to ensure smooth animation
    setTimeout(() => {
      setButtonsVisible(true);
    }, 500);
    if (onTypingComplete) {
      onTypingComplete();
    }
  };

  return (
    <div>
      <div className="flex justify-around items-stretch mt-10">
        {cards &&
          cards.map((card, index) => (
            <div
              key={index}
              className={`flex-1 mx-2 cursor-pointer transition-all duration-3000 ${
                cardsVisible[index]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-75"
              }`}
              onClick={() => handleReveal(index)}
            >
              <div className="flex flex-col items-center justify-center space-y-2">
                <h3 className="text-xl font-semibold">{positions[index]}</h3>
                <div
                  className={`transition-all duration-1000 ${
                    rotating[index] ? "rotate-y-112" : ""
                  }`}
                  style={{
                    transformStyle: "preserve-3d",
                    perspective: "1000px",
                  }}
                >
                  {!showFront[index] ? (
                    <div className="backface-hidden">
                      <img 
                        src={cardBackImage} 
                        alt="Card Back" 
                        className="w-32 sm:w-40 h-auto rounded-md mb-3 sm:mb-2 mt-0 sm:mt-6" 
                      />
                    </div>
                  ) : (
                    <div className="backface-hidden">
                      <Card card={card} isUpright={isUprights[index]} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
      {allRevealed && (
        <div
          className="p-4 opacity-0 transform translate-y-4 transition-all duration-1000 ease-out text-center text-lg"
          style={{ 
            opacity: allRevealed ? 1 : 0,
            transform: allRevealed ? 'translateY(0)' : 'translateY(4)'
          }}
        >
          <h2 className="text-2xl font-semibold mb-1 text-center">
            Tarot Reading
          </h2>
          <p className="opacity-0 transition-opacity duration-1000 delay-500"
             style={{ opacity: allRevealed ? 1 : 0 }}>
            <Typewriter 
              text={reading} 
              speed={50} 
              delay={500} 
              onComplete={handleTypingComplete}
            />
          </p>
          {saveButtonVisible && typingComplete && (
            <div className={`text-center mt-4 transition-all duration-700 ease-out ${
              buttonsVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-8"
            }`}>
              <button onClick={handleSaveReading} className="btn btn-xl mb-4">
                Save This Reading
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BasicReading;