import { Stack, Divider, CardMedia, Typography, Box } from '@mui/material';
import driversData from '../data/driversData';
import toOrdinalSuffix from '../utils/utils';

const DriverProfile = ({ driver, points, position }) => {
  const { givenName, familyName, flag, permanentNumber, team } = driver;

  return (
    <Stack
      id="profile-card"
      sx={{
        boxSizing: 'border-box',
        minWidth: 250,
        backgroundColor: 'white',
        paddingTop: 0.5,
        paddingRight: 1,
        paddingLeft: 1,
        margin: '12px 12px 12px 12px',
        position: 'relative',
        '&:hover': {
          outlineColor: `${team.color}`,
          outlineWidth: '7px',
          outlineStyle: 'solid'
        }
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
            <Stack flexDirection={'row'}>
            <Typography variant="profile1" fontSize={40} fontWeight={900}>
              {position}
            </Typography>
            <Typography variant="profile2" fontSize={22} fontWeight={400} mt={1}>
              {toOrdinalSuffix(position)}
            </Typography>
            </Stack>
            <Stack flexDirection={'row'} alignItems={'center'}>
              <Typography variant="profile2" fontSize={30} fontWeight={400}>
                {points}
              </Typography>
              <Typography
                variant="profile2"
                ml={1}
                fontSize={12}
                fontWeight={400}
              >
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
                <Typography
                  variant="profile2"
                  fontSize={14}
                  fontWeight={100}
                  mb={-1}
                >
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
            height="150"
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
              bottom: '0',
              marginBottom: '-15px' //fix this shit
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
