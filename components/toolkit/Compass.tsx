
import React, { useState, useEffect } from 'react';

const Compass: React.FC = () => {
  const [heading, setHeading] = useState(0);

  // Mock device orientation for demonstration
  useEffect(() => {
    const interval = setInterval(() => {
      setHeading(prev => (prev + 2) % 360);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="relative w-48 h-48 rounded-full bg-gray-700 border-4 border-gray-500 flex items-center justify-center">
        {/* Compass markings */}
        <div className="absolute text-xl font-bold text-red-500 top-1">N</div>
        <div className="absolute text-lg text-white bottom-2">S</div>
        <div className="absolute text-lg text-white left-3">W</div>
        <div className="absolute text-lg text-white right-3">E</div>
        
        {/* Needle */}
        <div
          className="w-1 h-20 transition-transform duration-100 ease-linear"
          style={{ transform: `rotate(${heading}deg)` }}
        >
          <div className="w-full h-1/2 bg-red-500 rounded-t-full"></div>
          <div className="w-full h-1/2 bg-gray-300 rounded-b-full"></div>
        </div>

        <div className="absolute w-4 h-4 bg-gray-900 rounded-full z-10"></div>
      </div>
      <div className="mt-4 text-2xl font-mono bg-gray-900 px-4 py-1 rounded-lg">
        {heading}° N
      </div>
    </div>
  );
};

export default Compass;
