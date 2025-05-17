import React, { useEffect, useState } from "react";
import MotivationalParticle from "./MotivationalParticle";
import sun2 from "./assests/sun2.png";
import { useNavigate } from "react-router-dom";

function Page() {
  const navigate = useNavigate();
  const [showTextDyslexia, setShowTextDyslexia] = useState(false);
  const [showTextAutism, setShowTextAutism] = useState(false);
  const [motivationalText, setMotivationalText] = useState("");
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    startMotivationalText();
    return () => clearInterval(intervalId);
  }, []);

  const startMotivationalText = () => {
    const texts = [
      "Your potential is limitless.",
      "Believe in yourself.",
      "Stay focused, stay positive.",
      "Success begins with you.",
      "Keep pushing forward.",
      "Make today amazing.",
      "You've got this!",
      "Be unstoppable.",
      "Every day is a new beginning.",
      "Chase your dreams.",
      "You are enough.",
      "Seize the day.",
      "Stay positive, stay fighting.",
    ];
    let index = 0;
    const id = setInterval(() => {
      setMotivationalText(texts[index]);
      index = (index + 1) % texts.length;
    }, 3000);
    setIntervalId(id);
  };

  const removeMotivationalText = () => {
    setMotivationalText("");
  };

  return (
    <div className="grid grid-cols-12 h-screen w-screen overflow-hidden">
      {/* Left Sidebar */}
      <div className="col-span-2 bg-gradient-to-b from-yellow-100 to-yellow-300 p-4 flex flex-col items-center justify-center space-y-10 border-r border-yellow-400 shadow-lg">
        <div
          className="w-28 h-36 bg-blue-500 hover:bg-blue-600 transition-all duration-300 rounded-2xl shadow-md text-white font-semibold flex items-center justify-center text-center text-base hover:scale-105 cursor-pointer"
          onClick={() => navigate("/dquiz")}
          onMouseEnter={() => setShowTextDyslexia(true)}
          onMouseLeave={() => setShowTextDyslexia(false)}
        >
          Dyslexia
        </div>

        <div
          className="w-28 h-36 bg-purple-500 hover:bg-purple-600 transition-all duration-300 rounded-2xl shadow-md text-white font-semibold flex items-center justify-center text-center text-base hover:scale-105 cursor-pointer"
          onClick={() => navigate("/autism")}
          onMouseEnter={() => setShowTextAutism(true)}
          onMouseLeave={() => setShowTextAutism(false)}
        >
          Autism
        </div>
      </div>

      {/* Right Content Area */}
      <div className="col-span-10 bg-gradient-to-br from-yellow-100 to-white relative">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
          {motivationalText ? (
            <MotivationalParticle
              key={1}
              text={motivationalText}
              onRemove={removeMotivationalText}
            />
          ) : (
            <h1 className="text-4xl font-extrabold text-pink-600 mb-6">
              Dream it. Believe it. Achieve it.
            </h1>
          )}

          <img
            src={sun2}
            className="w-28 h-28 animate-spin mb-6"
            alt="Sun"
            style={{ animationDuration: "8s" }}
          />

          {/* Dyslexia Info Box */}
          {showTextDyslexia && (
            <div className="bg-white bg-opacity-90 p-6 rounded-xl shadow-2xl max-w-xl w-full space-y-4 border-l-4 border-blue-400">
              <h2 className="text-2xl font-bold text-blue-700">Dyslexia</h2>
              <p>
                Dyslexia is a common learning difference affecting reading, writing, and spelling.
                Despite normal intelligence, individuals with dyslexia struggle with decoding
                words and comprehension.
              </p>
              <p>
                Its roots lie in brain differences that affect language processing.
                Genetics and early exposure play roles.
              </p>
              <p>Early detection and tailored interventions help learners succeed.</p>
            </div>
          )}

          {/* Autism Info Box */}
          {showTextAutism && (
            <div className="bg-white bg-opacity-90 p-6 rounded-xl shadow-2xl max-w-xl w-full space-y-4 border-l-4 border-purple-400">
              <h2 className="text-2xl font-bold text-purple-700">Autism</h2>
              <p>
                Autism Spectrum Disorder (ASD) is a complex neurodevelopmental condition reflected in
                diverse behavior, social communication, and interests.
              </p>
              <p>
                Challenges in communication, social skills, and repetitive behaviors are common.
              </p>
              <p>
                Early intervention and supportive therapies can make a big difference.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
