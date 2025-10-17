
import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { useTranslation } from 'react-i18next';

const Feedback: React.FC = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState('');
  const { addToast } = useAppContext();
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    console.log({ rating, text });
    addToast(t('feedbackThanks'));
    setRating(0);
    setText('');
  };

  return (
    <div className="p-4 bg-gray-800 rounded-2xl h-full flex flex-col">
      <h2 className="text-xl font-bold mb-4">{t('feedback')}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col flex-grow space-y-4">
        <div className="flex justify-center space-x-2 mb-4">
          {[1, 2, 3, 4, 5].map(star => (
            <Star
              key={star}
              size={32}
              className={`cursor-pointer transition-colors ${
                (hoverRating || rating) >= star ? 'text-yellow-400' : 'text-gray-600'
              }`}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(star)}
              fill={(hoverRating || rating) >= star ? 'currentColor' : 'none'}
            />
          ))}
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Tell us what you think..."
          className="flex-grow w-full p-3 bg-gray-700 text-white rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <button
          type="submit"
          disabled={!rating}
          className="w-full py-3 bg-red-600 rounded-lg font-semibold hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
        >
          {t('submit')}
        </button>
      </form>
    </div>
  );
};

export default Feedback;
