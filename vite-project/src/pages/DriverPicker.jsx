import { QueryClient, QueryClientProvider } from 'react-query';
import { Grid, Stack, Box, Typography } from '@mui/material';
import DriverProfile from '../components/DriverProfile';
import driversData from '../data/driversData';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/NavBar';

function DriverPicker() {
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

  const joinedArray = driversData.Drivers.map((item1) => ({
    ...item1,
    ...sortedData.find((item2) => item2.driver === item1.driverId)
  }));

  return (
      <>
      <Navbar/>
        <Stack justifyContent={'center'} flexDirection={'row'}>
          <Typography variant="profile" fontSize={50}>
            POOP YOUR DRIVER
          </Typography>
        </Stack>
        <Grid  justifyContent={'center'} container spacing={0} mb={10}>
          {driversData.Drivers.map((driver) => (
            <DriverProfile
              key={driver.driverId}
              driver={driver}
              points={
                joinedArray.find(
                  (result) => result.driverId === driver.driverId
                ).points
              }
              position ={sortedData.findIndex(obj => obj.driver === driver.driverId) + 1}
            />
          ))}
        </Grid>
      </>
  );
}

export default DriverPicker;
