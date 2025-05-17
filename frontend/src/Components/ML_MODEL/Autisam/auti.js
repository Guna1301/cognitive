import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Autisam = () => {
  const [questions] = useState([
    {
      id: 1,
      text: 'Does your child look at you when you call his/her name?',
      options: ['Always', 'Usually', 'Sometimes', 'Rarely', 'Never'],
    },
    {
      id: 2,
      text: 'How easy is it for you to get eye contact with your child?',
      options: ['Always', 'Usually', 'Sometimes', 'Rarely', 'Never'],
    },
    {
      id: 3,
      text: 'Does your child point to indicate that s/he wants something? (e.g. a toy that is out of reach)',
      options: ['Always', 'Usually', 'Sometimes', 'Rarely', 'Never'],
    },
    {
      id: 4,
      text: 'Does your child point to share interest with you? (e.g. pointing at an interesting sight)',
      options: ['Always', 'Usually', 'Sometimes', 'Rarely', 'Never'],
    },
    {
      id: 5,
      text: 'Does your child pretend? (e.g. care for dolls, talk on a toy phone)',
      options: ['Always', 'Usually', 'Sometimes', 'Rarely', 'Never'],
    },
    {
      id: 6,
      text: 'Does your child follow where you are looking?',
      options: ['Always', 'Usually', 'Sometimes', 'Rarely', 'Never'],
    },
    {
      id: 7,
      text: 'If you or someone else in the family is visibly upset, does your child show signs of wanting to comfort them? (e.g. stroking hair, hugging them)',
      options: ['Always', 'Usually', 'Sometimes', 'Rarely', 'Never'],
    },
    {
      id: 8,
      text: 'Would you describe your child’s first words as:',
      options: ['Always', 'Usually', 'Sometimes', 'Rarely', 'Never'],
    },
    {
      id: 9,
      text: 'Does your child use simple gestures? (e.g. wave goodbye)',
      options: ['Always', 'Usually', 'Sometimes', 'Rarely', 'Never'],
    },
    {
      id: 10,
      text: 'Does your child stare at nothing with no apparent purpose?',
      options: ['Always', 'Usually', 'Sometimes', 'Rarely', 'Never'],
    },
  ]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [Prediction, setPrediction] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [signup, isSignup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem("name");
    isSignup(name !== null && name !== '');
  }, []);

  const handleRadioChange = (option) => {
    setAnswers((prev) => {
      const updated = [...prev];
      updated[currentQuestionIndex] = option;
      return updated;
    });
  };

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleNext = () => {
    setAnimate(true);
    setCurrentQuestionIndex((prev) => prev + 1);
    setTimeout(() => setAnimate(false), 500);
  };

  const handlePrev = () => {
    setAnimate(true);
    setCurrentQuestionIndex((prev) => prev - 1);
    setTimeout(() => setAnimate(false), 500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const modelValues = answers.map((opt) =>
      opt === 'Always' || opt === 'Usually' ? 0 : 1
    );

    try {
      const res = await axios.post('https://final-ps-ml1.onrender.com/apredict', {
        answers: modelValues
      });

      const score = Math.round(res.data.prediction);
      setPrediction(score);
      setSubmitted(true);

      await axios.post('https://final-ps-backend.vercel.app/api/autisam', {
        name: localStorage.getItem('name'),
        email: localStorage.getItem('email'),
        score: score,
      });
    } catch (err) {
      console.error('Submission error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center px-4">
      {signup ? (
        <div className="w-full max-w-3xl bg-white p-8 rounded-3xl shadow-2xl transition-all">
          <div className="w-full h-3 bg-gray-200 rounded-full mb-6 overflow-hidden">
            <div
              className={`h-full bg-blue-500 transition-all duration-700 ${animate ? 'animate-pulse' : ''}`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Autism Detection Survey</h2>

          {submitted ? (
            <div className="text-center space-y-4">
              <p className="text-lg text-gray-700">Thank you for submitting the survey!</p>
              {Prediction !== null && (
                <>
                  <p className="text-xl font-bold text-indigo-600">Your Score: {Prediction}</p>
                  <p className={`text-lg ${Prediction >= 4 ? 'text-red-500' : 'text-green-600'}`}>
                    {Prediction >= 4 ? "There may be chances of autism" : "No significant signs of autism"}
                  </p>
                </>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <p className="text-lg font-medium mb-4 text-gray-800">{questions[currentQuestionIndex].text}</p>
                <div className="space-y-3">
                  {questions[currentQuestionIndex].options.map((option) => (
                    <label
                      key={option}
                      className="flex items-center gap-3 text-gray-700 text-base"
                    >
                      <input
                        type="radio"
                        name={`question_${currentQuestionIndex}`}
                        value={option}
                        checked={answers[currentQuestionIndex] === option}
                        onChange={() => handleRadioChange(option)}
                        className="form-radio text-blue-600"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={currentQuestionIndex === 0}
                  className="px-5 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md disabled:opacity-50"
                >
                  Previous
                </button>
                {currentQuestionIndex < questions.length - 1 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={answers[currentQuestionIndex] === undefined}
                    className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md disabled:opacity-50"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={answers[currentQuestionIndex] === undefined}
                    className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md disabled:opacity-50"
                  >
                    Submit
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      ) : (
        <div className="bg-white p-10 rounded-3xl shadow-xl text-center space-y-6">
          <p className="text-xl font-medium text-gray-700">Please sign up to continue</p>
          <button
            onClick={() => navigate("/Login")}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            Sign Up
          </button>
        </div>
      )}
    </div>
  );
};

export default Autisam;
