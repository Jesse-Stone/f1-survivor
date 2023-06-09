import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import axios from 'axios';
import { getDocs, collection, query } from 'firebase/firestore';
import { Stack } from '@mui/material';
import { CircularProgress, Typography } from '@mui/material';
import { userPointsArray } from '../utils/utils';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

function Standings() {
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

  const pointsData = userPointsArray(picks, raceResults);

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
                {pointsData.map((row, index) => (
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

export default Standings;
