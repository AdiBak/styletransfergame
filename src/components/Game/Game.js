// Game.js
import React, { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import "./Game.css";

const IntroVideo = ({ onSkip, onVideoEnd }) => {
  const videoRef = useRef(null);
  const [videoStarted, setVideoStarted] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setVideoStarted(true);
    }
  };

  const handleVideoEnd = () => {
    setVideoEnded(true);
  };

  return (
    <div className="video-overlay">
      <video ref={videoRef} className="intro-video" onEnded={handleVideoEnd} controls>
        <source src="intro-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {!videoStarted && (
        <button className="video-play-button" onClick={handlePlayVideo}>
          ▶
        </button>
      )}

      <button className="video-skip-button" onClick={onSkip}>
        ✖
      </button>

      {videoEnded && (
        <button className="video-start-button" onClick={onVideoEnd}>
          Play
        </button>
      )}
    </div>
  );
};

const HelpMenu = ({ onClose }) => {
  return (
    <div className="help-overlay">
      <div className="help-window">
        <button className="help-close-button" onClick={onClose}>✖</button>
        <h2>Help & How to Play</h2>

        {/* How to Play Section */}
        <section className="help-section">
          <h3>How to Play</h3>
          <p><strong>Select the correct pair of images that were used to generate the displayed <em>stylized image</em>.</strong></p>
          <ul>
            <li>You will see a stylized image on the left.</li>
            <li>Choose the two images that match the original pair of images.</li>
            <li>If correct, you move to the next round! 🎉</li>
            <li>If wrong, try again!</li>
            <li>You have 30 seconds per round.</li>
          </ul>

          {/* Embedded Demo Video */}
          <div className="help-video-container">
            <video controls>
              <source src="demo-play.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>

        {/* What is Style Transfer Section */}
        <section className="help-section">
          <h3>What is Style Transfer?</h3>
          <p>Style transfer is a deep learning technique that applies the artistic style of one image to another content image. <br />
            For example, it can make a photograph look like a Van Gogh painting! <br />
            Below, see how the result preserves the mountain from the content image, and colors it like the style image?</p>

          {/* Example Images */}
          <div className="style-transfer-example">
            <div className="st-image-container">
              <img src="https://aasraecotreks.com.np/wp-content/uploads/2019/01/Island-Peak.jpg" alt="Island Peak" />
              <p className="st-caption">Original Content</p>
            </div>
            <div className="st-image-container">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1200px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg" alt="Starry Night" />
              <p className="st-caption">Style Image</p>
            </div>
            <div className="st-image-container">
              <img src="https://i.ibb.co/HsbtQDp/Screenshot-2025-03-25-at-3-44-53-PM.png" alt="Stylized Example" />
              <p className="st-caption">Stylized Result</p>
            </div>
          </div>

          <p><em>Look for shapes, textures, colors, layouts – any aspects of the stylized image that look similar to 2 of the image choices.</em></p>
        </section>
        
        {/* Credits Section */}
        <section className="help-section">
          <h3>Credits</h3>
          <p>🎨 <em>Style Transfer Model:</em> <a href="https://github.com/crowsonkb/style-transfer-pytorch" target="_blank">PyTorch Style Transfer</a></p>
          <p>🖼️ <em>Image Datasets Used:</em></p>
          <ul>
            <li><a href="https://www.kaggle.com/datasets/robgonsalves/impressionistlandscapespaintings" target="_blank">Impressionist Landscapes Paintings</a></li>
            <li><a href="https://www.kaggle.com/arnaud58/landscape-pictures" target="_blank">Landscape Pictures</a></li>
            <li><a href="https://www.kaggle.com/datasets/heyitsfahd/paintings" target="_blank">Paintings Dataset</a></li>
            <li><a href="https://www.kaggle.com/datasets/jeremycmorgan/photgraphs-of-1000-u-s-cities-ai-generated/" target="_blank">AI-Generated U.S. Cities Photographs</a></li>
          </ul>
        </section>
      </div>
    </div>
  );
};

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
            <p className="process-step-label">Process Step {currentImageIndex + 1}</p>
            {processImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Process step ${index + 1}`}
                className="process-image"
                style={{
                  opacity: currentImageIndex === index ? 1 : 0,
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
  const [showIntro, setShowIntro] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [stylizedImage, setStylizedImage] = useState("");
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [correctContent, setCorrectContent] = useState("");
  const [correctStyle, setCorrectStyle] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [showVisualization, setShowVisualization] = useState(false);
  const [processImages, setProcessImages] = useState([]);
  const [message, setMessage] = useState("");
  const [isNextRoundEnabled, setIsNextRoundEnabled] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [gamePaused, setGamePaused] = useState(false);

  // Timer state variables
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [timerActive, setTimerActive] = useState(false);
  const timerRef = useRef(null);

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

      // Reset and start timer
      setTimeRemaining(30);
      setTimerActive(true);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();

    // Cleanup timer on component unmount
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startGame = () => {
    setShowIntro(false);
    setGameStarted(true);  // Game officially starts
    setTimeRemaining(30);  // Reset timer to 30 seconds
    setTimerActive(true);  // Start timer countdown
  };

  const toggleHelp = () => {
    setShowHelp(!showHelp);
    setGamePaused(!gamePaused);
  };

  // timer
  useEffect(() => {
    if (gameStarted && timerActive && timeRemaining > 0 && !gamePaused) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      handleTimeUp();
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameStarted, timerActive, timeRemaining, gamePaused]); // 🔹 Now depends on `gamePaused`


  // Calculate timer color based on time remaining
  const getTimerColor = () => {
    if (timeRemaining > 20) return '#28a745'; // Green
    if (timeRemaining > 10) return '#ffc107'; // Yellow
    return '#dc3545'; // Red
  };

  // Handle time up
  const handleTimeUp = () => {
    setTimerActive(false);
    setIsNextRoundEnabled(true);

    // Highlight correct answers
    const correctPair = [correctContent, correctStyle];
    highlightCorrectAnswers(correctPair);

    setMessage("Time's up! These are the correct options.");
  };

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleImageClick = (option) => {
    if (!timerActive || selectedImages.includes(option) || isNextRoundEnabled) return;

    const newSelectedImages = [...selectedImages, option];
    setSelectedImages(newSelectedImages);

    if (newSelectedImages.length === 2) {
      setTimeout(() => checkGuess(newSelectedImages), 200); // Small delay to ensure the selection effect appears
    }
  };

  const checkGuess = (guessedPair) => {
    const isCorrect =
      guessedPair.includes(correctContent) && guessedPair.includes(correctStyle);

    // Remove selected state from all images first
    document.querySelectorAll(".option-image").forEach((img) => {
      img.classList.remove("selected");
    });

    if (isCorrect) {
      highlightImages(guessedPair, "correct");
      setMessage("Correct! You've identified both the content and style images.");
      triggerConfetti();
      setIsNextRoundEnabled(true);
      setTimerActive(false); // Stop the timer
    } else {
      highlightImages(guessedPair, "incorrect");
      shakeImages(guessedPair);
      setMessage("Incorrect. Try again!");
      setTimeout(() => resetBorders(), 1000);
    }
  };

  const highlightCorrectAnswers = (correctPair) => {
    document.querySelectorAll(".option-image").forEach((img) => {
      if (correctPair.includes(img.src)) {
        img.classList.add("correct");
      } else {
        img.classList.add("fade-out");
      }
    });
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
      {showIntro ? (
        <IntroVideo onSkip={startGame} onVideoEnd={startGame} />
      ) : (
        <>
          {/* Help Button */}
          <button className="help-button" onClick={toggleHelp}>?</button>

          {/* Help Menu */}
          {showHelp && <HelpMenu onClose={toggleHelp} />}

          {!gamePaused && (
            <>
              <div className="stylized-container">
                <img src={stylizedImage} alt="Stylized Result" />
              </div>
              <div className="game-phrase">Spot the Style and Content!</div>

              {/* Timer bar */}
              <div className="timer-container">
                <div
                  className="timer-bar"
                  style={{
                    height: `${(timeRemaining / 30) * 100}%`,
                    backgroundColor: getTimerColor()
                  }}
                />
                <div className="timer-text">{timeRemaining}</div>
              </div>

              <div className="options-container">
                <div className="image-grid">
                  {shuffledOptions.map((option, index) => (
                    <img
                      key={index}
                      src={option}
                      alt={`Option ${index + 1}`}
                      className={`option-image ${selectedImages.includes(option) ? "selected" : ""}`}
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
                      Show Me How
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
          )}

        </>
      )}
    </div>
  );
};

export default Game;