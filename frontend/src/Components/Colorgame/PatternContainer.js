// PatternContainer.js
import React from 'react';

const PatternContainer = ({ id, pattern }) => (
  <div id={id} className="flex gap-4 justify-center my-4">
    {pattern.map((color, index) => (
      <div
        key={index}
        className="w-12 h-12 rounded-full border border-gray-300"
        style={{ backgroundColor: color }}
      ></div>
    ))}
  </div>
);

export default PatternContainer;
