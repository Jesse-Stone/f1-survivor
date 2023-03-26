import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Stack,
  Typography
} from '@mui/material';
import driversData from '../data/driversData';

const DriverProfile = ({driver}) => {
  const { givenName, familyName, nationality, permanentNumber, team } = driver;

  return (
    <Stack sx={{ maxWidth: 300, backgroundColor: 'white' }}>
      {driver && (
        <>
        <Stack direction={'row'} justifyContent={'space-between'} color="black">
          <Stack>
            <Typography variant='h6'>
              {givenName}
            </Typography>
            <Typography variant='h5' fontWeight={'bold'}>
              {familyName}
            </Typography></Stack>     
            {nationality}
          </Stack>
          <CardMedia
            component="img"
            height="140"
            image = {`${driversData.Drivers.find(drivers => drivers.givenName === `${driver.givenName}`).picture}`}
            alt={driver.code}
            sx={{ objectFit: 'scale-down' }}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {permanentNumber}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {team.name}
            </Typography>
          </CardContent>
        </>
      )}
    </Stack>
  );
};

export default DriverProfile;
