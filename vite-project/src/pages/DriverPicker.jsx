import { Divider, Grid, Stack, Typography } from '@mui/material';
import DriverProfile from '../components/DriverProfile';
import driversData from '../data/driversData';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CountdownClock from '../components/CountdownClock';
import CircularProgress from '@mui/material/CircularProgress';
import { db } from '../config/firebase';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { auth } from '../config/firebase';

const DriverPicker = () => {
  const [standings, setStandings] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qualResults, setQualResults] = useState(null);
  const [picks, setPicks] = useState([]);

  const picksCollectionRef = collection(db, 'picks');

  useEffect(() => {
    const fetchData = async () => {
      const standingsResponse = await axios.get(
        'https://ergast.com/api/f1/current/driverStandings.json'
      );
      setStandings(
        standingsResponse.data.MRData.StandingsTable.StandingsLists[0]
          .DriverStandings
      );
      const scheduleResponse = await axios.get(
        'https://ergast.com/api/f1/current/next.json'
      );
      setSchedule(scheduleResponse.data.MRData.RaceTable.Races[0]);
      const qualifyingResponse = await axios
        .get('https://ergast.com/api/f1/current/next/qualifying.json')
        .then((response) => {
          if (response.data.MRData.RaceTable.Races[0].QualifyingResults) {
            setQualResults(
              response.data.MRData.RaceTable.Races[0].QualifyingResults
            );
          } else {
            setQualResults(null);
          }
        })
        .catch((error) => setQualResults(null));
      const getPicks = async () => {
        try {
          const data = await getDocs(
            query(
              picksCollectionRef,
              where('userId', '==', auth.currentUser.uid)
            )
          );
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
        scheduleResponse,
        qualifyingResponse,
        standingsResponse,
        getPicks()
      ];
      await Promise.all(promises);
      setLoading(false);
    };
    fetchData();
  }, []);

  const shouldLockPick = (pick, date) => {
    return new Date(`${pick.date}T${pick.time}`) <= new Date(date);
  };

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
              sx={{
                '@media (min-width:850px)': {
                  flexDirection: 'row',
                  margin: '30px'
                }
              }}
            >
              <Stack alignItems={'center'}>
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
              <Stack>
                <Divider
                  orientation="vertical"
                  sx={{
                    backgroundColor: '#FF1801',
                    height: '0px',
                    '@media (min-width:850px)': {
                      height: '100px',
                      width: '2px'
                    }
                  }}
                />
              </Stack>
              <Stack alignItems={'center'}>
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
          <Grid justifyContent={'center'} container spacing={0}>
            {driversData.Drivers.map((driver) => (
              <DriverProfile
                key={driver.driverId}
                driver={driver}
                points={
                  standings.find((s) => s.Driver.driverId === driver.driverId)
                    .points
                }
                position={
                  standings.find((s) => s.Driver.driverId === driver.driverId)
                    .position
                }
                race={schedule.raceName}
                qualifying={
                  qualResults &&
                  qualResults.find(
                    (position) => position.Driver.driverId === driver.driverId
                  ).position
                }
                pickLocked={picks.find(
                  (pick) => pick.driverId === driver.driverId
                )}
                currentRacePick={true}
              />
            ))}
          </Grid>
        </>
      )}
    </>
  );
};

export default DriverPicker;
