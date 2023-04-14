import React, { useState, useEffect } from 'react';
import { Typography, Stack } from '@mui/material';

const CountdownClock = ({ targetDate }) => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        clearInterval(interval);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setCountdown({ days, hours, minutes, seconds });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <Stack justifyContent={'center'} width={'350px'}>
      <Stack direction={'row'} justifyContent={'space-around'}>
        <Stack justifyContent={'center'} alignItems={'center'}>
        <Typography variant={'profile2'} fontSize={18}>Days</Typography>
        <Typography variant={'f1bold'} fontSize={20}>{countdown.days}</Typography>
        </Stack>
        <Stack justifyContent={'center'} alignItems={'center'}>
        <Typography variant={'profile2'} fontSize={18}>Hours</Typography>
        <Typography variant={'f1bold'} fontSize={20}>: {countdown.hours}</Typography>
        </Stack>
        <Stack justifyContent={'center'} alignItems={'center'}>
        <Typography variant={'profile2'} fontSize={18}>Minutes</Typography>
        <Typography variant={'f1bold'} fontSize={20}>: {countdown.minutes}</Typography>
        </Stack>
        <Stack justifyContent={'center'} alignItems={'center'}>
        <Typography variant={'profile2'} fontSize={18}>Seconds</Typography>
        <Typography variant={'f1bold'} fontSize={20}>: {countdown.seconds}</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CountdownClock;
