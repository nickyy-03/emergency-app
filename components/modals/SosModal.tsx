
import React, { useState, useEffect, useRef } from 'react';
import { EMERGENCY_CONTACTS } from '../../constants';
import { useTranslation } from 'react-i18next';
import { Siren, MapPin, Clock, CheckCircle } from 'lucide-react';

interface SosModalProps {
  onClose: () => void;
}

const SosModal: React.FC<SosModalProps> = ({ onClose }) => {
  const [countdown, setCountdown] = useState(3);
  const [isSent, setIsSent] = useState(false);
  const { t } = useTranslation();
  const audioRef = useRef<HTMLAudioElement>(null);


  useEffect(() => {
    if (audioRef.current) {
        audioRef.current.play().catch(e => console.error("Audio play failed:", e));
    }
    
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (!isSent) {
      setIsSent(true);
    }
  }, [countdown, isSent]);

  return (
    <div className="fixed inset-0 bg-red-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-pulseRed">
      <div className="bg-gray-800 border-2 border-red-500 rounded-2xl p-6 text-center w-full max-w-sm">
        <Siren className="mx-auto w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2 text-red-400">{t('criticalBatteryTitle')}</h2>
        
        <div className="bg-gray-700 rounded-lg p-3 my-4 space-y-2 text-left text-sm">
            <div className="flex items-center">
                <MapPin size={16} className="mr-2 text-red-400"/>
                <span>Lat: 34.0522, Lng: -118.2437</span>
            </div>
            <div className="flex items-center">
                <Clock size={16} className="mr-2 text-red-400"/>
                <span>{new Date().toLocaleString()}</span>
            </div>
        </div>

        <p className="text-gray-300 mb-4">Sending to emergency contacts:</p>
        <div className="flex justify-center space-x-4 mb-6">
          {EMERGENCY_CONTACTS.map(contact => (
            <div key={contact.id} className="flex flex-col items-center">
              <img src={contact.avatarUrl} alt={contact.name} className="w-12 h-12 rounded-full border-2 border-red-500" />
              <span className="text-xs mt-1">{contact.name}</span>
            </div>
          ))}
        </div>

        {isSent ? (
          <div className="flex flex-col items-center text-green-400">
            <CheckCircle size={48} className="mb-2"/>
            <p className="font-bold text-lg">{t('sosSent')}</p>
            <button onClick={onClose} className="mt-4 py-2 px-6 bg-gray-600 rounded-lg">Close</button>
          </div>
        ) : (
          <div className="text-red-400 text-xl font-bold">
            {t('sendingSosIn', { count: countdown })}
          </div>
        )}
        <audio ref={audioRef} src="https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg" loop/>
      </div>
    </div>
  );
};

export default SosModal;
