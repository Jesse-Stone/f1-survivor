import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { getDocs, collection, query } from 'firebase/firestore';




import { groupBy } from 'lodash';
import { Stack } from '@mui/system';
import { Typography } from '@mui/material';

function StandingsTest() {
  const [picks, setPicks] = useState([]);
  const [raceResults, setRaceResults] = useState([]);

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
      getPicks();
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
    points,
  }));

for(let i in userPointsArray) {
  console.log(userPointsArray[i].id)
}


  const columns = [
    { field: 'id', headerName: 'Player', width: 250 },
    { field: 'points', headerName: 'Points', width: 150 },
  ];

  return (
    <Stack alignItems={'center'} justifyContent={'center'}>
        <Typography
          variant="f1"
          fontSize={30}
          mb={20}
          sx={{
            '@media (min-width:550px)': {
              fontSize: '60px'
            }
          }}
        >
          STANDINGS
        </Typography>
      <DataGrid
        rows={userPointsArray}
        columns={columns}
        width={'30%'}
        sortModel={[{ field: 'points', sort: 'desc' }]}
        rowsPerPageOptions={10}
        autoHeight
        sortable={false}
        style={{ color: 'white' }}
        labelRowsPerPage={""}
      />
    </Stack>
  );
}

export default StandingsTest;
