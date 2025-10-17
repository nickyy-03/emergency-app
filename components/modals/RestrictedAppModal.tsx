
import React from 'react';
import { AppInfo } from '../../types';
import { useAppContext } from '../../context/AppContext';
import { useTranslation } from 'react-i18next';
import { ShieldAlert } from 'lucide-react';

interface RestrictedAppModalProps {
  app: AppInfo;
  onClose: () => void;
}

const RestrictedAppModal: React.FC<RestrictedAppModalProps> = ({ app, onClose }) => {
  const { batteryLevel, addToast } = useAppContext();
  const { t } = useTranslation();

  const handleOverride = () => {
    addToast(`${app.name} unlocked for 5 minutes.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 border border-red-500 rounded-2xl p-6 text-center w-full max-w-sm">
        <ShieldAlert className="mx-auto w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-xl font-bold mb-2">{t('appBlockedTitle')}</h2>
        <p className="text-gray-300 mb-6">
          {t('appBlockedMessage', { batteryLevel })}
        </p>
        <div className="flex gap-4">
          <button onClick={onClose} className="flex-1 py-2 px-4 bg-gray-600 rounded-lg hover:bg-gray-500 transition-colors">
            Cancel
          </button>
          <button onClick={handleOverride} className="flex-1 py-2 px-4 bg-red-600 rounded-lg hover:bg-red-700 transition-colors">
            {t('override')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestrictedAppModal;
