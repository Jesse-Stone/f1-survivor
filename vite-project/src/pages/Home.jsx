import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import axios from 'axios';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { Stack } from '@mui/material';
import { groupBy } from 'lodash';
import { auth } from '../config/firebase';
import { CircularProgress, Typography } from '@mui/material';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const Home = () => {
  const [picks, setPicks] = useState([]);
  const [raceResults, setRaceResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [joidnedResults, setJoinedResults] = useState([])

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
    const raceResult = raceResults.find(result => result.raceName === raceName);
    const driverResult = raceResult?.Results?.find(result => result.Driver.driverId === driverId);
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
          <h4>
            demo..style table later
          </h4>
          <div>
      <h2>Picks Table</h2>
      <table>
        <thead>
          <tr>
            <th>Race</th>
            <th>Driver</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {picks.map(pick => (
            <tr key={pick.id}>
              <td>{pick.race}</td>
              <td>{pick.driverId}</td>
              <td>{getDriverPoints(pick.race, pick.driverId)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
        </Stack>
      )}
    </>
  );
};

export default Home;
