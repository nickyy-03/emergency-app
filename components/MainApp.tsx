
import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { useAppContext } from '../context/AppContext';
import BottomNav from './shared/BottomNav';
import Header from './shared/Header';
import Dashboard from './dashboard/Dashboard';
import AppManagement from './apps/AppManagement';
import OfflineToolkit from './toolkit/OfflineToolkit';
import Settings from './settings/Settings';
import Feedback from './feedback/Feedback';
import SosModal from './modals/SosModal';

type View = 'dashboard' | 'apps' | 'toolkit' | 'settings' | 'feedback';

interface MainAppProps {
  user: User;
  onLogout: () => void;
}

const MainApp: React.FC<MainAppProps> = ({ user, onLogout }) => {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const { batteryLevel } = useAppContext();
  const [showSosModal, setShowSosModal] = useState(false);

  useEffect(() => {
    if (batteryLevel <= 5) {
      setShowSosModal(true);
    } else {
      setShowSosModal(false);
    }
  }, [batteryLevel]);

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'apps':
        return <AppManagement />;
      case 'toolkit':
        return <OfflineToolkit />;
      case 'settings':
        return <Settings />;
      case 'feedback':
        return <Feedback />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 rounded-3xl overflow-hidden border-4 border-gray-700">
      <Header onLogout={onLogout} />
      <main className="flex-grow overflow-y-auto p-4">
        {renderView()}
      </main>
      <BottomNav activeView={activeView} setActiveView={setActiveView} />
      {showSosModal && <SosModal onClose={() => setShowSosModal(false)} />}
    </div>
  );
};

export default MainApp;
