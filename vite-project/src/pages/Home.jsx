import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import axios from 'axios';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { Stack } from '@mui/material';
import { auth } from '../config/firebase';
import { CircularProgress, Typography } from '@mui/material';
import driversData from '../data/driversData';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Home = () => {
  const [picks, setPicks] = useState([]);
  const [raceResults, setRaceResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const picksCollectionRef = collection(db, 'picks');
      const getPicks = async () => {
        const data = await getDocs(
          query(picksCollectionRef, where('userId', '==', auth.currentUser.uid))
        );
        setPicks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
      const resultsResponse = await axios.get(
        'https://ergast.com/api/f1/current/results.json?limit=1000'
      );
      setRaceResults(resultsResponse.data.MRData.RaceTable.Races);
      const promises = [resultsResponse, getPicks()];
      await Promise.all(promises);
      setLoading(false);
    };
    fetchData();
  }, []);

  const getDriverPoints = (raceName, driverId) => {
    const raceResult = raceResults.find(
      (result) => result.raceName === raceName
    );
    const driverResult = raceResult?.Results?.find(
      (result) => result.Driver.driverId === driverId
    );
    return driverResult?.points || '-';
  };

  return (
    <>
      {loading && (
        <Stack justifyContent={'center'} alignItems={'center'} height={'80vh'}>
          <CircularProgress sx={{ height: '500px', width: '500px' }} />
        </Stack>
      )}
      {!loading && (
        <Stack
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Typography
            variant="f1"
            fontSize={30}
            sx={{
              '@media (min-width:850px)': {
                fontSize: '60px'
              }
            }}
          >
            HOME
          </Typography>
          <Typography
            variant="f1"
            fontSize={14}
            mb={1}
            sx={{
              '@media (min-width:850px)': {
                fontSize: '28px'
              }
            }}
          >
            Your Picks
          </Typography>

          <TableContainer component={Paper} sx={{maxWidth:'600px'}}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontFamily: 'f1bold', width: '300px' }}>
                    Race
                  </TableCell>
                  <TableCell sx={{ fontFamily: 'f1bold' }}>Driver</TableCell>
                  <TableCell sx={{ fontFamily: 'f1bold' }} align='right'>
                    Points
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ fontFamily: 'f1bold' }}>
                {picks.map((pick) => (
                  <TableRow
                    key={pick.id}
                    sx={{
                      fontFamily: 'f1',
                      '&:last-child td, &:last-child th': { border: 0 }
                    }}
                  >
                    <TableCell sx={{ fontFamily: 'f1' }}>{pick.race}</TableCell>
                    <TableCell sx={{ fontFamily: 'f1'}}>{driversData.Drivers.find((driver) => driver.driverId === pick.driverId).familyName}</TableCell>
                    <TableCell sx={{ fontFamily: 'f1' }} align='right'>
                      {getDriverPoints(pick.race, pick.driverId)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      )}
    </>
  );
};

export default Home;
