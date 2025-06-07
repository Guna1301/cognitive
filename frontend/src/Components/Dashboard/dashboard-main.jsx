import React, { useEffect, useState } from 'react';
import Sidebar from "./sidebar";
import axios from 'axios';

import attentionIcon from "./assests/attention-icon.png";
import memoryIcon from "./assests/memory-icon 3.png";
import languageIcon from "./assests/language-icon.png";
import reasoningIcon from "./assests/reasoning-icon.png";
import problemSolvingIcon from "./assests/prob-solving-icon.png";
import reflexIcon from "./assests/reaction-icon.png";

import bad from "./assests/attention-down.png";
import avg from "./assests/language-down.png";
import good from "./assests/reaction-down.png";

const categoryNames = ['Attention', 'Memory', 'Language', 'Reasoning', 'Problem-Solving', 'Reflex'];

function DashboardMain() {
  const d = new Date();
  const total = d.toLocaleString("default", { month: "long" }) + " " + d.getDate() + " " + d.getFullYear();

  const [averages, setAverages] = useState({});

  useEffect(() => {
    const fetchUserDetails = async () => {
      const email = localStorage.getItem("email");
      try {
        const response = await axios.get(`https://cognitive-backend.onrender.com/activityset/${email}`);
        const scoresArray = Object.values(response.data.scores);

        const aggregatedScores = {};
        scoresArray.forEach(scoresObj => {
          for (const key in scoresObj) {
            if (scoresObj.hasOwnProperty(key)) {
              if (!aggregatedScores[key]) aggregatedScores[key] = [];
              aggregatedScores[key] = aggregatedScores[key].concat(scoresObj[key]);
            }
          }
        });

        const calculatedAverages = {};
        for (const key in aggregatedScores) {
          const sum = aggregatedScores[key].reduce((acc, val) => acc + (val || 0), 0);
          calculatedAverages[key] = sum / aggregatedScores[key].length;
        }

        setAverages(calculatedAverages);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    fetchUserDetails();
  }, []);


  return (
    <div className="flex flex-row m-3 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div>
        <Sidebar />
      </div>
      <div className="flex-1 p-6 space-y-6 overflow-y-auto text-gray-900 dark:text-gray-100">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">Health Overview</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{total}</p>
        </div>

        <div className="grid grid-cols-3 gap-4 sm:gap-6">
          {categoryNames.map((category, index) => {
            const score = Math.ceil(averages[category]) || 0;
            const status = score >= 8 ? "Good" : score >= 5 ? "Average" : "Bad";
            const statusColor = score >= 8
              ? "text-green-500"
              : score >= 5
              ? "text-yellow-500"
              : "text-red-500";

            return (
              <div key={index} className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-3 sm:p-5 flex flex-col justify-between h-40 sm:h-52">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <img src={getCategoryIcon(category)} alt={category} className="w-10 h-10 sm:w-12 sm:h-12" />
                  <h2 className="text-sm sm:text-lg font-medium text-gray-700 dark:text-gray-200">{category}</h2>
                </div>
                <div className="flex justify-between items-end mt-3 sm:mt-4">
                  <div className="flex flex-col">
                    <span className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">{score}</span>
                    <span className={`text-xs sm:text-sm font-semibold ${statusColor}`}>{status}</span>
                  </div>
                  <img className="w-8 h-8 sm:w-10 sm:h-10" src={getCategoryfooter(status)} alt={status} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>

  );
}

function getCategoryIcon(category) {
  switch (category.toLowerCase()) {
    case 'attention':
      return attentionIcon;
    case 'memory':
      return memoryIcon;
    case 'language':
      return languageIcon;
    case 'reasoning':
      return reasoningIcon;
    case 'problem-solving':
      return problemSolvingIcon;
    case 'reflex':
      return reflexIcon;
    default:
      return null;
  }
}

function getCategoryfooter(category) {
  switch (category.toLowerCase()) {
    case 'bad':
      return bad;
    case 'avg':
      return avg;
    case 'good':
      return good;
    default:
      return null;
  }
}

export default DashboardMain;
