
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { AppInfo } from '../../types';
import { useTranslation } from 'react-i18next';
import { Search, Save } from 'lucide-react';

const AppCard: React.FC<{ app: AppInfo; onDragStart: (e: React.DragEvent<HTMLDivElement>, app: AppInfo) => void; }> = ({ app, onDragStart }) => (
    <div
        draggable
        onDragStart={(e) => onDragStart(e, app)}
        className="flex items-center space-x-3 p-2 bg-gray-700 rounded-lg cursor-grab active:cursor-grabbing"
    >
        <app.Icon size={24} />
        <span>{app.name}</span>
    </div>
);

const DropZone: React.FC<{ title: string; onDrop: (e: React.DragEvent<HTMLDivElement>) => void; children: React.ReactNode; }> = ({ title, onDrop, children }) => {
    const [isOver, setIsOver] = useState(false);
    return (
        <div 
            onDragOver={(e) => { e.preventDefault(); setIsOver(true); }}
            onDragLeave={() => setIsOver(false)}
            onDrop={(e) => { onDrop(e); setIsOver(false); }}
            className={`flex-1 p-4 bg-gray-800 rounded-xl space-y-3 transition-colors ${isOver ? 'bg-gray-600' : ''}`}
        >
            <h3 className="font-bold text-center mb-2">{title}</h3>
            <div className="space-y-2 min-h-[200px]">{children}</div>
        </div>
    );
};

const Settings: React.FC = () => {
    const { apps, setApps, addToast } = useAppContext();
    const [searchTerm, setSearchTerm] = useState('');
    const [essential, setEssential] = useState<AppInfo[]>([]);
    const [restricted, setRestricted] = useState<AppInfo[]>([]);
    const { t } = useTranslation();

    useEffect(() => {
        const filtered = apps.filter(app => app.name.toLowerCase().includes(searchTerm.toLowerCase()));
        setEssential(filtered.filter(a => a.isEssential));
        setRestricted(filtered.filter(a => !a.isEssential));
    }, [apps, searchTerm]);

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, app: AppInfo) => {
        e.dataTransfer.setData('appId', app.id);
    };

    const handleDrop = (isEssentialZone: boolean) => {
        return (e: React.DragEvent<HTMLDivElement>) => {
            const appId = e.dataTransfer.getData('appId');
            const updatedApps = apps.map(app => 
                app.id === appId ? { ...app, isEssential: isEssentialZone } : app
            );
            setApps(updatedApps);
        };
    };
    
    const handleSave = () => {
        // In a real app, this would persist to a server. Here we just show a toast.
        addToast(t('preferencesSaved'));
    };

    return (
        <div className="h-full flex flex-col space-y-4">
            <h2 className="text-xl font-bold">{t('manageEssentialApps')}</h2>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder={t('searchApps')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-700 text-white rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
            </div>
            <div className="flex-grow flex gap-4 overflow-hidden">
                <DropZone title={t('essentialApps')} onDrop={handleDrop(true)}>
                    {essential.map(app => <AppCard key={app.id} app={app} onDragStart={handleDragStart} />)}
                </DropZone>
                <DropZone title={t('restrictedApps')} onDrop={handleDrop(false)}>
                    {restricted.map(app => <AppCard key={app.id} app={app} onDragStart={handleDragStart} />)}
                </DropZone>
            </div>
            <button onClick={handleSave} className="flex items-center justify-center w-full py-3 px-4 bg-green-600 rounded-lg hover:bg-green-700 transition-colors font-semibold">
                <Save size={20} className="mr-2"/>
                {t('save')}
            </button>
        </div>
    );
};

export default Settings;
