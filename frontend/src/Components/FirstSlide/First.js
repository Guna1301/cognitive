import React from 'react';
import { useNavigate } from "react-router-dom"; 
import img from '../FirstSlide/trafalgar-header illustration 1.png';
import ExampleComponent from './typeanimation';

function FirstLayout() {
  const navigate = useNavigate();

  return (
    <div className="px-6 py-12 bg-white dark:bg-gray-900 transition-all duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
        
        {/* Left Content */}
        <div className="flex flex-col items-start space-y-6">
          <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight text-gray-800 dark:text-white">
            Virtual healthcare for you
          </h1>

          <ExampleComponent />

          <button
            onClick={() => navigate('/selectionpage')}
            className="mt-4 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition duration-300 shadow-md"
          >
            Take A Survey
            <ion-icon name="newspaper-outline"></ion-icon>
          </button>
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <img
            src={img}
            alt="Virtual Healthcare"
            className="max-w-full h-auto object-contain drop-shadow-xl"
          />
        </div>
      </div>
    </div>
  );
}

export default FirstLayout;
