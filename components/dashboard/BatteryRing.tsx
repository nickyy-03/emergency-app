
import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Battery } from 'lucide-react';

const BatteryRing: React.FC = () => {
  const { batteryLevel } = useAppContext();
  const size = 160;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (batteryLevel / 100) * circumference;

  const getColor = () => {
    if (batteryLevel < 30) return 'text-red-500';
    if (batteryLevel <= 60) return 'text-yellow-400';
    return 'text-green-500';
  };
  
  const getStrokeColor = () => {
    if (batteryLevel < 30) return 'stroke-red-500';
    if (batteryLevel <= 60) return 'stroke-yellow-400';
    return 'stroke-green-500';
  };

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="absolute" width={size} height={size}>
        <circle
          className="text-gray-700"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className={`${getStrokeColor()} transition-all duration-500`}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset,
            transform: 'rotate(-90deg)',
            transformOrigin: 'center',
          }}
        />
      </svg>
      <div className={`flex flex-col items-center ${getColor()}`}>
        <Battery size={32}/>
        <span className="text-4xl font-bold">{batteryLevel}%</span>
      </div>
    </div>
  );
};

export default BatteryRing;
