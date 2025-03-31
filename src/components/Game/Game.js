// Game.js
import React, { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { FaGithub } from "react-icons/fa"; // Import GitHub icon
import "./Game.css";

const IntroVideo = ({ onSkip, onVideoEnd }) => {
  const videoRef = useRef(null);                               // video reference
  const [videoStarted, setVideoStarted] = useState(false);     // video started flag
  const [videoEnded, setVideoEnded] = useState(false);         // video ended flag
 
  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();                                // play video and set started flag
      setVideoStarted(true);
    }
  };

  const handleVideoEnd = () => {
    setVideoEnded(true);                                      // set ended flag
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
        <h2>Game Information</h2>

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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);    // first image in process shows first
  const [isPlaying, setIsPlaying] = useState(true);                 // playing flag

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        if (prevIndex === processImages.length - 1) {    // if end of process images reached, set flag false and return last index
          setIsPlaying(false);
          return prevIndex;                                           
        }
        return prevIndex + 1;                            // else, increment index (show next image in process)
      });
    }, 400);

    return () => clearInterval(interval);
  }, [isPlaying, processImages.length]);

  const handleReplay = () => {
    setCurrentImageIndex(0);       // reset index and flag
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
  const [showIntro, setShowIntro] = useState(true);                       // intro video
  const [gameStarted, setGameStarted] = useState(false);                  // game started flag (prevents timer from running during intro video)
  
  const [stylizedImage, setStylizedImage] = useState("");                 // stylized (result) image
  const [shuffledOptions, setShuffledOptions] = useState([]);             // image options to choose from
  const [correctContent, setCorrectContent] = useState("");               // correct content image
  const [correctStyle, setCorrectStyle] = useState("");                   // correct style image
  const [selectedImages, setSelectedImages] = useState([]);               // tracks selected images
  
  const [showVisualization, setShowVisualization] = useState(false);      // visualization window (to show how result formed)
  const [processImages, setProcessImages] = useState([]);                 // images to show for visualization
  
  const [message, setMessage] = useState("");                             // message shown after user guesses 2 images
  
  const [isNextRoundEnabled, setIsNextRoundEnabled] = useState(false);    // next round activation
  
  const [showHelp, setShowHelp] = useState(false);                        // help menu 
  const [gamePaused, setGamePaused] = useState(false);                    // game paused 
  
  const [score, setScore] = useState(0);                                  // score 
  const [floatingPoints, setFloatingPoints] = useState(null);             // floating text for score gain
  
  const [timeRemaining, setTimeRemaining] = useState(30);                 // time left (30 secs)
  const [timerActive, setTimerActive] = useState(false);                  // timer activation
  const timerRef = useRef(null);

  const fetchData = async () => {
    try {
      const response = await fetch("image_relations.json");      // fetch data from JSON
      const data = await response.json(); 

      const keys = Object.keys(data);   // get keys (stylized image URLs)
      const randomIndex = Math.floor(Math.random() * keys.length);  // get random index in dictionary
      const selectedEntry = data[keys[randomIndex]];                // get random entry from dictionary (random data for each round)

      const [options, processImages] = selectedEntry;               // set value (image options + iteration images) to selected round entry
      const [contentUrl, styleUrl, randomOption1, randomOption2] = options;    // set corresponding image options (1st = content, 2nd = style, 3rd&4th = incorrect options)

      setStylizedImage(keys[randomIndex]);     // set stylized result to corresponding key in dictionary
      setCorrectContent(contentUrl);           // set correct content
      setCorrectStyle(styleUrl);               // set correct style
      setShuffledOptions(shuffle([contentUrl, styleUrl, randomOption1, randomOption2]));   // shuffle options
      setSelectedImages([]);                     // selected images initially empty
      setProcessImages(processImages[0]);        // set iteration images to be the first iteration image
      setMessage("");                            // feedback message initially empty
      setIsNextRoundEnabled(false);              // next round is not enabled (current round should play first)
      resetBorders();                            // reset image borders (for selections)

      // Reset and start timer
      setTimeRemaining(30);
      setTimerActive(true);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // fetch data effect
  useEffect(() => {
    fetchData();

    // Cleanup timer on component unmount
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // start game
  const startGame = () => {
    setShowIntro(false);
    setGameStarted(true);  // Game officially starts
    setTimeRemaining(30);  // Reset timer to 30 seconds
    setTimerActive(true);  // Start timer countdown
  };

  const toggleHelp = () => {
    setShowHelp(!showHelp);       // toggle help menu display
    setGamePaused(!gamePaused);   // toggle game paused
  };

  // timer effect
  useEffect(() => {
    // if the game started, timer's active, time left > 0 and game's not paused
    if (gameStarted && timerActive && timeRemaining > 0 && !gamePaused) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prevTime => prevTime - 1);   // decrement time left
      }, 1000);
    } else if (timeRemaining === 0) {   // if time's up, handle time up
      handleTimeUp();
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameStarted, timerActive, timeRemaining, gamePaused]);


  // Calculate timer color based on time remaining
  const getTimerColor = () => {
    if (timeRemaining > 20) return '#28a745'; // Green - ample time left
    if (timeRemaining > 10) return '#ffc107'; // Yellow - better hurry
    return '#dc3545'; // Red - time nearly up
  };

  // Handle time up
  const handleTimeUp = () => {
    setTimerActive(false);          // deactivate timer
    setIsNextRoundEnabled(true);    // activate next round

    // Highlight correct answers
    const correctPair = [correctContent, correctStyle];
    highlightCorrectAnswers(correctPair);

    setMessage("Time's up! These are the correct options.");  // set message
  };

  // shuffle method - shuffles array with Durstenfeld algorithm
  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // handle image selection method
  const handleImageClick = (option) => {
    // if the timer's up, or the image is already selected, or the next round is activated (current round over),
    // don't do anything
    if (!timerActive || selectedImages.includes(option) || isNextRoundEnabled) return;

    // add newly selected image in selected images 
    const newSelectedImages = [...selectedImages, option];
    setSelectedImages(newSelectedImages);  // set selected images

    // if the user chooses 2 images, check the guess
    if (newSelectedImages.length === 2) { 
      setTimeout(() => checkGuess(newSelectedImages), 200); // Small delay to ensure the selection effect appears
    }
  };

  // check guess method
  const checkGuess = (guessedPair) => {
    // correctness = if the user guess includes content and style
    // (currently not checking if content was chosen first, then style chosen second, in order,
    // just for ease of play)
    const isCorrect =
      guessedPair.includes(correctContent) && guessedPair.includes(correctStyle);

    // Remove selected state from all images first
    document.querySelectorAll(".option-image").forEach((img) => {
      img.classList.remove("selected");
    });

    if (isCorrect) {
      highlightImages(guessedPair, "correct");  // highlight correct images
      setMessage("Correct! You've identified both the content and style images.");  // set message
      triggerConfetti();             // activate confetti
      setIsNextRoundEnabled(true);   // activate next round
      setTimerActive(false);         // Stop the timer

      // Calculate points based on time left - quicker guesses earn more points
      let pointsEarned = 0;
      if (timeRemaining > 20) pointsEarned = 100;
      else if (timeRemaining > 10) pointsEarned = 50;
      else pointsEarned = 20;

      setScore(prevScore => prevScore + pointsEarned);  // update score
      setFloatingPoints(`+${pointsEarned}`);            // activate floating score add text

      // Remove floating text after a short delay
      setTimeout(() => setFloatingPoints(null), 1000);

    } else {  // if the guessed pair was incorrect

      highlightImages(guessedPair, "incorrect");   // highlight incorrect
      shakeImages(guessedPair);                    // shake the guessed images 
      setMessage("Incorrect. Try again!");         // set message
      setTimeout(() => resetBorders(), 1000);      // reset border on guessed pair
    }
  };

  // highlight correct answers (for after time's up)
  const highlightCorrectAnswers = (correctPair) => {
    document.querySelectorAll(".option-image").forEach((img) => {
      if (correctPair.includes(img.src)) {
        img.classList.add("correct");      // add correct class to correct pair
      } else {
        img.classList.add("fade-out");     // fade out other (incorrect) options a bit
      }
    });
  };

  // handle click on show me how - activate visualization window
  const handleShowMeHow = () => {
    setShowVisualization(true);
  };

  // handle close on visualization window - deactivate visualization
  const closeVisualization = () => {
    setShowVisualization(false);
  };

  // handle next round - fetch fresh data
  const handleNextRound = () => {
    fetchData();
  };

  // highlight images based on class name
  const highlightImages = (images, className) => {
    document.querySelectorAll(".option-image").forEach((img) => {
      if (images.includes(img.src)) {
        img.classList.add(className);   // add class name to image (CSS will handle the rest)
      }
    });
  };
 
  // shake images - for incorrect guessed pair
  const shakeImages = (images) => {
    highlightImages(images, "shake"); // add shake class
  };

  // reset borders on images
  const resetBorders = () => {
    document.querySelectorAll(".option-image").forEach((img) => {
      img.classList.remove("correct", "incorrect", "shake", "fade-out");  // remove all classes
    });
    setSelectedImages([]);    // empty selected images
    setMessage("");           // empty message
  };

  // trigger confetti - just a fun effect for correct guesses
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
      {/* if the intro video is set to show, show the intro video */}
      {showIntro ? (
        <IntroVideo onSkip={startGame} onVideoEnd={startGame} />
      ) : (
        <>
          {/* else, show the game UI*/}

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

              {/* Points Display */}
              <div className="points-container">
                Points: {score}
                {floatingPoints && <div className="floating-points">{floatingPoints}</div>}
              </div>

            </>
          )}

          {/* GitHub Icon */}
          <a
            href="https://github.com/AdiBak/styletransfergame/"
            target="_blank"
            rel="noopener noreferrer"
            className="github-icon"
          >
            <FaGithub />
          </a>
        </>
      )}
    </div>
  );
};

export default Game;