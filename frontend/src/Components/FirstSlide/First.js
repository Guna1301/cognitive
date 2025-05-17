import React from 'react';
import { useNavigate } from "react-router-dom"; 
import img from '../FirstSlide/trafalgar-header illustration 1.png';
import ExampleComponent from './typeanimation';

function FirstLayout() {
  const navigate = useNavigate();

  return (
    <div className="px-5 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
        <div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-800">
            Virtual healthcare for you
          </h1>

          <ExampleComponent />

          <div className="mt-6">
            <button
              onClick={() => navigate('/selectionpage')}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition duration-300"
            >
              Take A Survey
              <ion-icon name="newspaper"></ion-icon>
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <img
            src={img}
            alt="Virtual Healthcare"
            className="w-[693px] h-[598px] object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default FirstLayout;
