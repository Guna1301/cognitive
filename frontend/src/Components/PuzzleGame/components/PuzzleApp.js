import React, { useState } from "react";
import Game from "./Game";
import { CheckCircle, ChevronRight } from "lucide-react";

function PuzzleApp() {
  const [currentLevel, setCurrentLevel] = useState(0);

  const handleLevelCompletion = () => {
    setCurrentLevel((prevLevel) => prevLevel + 1);
  };

  const levelTitles = [
    "Level 1: 2x2 Grid",
    "Level 2: 3x3 Grid",
    "Level 3: 4x4 Grid",
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-blue-200 flex items-center justify-center p-4">
      <div className="rounded-2xl p-8 w-full max-w-3xl animate-fade-in space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-extrabold text-indigo-700 flex items-center gap-2">
            {levelTitles[currentLevel]} <ChevronRight className="w-6 h-6 text-indigo-500" />
          </h1>
          <div className="flex gap-1">
            {[0, 1, 2].map((level) => (
              <div
                key={level}
                className={`w-4 h-4 rounded-full ${
                  currentLevel >= level
                    ? "bg-green-500"
                    : "bg-gray-300"
                }`}
              ></div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          {currentLevel === 0 && <Game level={0} onLevelCompletion={handleLevelCompletion} />}
          {currentLevel === 1 && <Game level={1} onLevelCompletion={handleLevelCompletion} />}
          {currentLevel === 2 && <Game level={2} onLevelCompletion={handleLevelCompletion} />}
        </div>

        {currentLevel > 2 && (
          <div className="text-center mt-6 space-y-3">
            <CheckCircle className="mx-auto w-10 h-10 text-green-600" />
            <h2 className="text-xl font-bold text-green-700">Congratulations!</h2>
            <p className="text-gray-600">You’ve completed all the levels.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PuzzleApp;
