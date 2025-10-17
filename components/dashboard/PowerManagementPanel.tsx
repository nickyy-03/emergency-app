
import React from 'react';
import { Sun, Wifi, XCircle } from 'lucide-react';
import { useCountUp } from '../../hooks/useCountUp';
import { useTranslation } from 'react-i18next';

const PowerManagementPanel: React.FC = () => {
  const killedApps = useCountUp(12, 1500);
  const timeGained = useCountUp(45, 2000);
  const { t } = useTranslation();

  return (
    <div className="p-4 bg-gray-800 rounded-2xl space-y-4">
      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center space-x-2">
          <Sun className="text-yellow-400" size={20} />
          <span>{t('brightness')}</span>
        </div>
        <span className="font-bold">20%</span>
      </div>
      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center space-x-2">
          <Wifi className="text-blue-400" size={20} />
          <span>{t('networkMode')}</span>
        </div>
        <span className="font-bold">3G</span>
      </div>
      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center space-x-2">
          <XCircle className="text-red-500" size={20} />
          <span>{t('bgAppsKilled')}</span>
        </div>
        <span className="font-bold">{killedApps}+</span>
      </div>
      <div className="pt-2 border-t border-gray-700 text-center text-green-400 font-semibold">
        {t('timeGained', { time: timeGained })}
      </div>
    </div>
  );
};

export default PowerManagementPanel;
