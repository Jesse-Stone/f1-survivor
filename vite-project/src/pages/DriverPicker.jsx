import { Grid, Stack, Typography } from '@mui/material';
import DriverProfile from '../components/DriverProfile';
import driversData from '../data/driversData';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CountdownClock from '../components/CountdownClock';
import CircularProgress from '@mui/material/CircularProgress';
import { db } from '../config/firebase';
import { getDocs, collection } from 'firebase/firestore';

const DriverPicker = () => {
  const [data, setData] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qualResults, setQualResults] = useState(null);
  const [picks, setPicks] = useState([]);

  const picksCollectionRef = collection(db, 'picks');

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        'https://ergast.com/api/f1/2023/results.json'
      );
      setData(response.data.MRData.RaceTable.Races);
      const scheduleResponse = await axios.get(
        'https://ergast.com/api/f1/current/next.json'
      );
      setSchedule(scheduleResponse.data.MRData.RaceTable.Races[0]);
      const qualifyingResponse = await axios.get(
        'https://ergast.com/api/f1/current/next/qualifying.json'
      );
      setQualResults(
        qualifyingResponse.data.MRData.RaceTable.Races[0].QualifyingResults
      );
      const getPicks = async () => {
        try {
          const data = await getDocs(picksCollectionRef);
          const filteredData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
          }));
          setPicks(filteredData);
        } catch (err) {
          console.log(err);
        }
      };
      const promises = [
        response,
        scheduleResponse,
        qualifyingResponse,
        getPicks()
      ];
      await Promise.all(promises);
      setLoading(false);
    };
    fetchData();
  }, []);

  const groupedData = data.reduce((acc, race) => {
    race.Results.forEach((result) => {
      const driver = result.Driver.driverId;
      if (!acc[driver]) {
        acc[driver] = { driver, points: 0 };
      }
      acc[driver].points += parseInt(result.points);
    });
    return acc;
  }, {});

  const sortedData = Object.values(groupedData).sort(
    (a, b) => b.points - a.points
  );

  const joinedArray = driversData.Drivers.map((item1) => ({
    ...item1,
    ...sortedData.find((item2) => item2.driver === item1.driverId)
  }));

  const shouldLockPick = (pick, date) => {
    return new Date(`${pick.date}T${pick.time}`) <= new Date(date)
  }

  return (
    <>
      {loading && (
        <Stack justifyContent={'center'} alignItems={'center'} height={'80vh'}>
          <CircularProgress sx={{ height: '500px', width: '500px' }} />
        </Stack>
      )}

      {!loading && (
        <>
          {console.log(picks)}
          <Stack
            justifyContent={'center'}
            flexDirection={'column'}
            alignItems={'center'}
          >
            <Typography
              variant="f1"
              fontSize={25}
              sx={{
                '@media (min-width:850px)': {
                  fontSize: '60px'
                }
              }}
            >
              PICK YOUR DRIVER
            </Typography>
            <Typography
              variant="f1bold"
              fontSize={17}
              sx={{
                '@media (min-width:850px)': {
                  fontSize: '40px'
                }
              }}
            >
              {schedule.raceName}
            </Typography>
            <Stack
              direction={'column'}
              alignItems={'center'}
              sx={{
                '@media (min-width:850px)': {
                  flexDirection: 'row'
                }
              }}
            >
              <Stack direction={'column'} alignItems={'center'}>
                <Typography variant={'f1bold'} fontSize={14}>
                  Until Qualifying
                </Typography>

                <CountdownClock
                  targetDate={
                    schedule
                      ? new Date(
                          `${schedule.Qualifying.date}T${schedule.Qualifying.time}`
                        )
                      : new Date()
                  }
                />
              </Stack>
              <Stack direction={'column'} alignItems={'center'}>
                <Typography variant={'f1bold'} fontSize={14}>
                  Until Race
                </Typography>

                <CountdownClock
                  targetDate={
                    schedule
                      ? new Date(`${schedule.date}T${schedule.time}`)
                      : new Date()
                  }
                />
              </Stack>
            </Stack>
          </Stack>
          {console.log(new Date(`${schedule.Qualifying.date}T${schedule.Qualifying.time}`) <= new Date())}
          <Grid justifyContent={'center'} container spacing={0}>
            {driversData.Drivers.map((driver) => (
              <DriverProfile
                key={driver.driverId}
                driver={driver}
                points={
                  joinedArray.find(
                    (result) => result.driverId === driver.driverId
                  ).points
                }
                position={
                  sortedData.findIndex(
                    (obj) => obj.driver === driver.driverId
                  ) + 1
                }
                race={schedule.raceName}
                qualifying={
                  qualResults.find(
                    (position) => position.Driver.driverId === driver.driverId
                  ).position
                }
                pickLocked={picks.find(
                  (pick) => pick.driverId === driver.driverId
                )}
              />
            ))}
          </Grid>
        </>
      )}
    </>
  );
};

export default DriverPicker;
