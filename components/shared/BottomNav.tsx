
import React from 'react';
import { LayoutGrid, AppWindow, Flashlight, Settings, MessageSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type View = 'dashboard' | 'apps' | 'toolkit' | 'settings' | 'feedback';

interface BottomNavProps {
  activeView: View;
  setActiveView: (view: View) => void;
}

const NavItem: React.FC<{
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon: Icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-full transition-colors duration-200 ${
      isActive ? 'text-red-500' : 'text-gray-400 hover:text-white'
    }`}
  >
    <Icon size={24} />
    <span className="text-xs mt-1">{label}</span>
  </button>
);

const BottomNav: React.FC<BottomNavProps> = ({ activeView, setActiveView }) => {
    const { t } = useTranslation();
    const navItems = [
        { id: 'dashboard', icon: LayoutGrid, label: t('dashboard') },
        { id: 'apps', icon: AppWindow, label: t('apps') },
        { id: 'toolkit', icon: Flashlight, label: t('toolkit') },
        { id: 'settings', icon: Settings, label: t('settings') },
        { id: 'feedback', icon: MessageSquare, label: t('feedback') },
    ] as const;


  return (
    <nav className="flex justify-around items-center p-2 bg-gray-800/50 backdrop-blur-sm border-t border-gray-700 shrink-0">
      {navItems.map(item => (
        <NavItem
          key={item.id}
          icon={item.icon}
          label={item.label}
          isActive={activeView === item.id}
          onClick={() => setActiveView(item.id)}
        />
      ))}
    </nav>
  );
};

export default BottomNav;
