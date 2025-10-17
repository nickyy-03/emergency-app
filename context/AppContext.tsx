
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { AppInfo } from '../types';
import { ALL_APPS } from '../constants';
import { useTranslation } from 'react-i18next';

interface AppContextType {
  batteryLevel: number;
  setBatteryLevel: (level: number) => void;
  isEmergencyMode: boolean;
  toggleEmergencyMode: () => void;
  apps: AppInfo[];
  setApps: (apps: AppInfo[]) => void;
  communicationTime: number; // in seconds
  setCommunicationTime: React.Dispatch<React.SetStateAction<number>>;
  addToast: (message: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { t } = useTranslation();
  const [batteryLevel, setBatteryLevel] = useState(18);
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const [apps, setApps] = useState<AppInfo[]>(ALL_APPS);
  const [communicationTime, setCommunicationTime] = useState(2 * 60 * 60); // 2 hours in seconds
  const [toasts, setToasts] = useState<{ id: number; message: string }[]>([]);

  useEffect(() => {
    if (batteryLevel < 20) {
      setIsEmergencyMode(true);
      addToast(t('emergencyModeAutoActivated'));
    } else {
      setIsEmergencyMode(false);
    }
  }, [batteryLevel, t]);
  
  const toggleEmergencyMode = () => {
    setIsEmergencyMode(prev => !prev);
    addToast(isEmergencyMode ? t('emergencyModeDeactivated') : t('emergencyModeActivated'));
  };

  const addToast = (message: string) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts(currentToasts => currentToasts.filter(toast => toast.id !== id));
    }, 3000);
  };

  const value = {
    batteryLevel,
    setBatteryLevel,
    isEmergencyMode,
    toggleEmergencyMode,
    apps,
    setApps,
    communicationTime,
    setCommunicationTime,
    addToast,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map(toast => (
          <div key={toast.id} className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-fadeInUp">
            {toast.message}
          </div>
        ))}
      </div>
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
