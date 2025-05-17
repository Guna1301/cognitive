import React, { useState } from 'react';

const AnagramInput = ({ onGuess }) => {
  const [guess, setGuess] = useState('');

  const handleChange = (e) => {
    setGuess(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuess(guess);
    setGuess('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-sm mx-auto"
    >
      <label className="flex flex-col items-center w-full">
        <span className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Guess the word
        </span>
        <input
          type="text"
          value={guess}
          onChange={handleChange}
          placeholder="Type your guess..."
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 transition"
        />
      </label>
      <button
        type="submit"
        className="w-28 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-md shadow-md transition"
      >
        Submit
      </button>
    </form>
  );
};

export default AnagramInput;
