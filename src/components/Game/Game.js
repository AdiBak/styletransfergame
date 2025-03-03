// Game.js
import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import "./Game.css";

const ProcessVisualization = ({ contentImage, styleImage, stylizedImage, processImages, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        if (prevIndex === processImages.length - 1) {
          setIsPlaying(false);
          return prevIndex;
        }
        return prevIndex + 1;
      });
    }, 400);

    return () => clearInterval(interval);
  }, [isPlaying, processImages.length]);

  const handleReplay = () => {
    setCurrentImageIndex(0);
    setIsPlaying(true);
  };

  return (
    <div className="visualization-overlay">
      <div className="visualization-window">
        <button className="close-button" onClick={onClose}>×</button>
        <div className="visualization-content">
          <div className="image-row">
            <div className="image-column">
              <p>Content Image</p>
              <img src={contentImage} alt="Content" className="side-image" />
            </div>
            <div className="image-column">
              <p>Style Image</p>
              <img src={styleImage} alt="Style" className="side-image" />
            </div>
            <div className="image-column">
              <p>Stylized Image</p>
              <img src={stylizedImage} alt="Stylized" className="side-image" />
            </div>
          </div>
          <div className="process-animation">
            {processImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Process step ${index + 1}`}
                className="process-image"
                style={{
                  opacity: currentImageIndex === index ? 1 : 0,
                  transition: 'opacity 0.5s ease-in-out',
                }}
              />
            ))}
          </div>
          <button onClick={handleReplay} className={`replay-button ${!isPlaying ? 'visible' : ''}`}>
            Replay Process
          </button>
        </div>
      </div>
    </div>
  );
};

const Game = () => {
  const [stylizedImage, setStylizedImage] = useState("");
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [correctContent, setCorrectContent] = useState("");
  const [correctStyle, setCorrectStyle] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [showVisualization, setShowVisualization] = useState(false);
  const [processImages, setProcessImages] = useState([]);
  const [message, setMessage] = useState("");
  const [isNextRoundEnabled, setIsNextRoundEnabled] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch("image_relations.json");
      const data = await response.json();

      const keys = Object.keys(data);
      const randomIndex = Math.floor(Math.random() * keys.length);
      const selectedEntry = data[keys[randomIndex]];

      const [options, processImages] = selectedEntry;
      const [contentUrl, styleUrl, randomOption1, randomOption2] = options;

      setStylizedImage(keys[randomIndex]);
      setCorrectContent(contentUrl);
      setCorrectStyle(styleUrl);
      setShuffledOptions(shuffle([contentUrl, styleUrl, randomOption1, randomOption2]));
      setSelectedImages([]);
      setProcessImages(processImages[0]);
      setMessage("");
      setIsNextRoundEnabled(false);
      resetBorders();

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleImageClick = (option) => {
    if (selectedImages.includes(option)) return;

    const newSelectedImages = [...selectedImages, option];
    setSelectedImages(newSelectedImages);

    if (newSelectedImages.length === 2) {
      checkGuess(newSelectedImages);
    }
  };

  const checkGuess = (guessedPair) => {
    const isCorrect =
      guessedPair.includes(correctContent) && guessedPair.includes(correctStyle);

    if (isCorrect) {
      highlightImages(guessedPair, "correct");
      setMessage("Correct! You've identified both the content and style images.");
      triggerConfetti();
      setIsNextRoundEnabled(true);
    } else {
      highlightImages(guessedPair, "incorrect");
      shakeImages(guessedPair);
      setMessage("Incorrect. Try again!");
      setTimeout(() => resetBorders(), 1000);
    }
  };

  const handleShowMeHow = () => {
    setShowVisualization(true);
  };

  const closeVisualization = () => {
    setShowVisualization(false);
  };

  const handleNextRound = () => {
    fetchData();
  };

  const highlightImages = (images, className) => {
    document.querySelectorAll(".option-image").forEach((img) => {
      if (images.includes(img.src)) {
        img.classList.add(className);
      }
    });
  };

  const shakeImages = (images) => {
    document.querySelectorAll(".option-image").forEach((img) => {
      if (images.includes(img.src)) {
        img.classList.add("shake");
      }
    });
  };

  const resetBorders = () => {
    document.querySelectorAll(".option-image").forEach((img) => {
      img.classList.remove("correct", "incorrect", "shake", "fade-out");
    });
    setSelectedImages([]);
    setMessage("");
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 150,
      origin: { y: 0 },
      colors: ["#ff0", "#0f0", "#00f", "#f00", "#0ff"],
    });
  };

  return (
    <div className="game-container">
      {stylizedImage && shuffledOptions.length > 0 ? (
        <>
          <div className="stylized-container">
            <img src={stylizedImage} alt="Stylized Result" />
          </div>
          <div className="game-phrase">Spot the Style and Content!</div>
          <div className="options-container">
            <div className="image-grid">
              {shuffledOptions.map((option, index) => (
                <img
                  key={index}
                  src={option}
                  alt={`Option ${index + 1}`}
                  className="option-image"
                  onClick={() => handleImageClick(option)}
                />
              ))}
            </div>
          </div>
          {message && (
            <div className="message">
              {message}
              {isNextRoundEnabled && (
                <button className="show-me-how" onClick={handleShowMeHow}>
                  show me how
                </button>
              )}
            </div>
          )}

          {showVisualization && (
            <ProcessVisualization
              contentImage={correctContent}
              styleImage={correctStyle}
              stylizedImage={stylizedImage}
              processImages={processImages}
              onClose={closeVisualization}
            />
          )}

          <button
            className={`next-round-button ${isNextRoundEnabled ? "active" : ""}`}
            onClick={handleNextRound}
            disabled={!isNextRoundEnabled}
          >
            Next Round
          </button>
        </>
      ) : (
        <p>Loading game data...</p>
      )}
    </div>
  );
};

export default Game;