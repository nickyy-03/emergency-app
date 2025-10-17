
import React, { useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { useTimer } from '../../hooks/useTimer';
import { useTranslation } from 'react-i18next';

const CommTimer: React.FC = () => {
  const { communicationTime, setCommunicationTime, addToast } = useAppContext();
  const { t } = useTranslation();
  const { seconds, formattedTime } = useTimer(communicationTime);

  useEffect(() => {
    setCommunicationTime(seconds);
  }, [seconds, setCommunicationTime]);

  useEffect(() => {
    if (seconds === 15 * 60) { // 15 minutes
        addToast(t('commTimeWarning'));
    }
  }, [seconds, addToast, t]);

  const getTimerColor = () => {
    const minutes = seconds / 60;
    if (minutes < 30) return 'text-red-500 animate-pulseRed';
    if (minutes <= 60) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <div className={`text-4xl font-mono font-bold transition-colors ${getTimerColor()}`}>
      {formattedTime}
    </div>
  );
};

export default CommTimer;
