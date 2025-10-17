
import React from 'react';
import { AppInfo } from '../../types';
import { CheckCircle, Lock } from 'lucide-react';

interface AppIconProps {
  app: AppInfo;
}

const AppIcon: React.FC<AppIconProps> = ({ app }) => {
  const { Icon, name, isEssential } = app;

  return (
    <div className="flex flex-col items-center space-y-2 cursor-pointer group">
      <div className="relative">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gray-800 group-hover:bg-gray-700 transition-colors ${!isEssential && 'grayscale'}`}>
          <Icon size={32} className={isEssential ? 'text-white' : 'text-gray-500'} />
        </div>
        {!isEssential && (
          <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center">
            <Lock className="text-white/70" size={24} />
          </div>
        )}
        <div
          className={`absolute -top-1 -right-1 p-0.5 rounded-full ${
            isEssential ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {isEssential ? <CheckCircle size={16} className="text-white" /> : <Lock size={16} className="text-white" />}
        </div>
      </div>
      <span className="text-xs text-center text-gray-300">{name}</span>
    </div>
  );
};

export default AppIcon;
