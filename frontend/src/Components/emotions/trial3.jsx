import React, { useState, useEffect, useRef } from 'react';
import GameOver from './GameOverScreen.jsx';
import emotionsData from './emo.js';
import correctSound from './Assets/correct-answer.wav';
import incorrectSound from './Assets/wrong-answer.mp3';
import cardFlipSound from './Assets/Card-flip.mp3';
import heart from './Assets/heart.png';
import axios from 'axios';

const EmotionFlashcardGame = ({ ageRange, level, levels }) => {
  const [selectedEmotions, setSelectedEmotions] = useState([]);
  const [currentFlashcard, setCurrentFlashcard] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [questionsAsked, setQuestionsAsked] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [optionClicked, setOptionClicked] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timer, setTimer] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [lives, setLives] = useState(levels[level].initialLives);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const startTimeRef = useRef(null);
  const timerRef = useRef(null);
  const [trecommendations, setRecommendations] = useState([]);

  const correctAudio = new Audio(correctSound);
  const incorrectAudio = new Audio(incorrectSound);
  const cardFlipAudio = new Audio(cardFlipSound);

  useEffect(() => {
    if (emotionsData[ageRange]?.[level]) {
      setSelectedEmotions(emotionsData[ageRange][level]);
      setElapsedTime(0);
      setTimer(levels[level].timer);
      shuffleCards();
      setQuestionsAsked(0);
    } else {
      setGameOver(true);
    }
  }, [ageRange, level]);

  useEffect(() => {
    if (gameOver) {
      try {
        axios.post('http://localhost:5000/api/activity', {
          email: localStorage.getItem('email'),
          gameType: "Reflex",
          score: Math.round((score / 15) * 10),
        });
      } catch (error) {
        console.error('Error submitting:', error);
      }
    }
  }, [gameOver, score, level]);

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setElapsedTime((prev) => {
          const updated = prev + 1;
          if (updated === timer) setGameOver(true);
          return updated;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isPaused, timer]);

  useEffect(() => {
    if (selectedEmotions.length > 0) shuffleCards();
  }, [selectedEmotions]);

  const playAudio = (audio) => {
    audio.currentTime = 0;
    audio.play();
  };

  const handleOptionClick = (selectedOption) => {
    if (!optionClicked && !isPaused) {
      const correct = selectedOption.name === currentFlashcard.name;
      setScore((prev) => (correct ? prev + 1 : prev));
      setIsCorrect(correct);
      setSelectedAnswer(selectedOption.name);
      setOptionClicked(true);
      if (correct) {
        playAudio(correctAudio);
        setCorrectCount((prev) => prev + 1);
      } else {
        playAudio(incorrectAudio);
        setLives((prev) => prev - 1);
        setIncorrectCount((prev) => prev + 1);
        if (lives - 1 === 0 || elapsedTime === timer) setGameOver(true);
      }

      setTimeout(() => {
        shuffleCards();
      }, 500);
    }
  };

  const handleStopGame = () => {
    clearInterval(timerRef.current);
    setGameOver(true);
  };

  const handlePauseGame = () => {
    setIsPaused(true);
    clearInterval(timerRef.current);
  };

  const handleResumeGame = () => {
    setIsPaused(false);
    startTimeRef.current = Date.now() - elapsedTime * 1000;
    timerRef.current = setInterval(() => {
      const seconds = Math.floor((Date.now() - startTimeRef.current) / 1000);
      setElapsedTime(seconds);
      if (seconds === timer) setGameOver(true);
    }, 1000);
    shuffleCards();
  };

  const shuffleCards = () => {
    if (!isPaused) {
      const shuffled = [...selectedEmotions].sort(() => Math.random() - 0.5);
      const correctIndex = Math.floor(Math.random() * levels[level].options);
      const tempOptions = shuffled.slice(0, levels[level].options);

      setCurrentFlashcard(tempOptions[correctIndex]);
      setOptions([...tempOptions]);
      setOptionClicked(false);
      setSelectedAnswer('');
      setIsCorrect(null);
      playAudio(cardFlipAudio);
      setQuestionsAsked((prev) => prev + 1);
    }
  };

  const restartGame = () => {
    clearInterval(timerRef.current);
    setSelectedEmotions(emotionsData[ageRange][level]);
    setCurrentFlashcard(null);
    setOptions([]);
    setScore(0);
    setGameOver(false);
    setElapsedTime(0);
    setTimer(levels[level].timer);
    setLives(levels[level].initialLives);
    setCorrectCount(0);
    setIncorrectCount(0);
    setOptionClicked(false);
    setSelectedAnswer('');
    setIsCorrect(null);
    shuffleCards();
    setQuestionsAsked(1);
    startTimeRef.current = Date.now();
    timerRef.current = setInterval(() => {
      const seconds = Math.floor((Date.now() - startTimeRef.current) / 1000);
      setElapsedTime(seconds);
      if (seconds === levels[level].timer) setGameOver(true);
    }, 1000);
  };

  const getRecommendations = async () => {
    try {
      const response = await axios.post('https://final-ps-ml1.onrender.com/recommendations', {
        game_name: "reflex",
        level: level,
        played: [],
      });
      setRecommendations(response.data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 p-4 text-center">
      {gameOver ? (
        <div>
          <GameOver
            score={score}
            TotalQuestions={questionsAsked}
            correct={correctCount}
            wrong={incorrectCount}
            onRestart={restartGame}
          />
          <button onClick={getRecommendations} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Get Recommendations
          </button>
          <ul className="mt-2 text-left list-disc list-inside">
            {trecommendations.length > 0 ? (
              trecommendations.map((rec, i) => (
                <li key={i}>{rec[0]}: {rec[1]}</li>
              ))
            ) : (
              <li className="text-gray-500 italic">No recommendations yet</li>
            )}
          </ul>
        </div>
      ) : (
        <>
          <div className="text-lg mb-4">
            <p className="font-semibold">Score: {score}</p>
            <div className="w-full bg-gray-300 h-4 rounded-full my-2">
              <div className="h-4 bg-green-500 rounded-full" style={{ width: `${(elapsedTime / timer) * 100}%` }} />
            </div>
            <p className="text-sm">{timer - elapsedTime} seconds left</p>
            <p>Questions: {questionsAsked}</p>
          </div>

          <div className="flex justify-center mb-4">
            {Array.from({ length: lives }, (_, i) => (
              <img key={i} src={heart} alt="Heart" className="w-8 h-8 mx-1" />
            ))}
          </div>

          <div className="flex justify-center space-x-4 mb-6">
            {isPaused ? (
              <button onClick={handleResumeGame} className="px-4 py-2 bg-yellow-400 rounded hover:bg-yellow-500">Resume</button>
            ) : (
              <button onClick={handlePauseGame} className="px-4 py-2 bg-yellow-400 rounded hover:bg-yellow-500">Pause</button>
            )}
            <button onClick={handleStopGame} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Stop</button>
          </div>

          <p className="text-xl mb-4 font-medium">
            Which emoji represents the emotion: <span className="font-bold">{currentFlashcard?.name}</span>
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {options.map((option) => (
              <button
                key={option.name}
                onClick={() => handleOptionClick(option)}
                className={`border-4 rounded-lg transition duration-300 ${
                  selectedAnswer === option.name && isCorrect !== null
                    ? isCorrect
                      ? 'border-green-500'
                      : 'border-red-500'
                    : 'border-transparent'
                }`}
              >
                <img src={option.image} alt={option.name} className="w-full h-28 object-contain" />
              </button>
            ))}
          </div>

          <button onClick={restartGame} className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
            Restart Game
          </button>
        </>
      )}
    </div>
  );
};

export default EmotionFlashcardGame;
