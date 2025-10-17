
import React, { useState } from 'react';
import Flashlight from './Flashlight';
import Compass from './Compass';
import OfflineMaps from './OfflineMaps';
import { Zap, Compass as CompassIcon, Map } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type ToolkitTab = 'flashlight' | 'compass' | 'maps';

const OfflineToolkit: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ToolkitTab>('flashlight');
  const { t } = useTranslation();

  const renderContent = () => {
    switch (activeTab) {
      case 'flashlight': return <Flashlight />;
      case 'compass': return <Compass />;
      case 'maps': return <OfflineMaps />;
      default: return null;
    }
  };

  const tabs = [
    { id: 'flashlight', label: t('flashlight'), icon: Zap },
    { id: 'compass', label: t('compass'), icon: CompassIcon },
    { id: 'maps', label: t('maps'), icon: Map },
  ] as const;

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-around bg-gray-800 rounded-t-lg p-1">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 py-2 px-4 rounded-lg transition-colors ${
              activeTab === tab.id ? 'bg-red-600 text-white' : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            <tab.icon size={20} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
      <div className="flex-grow bg-gray-800 rounded-b-lg p-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default OfflineToolkit;
