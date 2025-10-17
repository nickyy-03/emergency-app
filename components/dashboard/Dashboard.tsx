
import React from 'react';
import { useAppContext } from '../../context/AppContext';
import BatteryRing from './BatteryRing';
import CommTimer from './CommTimer';
import PowerManagementPanel from './PowerManagementPanel';
import AppIcon from '../apps/AppIcon';
import { useTranslation } from 'react-i18next';

const Dashboard: React.FC = () => {
    const { apps, batteryLevel, setBatteryLevel, isEmergencyMode, toggleEmergencyMode } = useAppContext();
    const { t } = useTranslation();
    const essentialApps = apps.filter(app => app.isEssential).slice(0, 4);

    return (
        <div className="space-y-6">
            <div className="flex justify-center">
                <BatteryRing />
            </div>
            
            <div className="text-center">
                <h2 className="text-gray-400 text-sm">{t('commTimeRemaining')}</h2>
                <CommTimer />
            </div>

            <div className="flex items-center justify-center space-x-3 p-3 bg-gray-800 rounded-full">
                <span className={`font-semibold ${isEmergencyMode ? 'text-red-500' : 'text-gray-400'}`}>{t('emergencyMode')}</span>
                <label htmlFor="emergency-toggle" className="flex items-center cursor-pointer">
                    <div className="relative">
                        <input id="emergency-toggle" type="checkbox" className="sr-only" checked={isEmergencyMode} onChange={toggleEmergencyMode} />
                        <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                        <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${isEmergencyMode ? 'translate-x-full bg-red-500' : ''}`}></div>
                    </div>
                </label>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
                {essentialApps.map(app => (
                    <AppIcon key={app.id} app={app} />
                ))}
            </div>

            <PowerManagementPanel />

            <div className="mt-4">
                <label htmlFor="battery-slider" className="block text-sm font-medium text-gray-300">Simulate Battery Drain ({batteryLevel}%)</label>
                <input
                    id="battery-slider"
                    type="range"
                    min="0"
                    max="100"
                    value={batteryLevel}
                    onChange={(e) => setBatteryLevel(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-500"
                />
            </div>
        </div>
    );
};

export default Dashboard;
