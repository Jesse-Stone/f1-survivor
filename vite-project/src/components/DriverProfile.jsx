import { Stack, Divider, CardMedia, Typography, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import driversData from '../data/driversData';
import axios from 'axios';

const DriverProfile = ({ driver }) => {
  const { givenName, familyName, flag, permanentNumber, team } = driver;

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        'https://ergast.com/api/f1/2023/results.json'
      );
      setData(response.data.MRData.RaceTable.Races);
    };
    fetchData();
  }, {});

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
  return (
    <Stack
      sx={{
        minWidth: 300,
        backgroundColor: 'white',
        paddingTop: 0.5,
        paddingRight: 1,
        paddingLeft: 1,
        margin: '5px 5px 5px 5px',
        position: 'relative'
      }}
    >
      {driver && (
        <>
          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            color="black"
            sx={{ padding: 'auto' }}
          >
            <Typography variant="profile" fontSize={48}>
              1
            </Typography>
            <Stack flexDirection={'row'} alignItems={'center'}>
              <Typography variant="profile2" fontSize={30} fontWeight={'bold'}>
              {groupedData ? groupedData?.drivers?.find((drivers) => drivers.driver === driver.driverId ).points : 0}
              {console.log(groupedData)}
              </Typography>
              <Typography variant="profile2" ml={1} fontSize={12}>
                PTS
              </Typography>
            </Stack>
          </Stack>
          <Divider width={'90%'} />
          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            color="black"
            sx={{ padding: 'auto' }}
          >
            <Stack direction={'row'} alignItems={'center'}>
              <Box
                sx={{
                  backgroundColor: `${team.color}`,
                  height: '35px',
                  width: '5px'
                }}
              ></Box>
              <Stack marginLeft={1}>
                <Typography variant="profile2" fontSize={14} fontWeight={100}>
                  {`${givenName}`}
                </Typography>
                <Typography variant="profile" fontSize={22}>
                  {`${familyName}`.toUpperCase()}
                </Typography>
              </Stack>
            </Stack>
            <img src={flag} height={'60'}></img>
          </Stack>
          <Divider width={'40%'} />
          <Typography variant="profile2" color="text.secondary" fontSize={14}>
            {team.name}
          </Typography>
          <CardMedia
            component="img"
            height="200"
            image={`${
              driversData.Drivers.find(
                (drivers) => drivers.givenName === `${driver.givenName}`
              ).picture
            }`}
            alt={driver.code}
            sx={{ objectFit: 'scale-down', paddingLeft: '40px' }}
          />
          <Box
            sx={{
              position: 'absolute',
              zIndex: '10',
              bottom: '0'
            }}
          >
            <Typography variant="profile" fontSize={55} color={`${team.color}`}>
              {permanentNumber}
            </Typography>
          </Box>
        </>
      )}
    </Stack>
  );
};

export default DriverProfile;
