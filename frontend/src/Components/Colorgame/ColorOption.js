// ColorOption.js
import React from 'react';

const ColorOption = ({ color, onClick }) => (
  <div
    onClick={onClick}
    className={`w-12 h-12 rounded-full m-2 cursor-pointer border-2 border-gray-200 hover:scale-110 transition-transform duration-200`}
    style={{ backgroundColor: color }}
  ></div>
);

export default ColorOption;
