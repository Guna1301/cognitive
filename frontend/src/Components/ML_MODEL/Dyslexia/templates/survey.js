import{React, useState, useEffect} from 'react'
import axios from 'axios';
import './curve.css'
import { useNavigate, useLocation } from 'react-router-dom';

function DSurvey() {
    const [questions] = useState([
        {
            id: 1,
            text: 'Did your child struggle to learn to count?',
            options: ['Yes-frequently', 'Sometimes', 'No-never'],
        },
        {
            id: 2,
            text: 'Does he/she say numbers out of order, long after peers have mastered this skill?',
            options: ['Yes-frequently', 'Sometimes', 'No-never'],
        },
        {
            id: 3,
            text: 'Does your child not seem to understand the connection between the symbol "4" and the word "four"? Does he make mistakes when reading or following directions involving numbers, words and symbols?',
            options: ['Yes-frequently', 'Sometimes', 'No-never'],
        },
        {
            id: 4,
            text: 'Does your child struggle to connect the concept of numbers to real-world items? When you ask him how many cookies are left, for example, does he seem confused by the question or answer incorrectly?',
            options: ['Yes-frequently', 'Sometimes', 'No-never'],
        },
        {
            id: 5,
            text: 'Does your child not seem to understand the difference between adding and subtracting? Does she confuse the + and - symbols when completing math problems?',
            options: ['Yes-frequently', 'Sometimes', 'No-never'],
        },
        {
            id: 6,
            text: 'Does your child still count on his fingers past third grade?',
            options: ['Yes-frequently', 'Sometimes', 'No-never'],
        },
        {
            id: 7,
            text: 'Difficulty sustaining attention; seems "hyper" or "daydreamer"?',
            options: ['Yes', 'No', 'Unknow'],
        },
        {
            id: 8,
            text: 'Confused by letters, numbers, words, sequences, or verbal explanations?',
            options: ['Yes', 'No', 'Unknow'],
        },
        {
            id: 9,
            text: 'Reads and rereads with little comprehension?',
            options: ['Yes', 'No', 'Unknow'],
        },
        {
            id: 10,
            text: 'Difficulty putting thoughts into words; speaks in halting phrases; leaves sentences incomplete?',
            options: ['Yes', 'No', 'Unknow'],
    
        },
        {
            id: 11,
            text: 'Can count, but has difficulty counting objects and dealing with money?',
            options: ['Yes', 'No', 'Unknow'],
        },
        {
            id: 12,
            text: 'Does your child worry for sequences, facts and information that were not taught before?',
            options: ['Yes', 'No', 'Unknow'],
        },
        {
            id: 13,
            text: 'Does your child omplain of dizziness, headaches or stomach aches while reading?',
            options: ['Yes', 'No', 'Unknow'],
        },
        {
            id: 14,
            text: 'Is reading extremely difficult for your child? (Below grade or age level)',
            options: ['Yes', 'No', 'Unknow'],
        },
        {
            id: 15,
            text: 'Is his spelling ability poor? Letters missed, reversed etc?',
            options: ['Yes', 'No', 'Unknow'],
        },
        {
            id: 16,
            text: 'Is it difficult for him to rhyme words?(If you are not sure, play a rhyming game with your child or student)',
            options: ['Yes', 'No', 'Unknow'],
        },
        {
            id: 17,
            text: 'Is there difficulty telling time on a clock with hands and/or tying shoes with laces?',
            options: ['Yes', 'No', 'Unknow'],
        },
        {
            id: 18,
            text: "Is there difficulty finding the right words while speaking? Lots of ums, ahs, 'those things', and 'that stuff'?",
            options: ['Yes', 'No', 'Unknow'],
        },
        {
            id: 19,
            text: 'Pauses, repeats or frequent mistakes when reading aloud?',
            options: ['Yes', 'No', 'Unknow'],
        },
        {
            id: 20,
            text: 'Unusually high or low tolerance for pain?',
            options: ['Yes', 'No', 'Unknow'],
        },
      ]);
    
      const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
      const [answers, setAnswers] = useState([]);
      //const [Prediction, setPrediction] = useState(null);
      const [submitted, setSubmitted] = useState(false);
      const [animate, setAnimate] = useState(false);
      const navigate = useNavigate()
      const location = useLocation()
    
      const handleRadioChange = (option) => {
        setAnswers((prevAnswers) => {
          const updatedAnswers = [...prevAnswers];
          updatedAnswers[currentQuestionIndex] = option;
          
          return updatedAnswers;
        });
      };
    
      const progress = ((currentQuestionIndex + 1) / 20) * 100;
      const handleNext = () => {
        setAnimate(true);
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setTimeout(() => setAnimate(false), 1000);
      };
    
      const handlePrev = () => {
        setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
        setAnimate(true);
        setTimeout(() => setAnimate(false), 1000);
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(answers)
      //const selectedOption = answers[currentQuestionIndex];
      const modelValues = answers.map((selectedOption, index) => (
        selectedOption === "No-never" || selectedOption === "No" ? 4 : (selectedOption === "Sometimes" || selectedOption === "Unknown" ? 2 : 0)
      ));
    
      try {
        const response = await axios.post('https://final-ps-ml1.onrender.com/survey', {
          answers: modelValues,
          vals: location.state.vals
        }).then((res)=>{
        setSubmitted(true);
        navigate("/DResult", {state:{vals:res.data.scr}})
        })
      }catch (error) {
          console.error('Error submitting survey:', error);
        }
        
      };
    
      return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <div className="bg-white shadow-2xl rounded-3xl p-6 w-full max-w-3xl">
      <div className="w-full bg-gray-200 h-4 rounded-full mb-6 overflow-hidden">
        <div
          className={`h-full bg-blue-500 transition-all duration-500 ${animate ? 'animate-pulse' : ''}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <h2 className="text-2xl font-bold mb-6 text-center">Survey Form</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {questions.length > 0 && (
          <div className="flex flex-col gap-4">
            <p className="text-lg font-semibold" style={{ fontFamily: 'Poppins' }}>
              {questions[currentQuestionIndex].text}
            </p>
            <div className="flex flex-col gap-3">
              {questions[currentQuestionIndex].options.map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-3 text-base font-medium"
                  style={{ fontFamily: 'Poppins' }}
                >
                  <input
                    type="radio"
                    name={`question_${currentQuestionIndex}`}
                    value={option}
                    checked={answers[currentQuestionIndex] === option}
                    onChange={() => handleRadioChange(option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-4 justify-center">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0}
            className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 disabled:opacity-50"
          >
            Previous
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={
              currentQuestionIndex === questions.length - 1 ||
              answers[currentQuestionIndex] === undefined
            }
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            Next
          </button>

          {currentQuestionIndex === questions.length - 1 && (
            <button
              type="submit"
              disabled={answers[currentQuestionIndex] === undefined}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 disabled:opacity-50"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  </div>
);

  }

export default DSurvey