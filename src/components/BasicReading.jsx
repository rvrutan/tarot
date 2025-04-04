import React, { useState, useEffect } from "react";
import Card from "./Card";
import cardBackImage from "/public/cards/aa-tarot-card-back-removebg-preview.png";
import * as Tone from "tone";

const BasicReading = ({ cards, reading, isUprights, onRevealComplete }) => {
  const positions = ["Past", "Present", "Future"];
  const [revealed, setRevealed] = useState([false, false, false]);
  const [allRevealed, setAllRevealed] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [cardsVisible, setCardsVisible] = useState([false, false, false]);

  // Add entrance animation for cards
  useEffect(() => {
    const timer = setTimeout(() => {
      setCardsVisible([true, false, false]);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleReveal = (index) => {
    const newRevealed = [...revealed];
    newRevealed[index] = true;
    setRevealed(newRevealed);

    // Play chord after revealing a card
    if (cards[index].cardChord) {
      playChord(cards[index].cardChord);
    }

    setTimeout(() => {
      if (currentCardIndex < cards.length - 1) {
        setCurrentCardIndex(currentCardIndex + 1);
        // Show next card with a delay
        setTimeout(() => {
          const newVisible = [...cardsVisible];
          newVisible[currentCardIndex + 1] = true;
          setCardsVisible(newVisible);
        }, 500);
      }
    }, 1500); // Increased delay between revealing each card

    if (newRevealed.every((r) => r)) {
      setTimeout(() => {
        setAllRevealed(true);
        if (onRevealComplete) onRevealComplete();
      }, 1000); // Increased delay for text appearance
    }
  };

  const playChord = (chord) => {
    // Convert note numbers to Tone.js Note strings
    const notes = chord.map((note) => Tone.Frequency(note, "midi").toNote());

    // Create a new synth and apply volume control
    const synth = new Tone.PolySynth(Tone.Synth).toDestination();

    // Reduce the volume to 50% (approximately -6 dB)
    synth.set({
      volume: -24, // Reduces the volume by 50%
    });

    // Play the chord
    synth.triggerAttack(notes);

    // Stop the chord after 2 seconds
    setTimeout(() => {
      synth.triggerRelease(notes);
    }, 2000);
  };

  return (
    <div>
      <div className="flex justify-around items-stretch my-10">
        {cards &&
          cards.map((card, index) => (
            <div
              key={index}
              className={`flex-1 mx-2 cursor-pointer transition-all duration-1000 ${
                cardsVisible[index]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              onClick={() => handleReveal(index)}
            >
              <div className="flex flex-col items-center justify-center space-y-2">
                <h3 className="text-xl font-semibold">{positions[index]}</h3>
                <div
                  className={`transition-all duration-1000 ${
                    revealed[index] ? "rotate-y-180" : ""
                  }`}
                >
                  {revealed[index] ? (
                    <Card card={card} isUpright={isUprights[index]} />
                  ) : (
                    <img src={cardBackImage} alt="Card Back" className="w-79" />
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
      {allRevealed && (
        <div
          className="p-4 opacity-0 transition-opacity duration-1000 ease-in border rounded text-center text-lg"
          style={{ opacity: allRevealed ? 1 : 0 }}
        >
          <h2 className="text-2xl font-semibold mb-2 text-center">
            Tarot Reading
          </h2>
          <p>{reading}</p>
        </div>
      )}
    </div>
  );
};

export default BasicReading;
