
import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import AppIcon from './AppIcon';
import RestrictedAppModal from '../modals/RestrictedAppModal';
import { AppInfo } from '../../types';
import { useTranslation } from 'react-i18next';

const AppManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'essential' | 'restricted'>('essential');
  const { apps } = useAppContext();
  const [selectedApp, setSelectedApp] = useState<AppInfo | null>(null);
  const { t } = useTranslation();

  const essentialApps = apps.filter(app => app.isEssential);
  const restrictedApps = apps.filter(app => !app.isEssential);

  const handleAppClick = (app: AppInfo) => {
    if (!app.isEssential) {
      setSelectedApp(app);
    }
    // Handle essential app opening logic here if needed
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex border-b border-gray-700 mb-4">
        <button
          onClick={() => setActiveTab('essential')}
          className={`flex-1 py-2 text-center font-semibold transition-colors ${activeTab === 'essential' ? 'text-green-400 border-b-2 border-green-400' : 'text-gray-400'}`}
        >
          {t('essentialApps')}
        </button>
        <button
          onClick={() => setActiveTab('restricted')}
          className={`flex-1 py-2 text-center font-semibold transition-colors ${activeTab === 'restricted' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-400'}`}
        >
          {t('restrictedApps')}
        </button>
      </div>

      <div className="grid grid-cols-4 gap-y-6 gap-x-4 p-2">
        {(activeTab === 'essential' ? essentialApps : restrictedApps).map(app => (
          <div key={app.id} onClick={() => handleAppClick(app)}>
            <AppIcon app={app} />
          </div>
        ))}
      </div>

      {selectedApp && (
        <RestrictedAppModal app={selectedApp} onClose={() => setSelectedApp(null)} />
      )}
    </div>
  );
};

export default AppManagement;
