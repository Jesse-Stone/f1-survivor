import { Stack, Divider, CardMedia, Typography, Box } from '@mui/material';
import driversData from '../data/driversData';

const DriverProfile = ({ driver }) => {
  const { givenName, familyName, flag, permanentNumber, team } = driver;
  return (
    <Stack
      sx={{
        minWidth: 300,
        backgroundColor: 'white',
        paddingTop: 0.5,
        paddingRight: 1,
        paddingLeft: 1,
        margin: '5px 5px 5px 5px'
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
            <Typography variant="profile" fontSize={40}>1</Typography>
            <Stack flexDirection={'row'} alignItems={'center'}>
            <Typography variant="profile" fontSize={40}>69</Typography>
            <Typography variant="profile" ml={1} fontSize={16}>Points</Typography>
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
                <Typography fontSize={14} fontWeight={100}>
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
          <Typography variant="body2" color="text.secondary">
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
            sx={{ objectFit: 'scale-down', paddingLeft: '35px' }}
          />
          <Box
            sx={{
              position: 'absolute',
              zIndex: '10',
              paddingTop: '275px',
              paddingLeft: '20px'
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
