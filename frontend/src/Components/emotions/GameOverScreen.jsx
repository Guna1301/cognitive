import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router'; 


const GameOverScreen = ({ score, TotalQuestions, correct, wrong, onRestart }) => {
  const navigate = useNavigate();

  const handleRestart = () => {
    onRestart();
    navigate('/EmotionGame');
  };

  return (
    <div className="flex  items-center justify-center min-h-screen p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-4xl font-extrabold mb-6 text-gray-900">Game Over</h1>
        <p className="text-lg mb-2 text-gray-700">Your Score: <span className="font-semibold">{score}</span></p>
        <p className="text-lg mb-2 text-gray-700">Total Questions: <span className="font-semibold">{TotalQuestions}</span></p>
        <p className="text-lg mb-2 text-green-600">Correct: <span className="font-semibold">{correct}</span></p>
        <p className="text-lg mb-6 text-red-600">Incorrect: <span className="font-semibold">{wrong}</span></p>
        <button
          onClick={handleRestart}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
        >
          Restart
        </button>
      </div>
    </div>
  );
};

GameOverScreen.propTypes = {
  score: PropTypes.number.isRequired,
  TotalQuestions: PropTypes.number.isRequired,
  correct: PropTypes.number.isRequired,
  wrong: PropTypes.number.isRequired,
  onRestart: PropTypes.func.isRequired,
};

export default GameOverScreen;
