
import { useState, useEffect } from 'react';

export const useCountUp = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const startTime = Date.now();

    const timer = setInterval(() => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const currentCount = Math.floor(progress * end);
      setCount(currentCount);

      if (progress === 1) {
        clearInterval(timer);
      }
    }, 25);

    return () => clearInterval(timer);
  }, [end, duration]);

  return count;
};
