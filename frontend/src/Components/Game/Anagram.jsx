import React, { useState, useEffect } from 'react';
import './Anagram.css'; // Keep if you have any custom styles
import heart from "./assests/heart.png";
import AnagramGenerator from './AnagramGenerator';
import AnagramDisplay from './AnagramDisplay';
import AnagramInput from './AnagramInput';
import RotatingCirclesBackground from './BackGround';
import { Button } from 'react-bootstrap';
import axios from 'axios';

function Anagram() {
  const [hearts, setHearts] = useState(3);
  const [word, setWord] = useState('');
  const [anagram, setAnagram] = useState('');
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [trecommendations, setRecommendations] = useState([]);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false); // NEW
  const [correctAnswer, setCorrectAnswer] = useState(''); // NEW

  useEffect(() => {
  if (hearts === 0) {
    setGameOver(true);
  } else if (!showCorrectAnswer) { 
    generateNewAnagram();
  }
}, [score, hearts, showCorrectAnswer]);

  const generateNewAnagram = () => {
    const newWord = AnagramGenerator.getRandomWord(score);
    const newAnagram = AnagramGenerator.shuffleWord(newWord);
    setWord(newWord);
    setAnagram(newAnagram);
    setShowCorrectAnswer(false); 
    setCorrectAnswer('');
  };

  const handleGuess = (guess) => {
    if (showCorrectAnswer) return; 

    if (guess.toLowerCase() === word.toLowerCase()) {
      setScore(score + 1);
    } else {
      setHearts(hearts - 1);
      setCorrectAnswer(word);
      setShowCorrectAnswer(true);

      setTimeout(() => {
        generateNewAnagram();
      }, 5000);
    }
  };

  const restartGame = () => {
    setHearts(3);
    setScore(0);
    setGameOver(false);
    setRecommendations([]);
    setShowCorrectAnswer(false);
    setCorrectAnswer('');
  };

  const getRecommendations = async () => {
    try {
      const response = await axios.post('https://final-ps-ml1.onrender.com/recommendations', {
        game_name: "Language",
        level: "medium",
        played: [],
      });
      setRecommendations(response.data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  useEffect(() => {
    if(gameOver) {
      try {
        axios.post('https://final-ps-backend.vercel.app/api/activity', {
          email: localStorage.getItem('email'),
          gameType: "Language",
          score: Math.round((score/15) * 10),
        });
      } catch (error) {
        console.error('Error submitting:', error);
      }
    }
  }, [gameOver, score]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-blue-200 p-4">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <RotatingCirclesBackground />
      </div>

      {gameOver ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">Game Over!</h1>
          <h2 className="text-2xl mb-6 text-gray-700 dark:text-gray-300">
            Your Score: <span className="font-extrabold">{Math.round((score/15) * 10)}</span>
          </h2>
          <button
            onClick={restartGame}
            className="mb-4 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold transition"
          >
            Restart
          </button>
          <button
            onClick={getRecommendations}
            className="mb-4 w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-md font-semibold transition"
          >
            Get Recommendations
          </button>

          <ul className="text-left max-h-48 overflow-auto">
            {trecommendations.length > 0 ? (
              trecommendations.map((recommendation, index) => (
                <li key={index} className="mb-2 text-gray-800 dark:text-gray-200">
                  <span className="font-semibold">{recommendation[0]}</span>: {recommendation[1]}
                </li>
              ))
            ) : (
              <li className="text-gray-500">No recommendations yet.</li>
            )}
          </ul>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-lg w-full flex flex-col items-center space-y-6">
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-gray-100">Anagram Game</h1>
          
          <div className="flex space-x-4">
            {Array.from({ length: hearts }, (_, index) => (
              <img
                key={index}
                src={heart}
                alt={`heart-${index}`}
                className="w-10 h-10 animate-pulse"
              />
            ))}
          </div>

          <p className="text-xl text-gray-700 dark:text-gray-300">Score: {score}</p>

          <AnagramDisplay anagram={anagram} />

          {showCorrectAnswer && (
            <p className="text-red-600 font-bold text-lg mt-4">
              Incorrect! Correct answer: <span className="underline">{correctAnswer}</span>
            </p>
          )}

          <AnagramInput onGuess={handleGuess} disabled={showCorrectAnswer} />
        </div>
      )}
    </div>
  );
}

export default Anagram;
