import React from "react";
import AnagramCP from "./assests/Anagram_cp.jpg";
import ColourPatternCP from "./assests/ColourPatterns_cp.jpg.png";
import EmotionCP from "./assests/EmotionCover_pic.jpg";
import SlidePuzzleCP from "./assests/slide puzzle.jpg";
import { Link } from "react-router-dom";
import Sidebar from "../Dashboard/sidebar";

export default function Gamepage() {
  return (
    <div className="flex min-h-screen g">
      {/* Sidebar */}
      <div className="bg-gray-100 dark:bg-gray-800 shadow-lg">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <h1 className="text-3xl font-semibold text-center mb-8">Activities</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
          <Link to="/AnagramGame">
            <img
              className="w-60 h-60 object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
              src={AnagramCP}
              alt="Anagram Game"
            />
          </Link>

          <Link to="/ColourGame">
            <img
              className="w-60 h-60 object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
              src={ColourPatternCP}
              alt="Color Game"
            />
          </Link>

          <Link to="/EmotionGame">
            <img
              className="w-60 h-60 object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
              src={EmotionCP}
              alt="Emotion Game"
            />
          </Link>

          <Link to="/PuzzleGame">
            <img
              className="w-60 h-60 object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
              src={SlidePuzzleCP}
              alt="Slide Puzzle Game"
            />
          </Link>

          <Link to="/WackGame">
            <img
              className="w-60 h-60 object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
              src="https://img.gamedistribution.com/5905642773bc49738888210d0b2d3112-512x512.jpeg"
              alt="Wack-a-mole Game"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
