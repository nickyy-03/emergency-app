
import React, { useState } from 'react';
import { Zap, ZapOff } from 'lucide-react';

const Flashlight: React.FC = () => {
  const [isOn, setIsOn] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <button
        onClick={() => setIsOn(!isOn)}
        className={`relative w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
          isOn ? 'bg-yellow-300 text-gray-900' : 'bg-gray-700 text-gray-400'
        }`}
      >
        {isOn && <div className="absolute inset-0 rounded-full animate-glow bg-yellow-400/50"></div>}
        {isOn ? <Zap size={64} /> : <ZapOff size={64} />}
      </button>
      <span className={`mt-4 text-lg font-semibold ${isOn ? 'text-yellow-300' : 'text-gray-400'}`}>
        {isOn ? 'ON' : 'OFF'}
      </span>
    </div>
  );
};

export default Flashlight;
