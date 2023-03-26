import {
  CardContent,
  Stack,
  Divider,
  CardMedia,
  Typography,
  Box
} from '@mui/material';
import driversData from '../data/driversData';

const DriverProfile = ({driver}) => {
  const { givenName, familyName, flag, permanentNumber, team } = driver;
  return (
    <Stack sx={{ minWidth: 350, backgroundColor: 'white', padding: 1 }}>
      {driver && (
        <>
        <Divider width={'90%'}/>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} color="black" sx={{padding:'auto'}}>
          <Stack direction={'row'} alignItems={'center'}>
            <Box sx={{backgroundColor:'red', height: '35px', width: '5px'}}></Box>
          <Stack marginLeft={1}>
            <Typography fontSize={14} fontWeight={100} >
              {`${givenName}`.toUpperCase()}
            </Typography>
            <Typography variant='profile' fontSize={22}>
            {`${familyName}`.toUpperCase()}
            </Typography>
            </Stack>
            </Stack>     
            <img src={flag} height={'60'}></img>
          </Stack>
          <Divider width={'40%'}/>
          <CardMedia
            component="img"
            height="200"
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
