import React, { useState, useEffect } from 'react';
import { Typography, Stack} from '@mui/material';

const CountdownClock = ({ targetDate }) => {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        clearInterval(interval);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setCountdown({ days, hours, minutes, seconds });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <Stack direction={'row'} justifyContent={'space-around'}>
      <Typography variant={'f1'}>{countdown.days}:</Typography>
      <Typography variant={'f1'}>{countdown.hours}:</Typography>
      <Typography variant={'f1'}>{countdown.minutes}:</Typography>
      <Typography variant={'f1'}>{countdown.seconds}</Typography>
    </Stack>
  );
};

export default CountdownClock;
