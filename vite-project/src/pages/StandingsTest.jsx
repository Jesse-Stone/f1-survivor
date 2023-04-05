import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import axios from 'axios';
import { getDocs, collection, query } from 'firebase/firestore';
import { Stack } from '@mui/material';
import { groupBy } from 'lodash';
import { CircularProgress, Typography } from '@mui/material';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

function StandingsTest() {
  const [picks, setPicks] = useState([]);
  const [raceResults, setRaceResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const getPicks = async () => {
        const data = await query(getDocs(collection(db, 'picks')));
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

  const groupedData = groupBy(picks, (pick) => pick.name);
  const userPoints = {};

  for (let name in groupedData) {
    const racePicks = groupedData[name];
    for (let i = 0; i < racePicks.length; i++) {
      const { driverId, race } = racePicks[i];
      const raceResult = raceResults.find((result) => result.raceName === race);
      if (raceResult) {
        const result = raceResult.Results.find(
          (result) => result.Driver.driverId === driverId
        );
        if (result) {
          if (!userPoints[name]) {
            userPoints[name] = 0;
          }
          userPoints[name] += parseInt(result.points);
        }
      }
    }
  }

  const userPointsArray = Object.entries(userPoints).map(([id, points]) => ({
    id,
    points
  })).sort((a,b)=> b.points - a.points);

  const columns = [
    { field: 'id', headerName: 'Player', width: 250 },
    { field: 'points', headerName: 'Points', width: 150 }
  ];

  return (
    <>
      {loading && (
        <Stack justifyContent={'center'} alignItems={'center'} height={'80vh'}>
          <CircularProgress sx={{ height: '500px', width: '500px' }} />
        </Stack>
      )}
      {!loading && (
        <Stack alignItems={'center'} justifyContent={'center'}>
          <Typography
            variant="f1"
            fontSize={30}
            mb={10}
            sx={{
              '@media (min-width:550px)': {
                fontSize: '60px'
              }
            }}
          >
            STANDINGS
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 250 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontFamily: 'f1bold', width:'10px' }}>Rank</TableCell>
                  <TableCell sx={{ fontFamily: 'f1bold' }}>Player</TableCell>
                  <TableCell sx={{ fontFamily: 'f1bold' }} align="right">
                    Points
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ fontFamily: 'f1bold' }}>
                {userPointsArray.map((row, index) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      fontFamily: 'f1',
                      '&:last-child td, &:last-child th': { border: 0 }
                    }}
                  >
                    <TableCell>
                      {index === 0 ? (
                        <EmojiEventsIcon sx={{ color: '#FFD700' }} />
                      ) : index === 1 ? (
                        <EmojiEventsIcon sx={{color:"#C0C0C0"}} />
                      ) : index === 2 ? (
                        <EmojiEventsIcon sx={{color:"#CD7F32"}} />
                      ) : (
                        index + 1
                      )}
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'f1' }}>{row.id}</TableCell>

                    <TableCell sx={{ fontFamily: 'f1' }} align="right">
                      {row.points}
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
}

export default StandingsTest;
