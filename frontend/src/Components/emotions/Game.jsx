import React, { useState } from 'react';
import EmotionFlashcardGame from './trial3';

const levels = {
  easy: { name: 'Easy', totalQuestions: 5, options: 2, timer: 60, initialLives: 6 },
  medium: { name: 'Medium', totalQuestions: 8, options: 3, timer: 40, initialLives: 5 },
  hard: { name: 'Hard', totalQuestions: 10, options: 4, timer: 30, initialLives: 3 },
};

const EmotionGame = () => {
  const [selectedAge, setSelectedAge] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');

  const handleStartGame = () => {
    if (selectedAge && selectedLevel) {
      console.log(`Starting game for age: ${selectedAge}, level: ${selectedLevel}`);
    }
  };

  const renderLevelSelection = () => (
    <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md mx-auto text-center space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-indigo-700">Choose Age and Level</h1>

      <div className="text-left space-y-4">
        <label className="block">
          <span className="text-gray-700 font-medium">Age</span>
          <select
            value={selectedAge}
            onChange={(e) => setSelectedAge(e.target.value)}
            className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select Age</option>
            <option value="0-4">0-4 years</option>
            <option value="5-8">5-8 years</option>
            <option value="8-10">8-10 years</option>
            <option value="10-12">10-12 years</option>
          </select>
        </label>

        {selectedAge && (
          <label className="block">
            <span className="text-gray-700 font-medium">Level</span>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select Level</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>
        )}
      </div>

      <button
        onClick={handleStartGame}
        disabled={!selectedAge || !selectedLevel}
        className="mt-4 w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition"
      >
        Start Game
      </button>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-blue-200 p-4">
      {!selectedAge || !selectedLevel ? (
        renderLevelSelection()
      ) : (
        <EmotionFlashcardGame ageRange={selectedAge} level={selectedLevel} levels={levels} />
      )}
    </div>
  );
};

export default EmotionGame;
