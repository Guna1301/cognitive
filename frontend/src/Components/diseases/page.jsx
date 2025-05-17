import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import arrow from "./assests/arrow.svg";
import dyslexia from './assests/dyslexia.png';
import autism from './assests/autism.jpg';

function Page() {
  const navigate = useNavigate();
  const [hoveredButton, setHoveredButton] = useState(null);

  return (
    <div className="flex flex-col dark:bg-gray-800 bg-white items-center justify-start min-h-screen w-full px-4 py-6 space-y-6">
      <div className="flex flex-col items-center text-center space-y-3 mt-8 max-w-xl px-4">
        <h1 className="text-4xl font-extrabold text-black dark:text-white">
          Ready to Discover More About You?
        </h1>
        <p className="text-lg max-w-md text-black dark:text-gray-300">
          Take a quick, simple quiz to learn about Dyslexia or Autism. Just choose a topic below to begin your journey.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Dyslexia Button */}
        <div
          onMouseEnter={() => setHoveredButton("dyslexia")}
          onMouseLeave={() => setHoveredButton(null)}
          onClick={() => navigate("/dquiz")}
          className={`px-6 py-4 rounded-full shadow-lg text-lg font-semibold flex items-center gap-2 justify-center cursor-pointer transition-transform duration-300 hover:scale-105
            ${
              hoveredButton === "dyslexia"
                ? "bg-blue-700 text-white"
                : "bg-blue-600 text-white"
            }`}
        >
          Dyslexia
          <img src={arrow} alt="Arrow" className="w-4 h-4" />
        </div>

        {/* Autism Button */}
        <div
          onMouseEnter={() => setHoveredButton("autism")}
          onMouseLeave={() => setHoveredButton(null)}
          onClick={() => navigate("/autism")}
          className={`px-8 py-4 rounded-full shadow-lg text-lg font-semibold flex items-center gap-2 justify-center cursor-pointer transition-transform duration-300 hover:scale-105
            ${
              hoveredButton === "autism"
                ? "bg-green-800 text-white"
                : "bg-green-600 text-white"
            }`}
        >
          Autism
          <img src={arrow} alt="Arrow" className="w-4 h-4" />
        </div>
      </div>

      {/* Info Cards */}
      <div className="w-full h-[60%] mt-6 flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
        {/* Dyslexia Card */}
        <div
          className={`flex-1 p-4 rounded-lg shadow-md border-l-4 transition-all duration-300 transform
            ${
              hoveredButton === "dyslexia"
                ? "bg-blue-50 border-yellow-400 scale-105 shadow-blue-400"
                : "bg-white border-yellow-400 shadow-md"
            }`}
        >
          <h3 className="font-bold text-xl text-blue-600 dark:text-blue-400">Dyslexia</h3>
          <p className="text-black dark:text-gray-300">
            Dyslexia is a common learning difference affecting reading, writing, and spelling.
            Despite normal intelligence, individuals with dyslexia struggle with decoding words and comprehension.
          </p>
          <img src={dyslexia} alt="Dyslexia" className="mt-4 rounded" />
        </div>

        {/* Autism Card */}
        <div
          className={`flex-1 p-4 rounded-lg shadow-md border-l-4 transition-all duration-300 transform
            ${
              hoveredButton === "autism"
                ? "bg-green-50 border-yellow-400 scale-105 shadow-green-400"
                : "bg-white border-yellow-400 shadow-md"
            }`}
        >
          <h3 className="font-bold text-xl text-green-600 dark:text-green-400">Autism</h3>
          <p className="text-black dark:text-gray-300">
            Autism Spectrum Disorder (ASD) is a neurodevelopmental condition that impacts communication, behavior,
            and social skills. Supportive interventions and early care can make a huge difference.
          </p>
          <img src={autism} alt="Autism" className="mt-4 rounded" />
        </div>
      </div>
    </div>
  );
}

export default Page;
