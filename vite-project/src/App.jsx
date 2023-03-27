// import './App.css'
import { QueryClient, QueryClientProvider } from 'react-query';
import { Grid, Stack, Typography } from '@mui/material';
import DriverProfile from './components/DriverProfile';
import driversData from './data/driversData';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const queryClient = new QueryClient();

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        'https://ergast.com/api/f1/2023/results.json'
      );
      setData(response.data.MRData.RaceTable.Races);
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

  const joinedObject = driversData.Drivers.map((item1) => ({
    ...item1,
    ...sortedData.find((item2) => item2.driver === item1.driverId)
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {/* <img src="/f1_favicon.png" alt="image" width="250" height="250" /> */}
      <>
        {console.log(sortedData)}
        <Stack justifyContent={'center'} flexDirection={'row'}>
          <Typography variant="profile" mb={5} fontSize={40}>
            PICK YOUR DRIVER
          </Typography>
        </Stack>
        <Grid justifyContent="center" container spacing={1} mb={5}>
          {driversData.Drivers.map((driver) => (
            <DriverProfile
              key={driver.driverId}
              driver={driver}
              points={
                joinedObject.find(
                  (result) => result.driverId === driver.driverId
                ).points
              }
              position ={2}
            />
          ))}
        </Grid>
        {/* <div>
      <h1>Results</h1>
      <table>
        <thead>
          <tr>
            <th>Driver</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((result) => (
            <tr key={result.driver}>
              <td>{result.driver}</td>
              <td>{result.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div> */}
      </>
    </QueryClientProvider>
  );
}

export default App;
