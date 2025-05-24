// ColourGame.js
import React, { useState, useEffect } from 'react';
import PatternContainer from './PatternContainer';
import ColorOption from './ColorOption';
import heartImage from '../Game/assests/heart.png'; 
import axios from 'axios';
import { Button } from 'react-bootstrap';

const ColourGame = () => {
  const [referencePattern, setReferencePattern] = useState([]);
  const [playerPattern, setPlayerPattern] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [hearts, setHearts] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [showReferencePattern, setShowReferencePattern] = useState(true);
  const [recommendations, setRecommendations] = useState([]);
  const colors = ['red', 'blue', 'green', 'yellow'];

  useEffect(() => {
    if (showReferencePattern) {
      generatePattern();
      const patternTimeout = setTimeout(() => {
        setShowReferencePattern(false);
      }, 3000);

      return () => clearTimeout(patternTimeout);
    }
  }, [showReferencePattern]);

  useEffect(() => {
    if (!showReferencePattern) {
      setPlayerPattern([]);
      setFeedback('');
    }
  }, [showReferencePattern]);

  const generatePattern = () => {
    const newPattern = Array.from({ length: 3 }, () =>
      colors[Math.floor(Math.random() * colors.length)]
    );
    setReferencePattern(newPattern);
  };

  const handleColorClick = (color) => {
    if (!showReferencePattern) {
      setPlayerPattern([...playerPattern, color]);
    }
  };

  const handleCheckPattern = () => {
    if (arraysMatch(playerPattern, referencePattern)) {
      setFeedback('Correct! Well done!');
      setScore(score + 1);
      setShowReferencePattern(true);
      setTimeout(() => generatePattern(), 500);
    } else {
      handleWrongAnswer();
    }
  };

  const handleWrongAnswer = () => {
    if (hearts > 1) {
      setHearts(hearts - 1);
      setFeedback('Not quite right, try again!');
      setShowReferencePattern(true);
    } else {
      setHearts(0);
      setGameOver(true);
    }
    setPlayerPattern([]);
    setTimeout(() => generatePattern(), 500);
  };

  const handleRemovePattern = () => {
    if (!showReferencePattern && playerPattern.length > 0) {
      const newPlayerPattern = [...playerPattern];
      newPlayerPattern.pop();
      setPlayerPattern(newPlayerPattern);
    }
  };

  const arraysMatch = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    return arr1.every((value, i) => value === arr2[i]);
  };

  const handleRestart = () => {
    setHearts(3);
    setScore(0);
    setShowReferencePattern(true);
    setGameOver(false);
  };

  useEffect(() => {
    if (gameOver) {
      try {
        axios.post('http://localhost:5000/api/activity', {
          email: localStorage.getItem('email'),
          gameType: "Memory",
          score: Math.round((score / 15) * 10),
        });
      } catch (error) {
        console.error('Error submitting score:', error);
      }
    }
  }, [gameOver, score]);

  const getRecommendations = async () => {
    try {
      const res = await axios.post('https://final-ps-ml1.onrender.com/recommendations', {
        game_name: "Memory",
        level: "medium",
        played: [],
      });
      setRecommendations(res.data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center text-neutral-700">Color Sequence</h2>

        <div className="text-center">
          <p className="text-lg font-semibold text-indigo-600">Score: {score}</p>
          <div className="flex justify-center mt-2 space-x-2">
            {Array.from({ length: hearts }).map((_, i) => (
              <img key={i} src={heartImage} alt="heart" className="w-6 h-6" />
            ))}
          </div>
        </div>

        {!gameOver ? (
          <>
            <div className={`${showReferencePattern ? 'animate-pulse' : 'hidden'}`}>
              <PatternContainer pattern={referencePattern} />
            </div>

            <PatternContainer id="player-pattern" pattern={playerPattern} />

            <div className="flex flex-wrap justify-center gap-4">
              {colors.map((color) => (
                <ColorOption
                  key={color}
                  color={color}
                  onClick={() => handleColorClick(color)}
                  disabled={showReferencePattern}
                />
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="bg-neutral-500 hover:bg-neutral-700 text-white font-semibold px-4 py-2 rounded-lg"
                onClick={handleCheckPattern}
              >
                Check Pattern
              </button>
              <button
                className="bg-red-400 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg"
                onClick={handleRemovePattern}
              >
                Remove Pattern
              </button>
            </div>

            {feedback && (
              <p className={`text-center text-lg font-bold ${feedback.includes('Correct') ? 'text-green-600' : 'text-red-500'}`}>
                {feedback}
              </p>
            )}
          </>
        ) : (
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-red-600">Game Over!</h1>
            <p className="text-gray-700">You ran out of hearts. Try again!</p>
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded-lg"
              onClick={handleRestart}
            >
              Restart
            </button>
            <Button className="w-full" onClick={getRecommendations}>
              Get Recommendations
            </Button>

            {recommendations.length > 0 && (
              <ul className="text-left list-disc list-inside mt-3 text-sm text-gray-800">
                {recommendations.map((rec, index) => (
                  <li key={index}><strong>{rec[0]}</strong>: {rec[1]}</li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ColourGame;
