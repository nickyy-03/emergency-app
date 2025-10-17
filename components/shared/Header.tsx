
import React from 'react';
import { useTranslation } from 'react-i18next';
import { LogOut, Globe } from 'lucide-react';

interface HeaderProps {
    onLogout: () => void;
}

const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'ar', name: 'العربية' },
    { code: 'zh', name: '中文' },
    { code: 'fr', name: 'Français' },
];

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
    const { i18n, t } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <header className="flex items-center justify-between p-4 bg-gray-800/50 backdrop-blur-sm shrink-0">
            <h1 className="text-xl font-bold text-red-500">{t('appName')}</h1>
            <div className="flex items-center space-x-4">
                <div className="relative">
                    <Globe className="absolute left-2 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                        value={i18n.language}
                        onChange={(e) => changeLanguage(e.target.value)}
                        className="pl-8 pr-2 py-1 bg-gray-700 border border-gray-600 rounded-md text-white appearance-none focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        {languages.map(lang => (
                            <option key={lang.code} value={lang.code}>{lang.name}</option>
                        ))}
                    </select>
                </div>
                <button onClick={onLogout} title={t('logout')} className="p-2 text-gray-300 hover:text-white hover:bg-red-600 rounded-full transition-colors">
                    <LogOut size={20} />
                </button>
            </div>
        </header>
    );
};

export default Header;
