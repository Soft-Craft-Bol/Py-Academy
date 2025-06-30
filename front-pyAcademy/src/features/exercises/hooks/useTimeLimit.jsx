//React
import { useState, useEffect } from 'react';

export const useTimeLimit = (timeLimit) => {
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [timerStarted, setTimerStarted] = useState(false);

  useEffect(() => {
    if (!timerStarted || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timerStarted, timeLeft]);
  return {
    timeLeft,
    timerStarted,
    setTimerStarted,
  };
};
