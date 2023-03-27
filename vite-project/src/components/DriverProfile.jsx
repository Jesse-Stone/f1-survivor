import { Stack, Divider, Typography, Box } from '@mui/material';
import driversData from '../data/driversData';
import toOrdinalSuffix from '../utils/utils';
import trophy from '../assets/trophy.png';

const DriverProfile = ({ driver, points, position }) => {
  const { givenName, familyName, flag, permanentNumber, team } = driver;

  return (
    <Stack
      id="profile-card"
      sx={{
        boxSizing: 'border-box',
        transition: 'all .2s ease-in-out',
        // maxWidth: 250,
        backgroundColor: 'white',
        // paddingTop: 0.5,
        paddingRight: 1,
        paddingLeft: 1,
        margin: '12px 12px 12px 12px',
        position: 'relative',
        borderRadius: '4px',
        boxShadow: '8px 4px 4px rgba(192,192,192,0.3)',
        '&:hover': {
          outlineColor: `${team.color}`,
          outlineWidth: '7px',
          outlineStyle: 'solid',
          transform: 'scale(1.05)'
        }
      }}
    >
      <Box
        // sx={{backgroundColor: 'rgba(192,192,192,0.3)',
        // height:'50%',
        //   // outlineColor: `${team.color}`,
        //   // outlineWidth: '2px',
        //   // outlineStyle: 'solid',
        //   zIndex: '0',
        // }}
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
                <Typography
                  variant="profile2"
                  fontSize={22}
                  fontWeight={400}
                  mt={1}
                >
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
            <Stack>
              <Box
                component={'img'}
                src={`${
                  driversData.Drivers.find(
                    (drivers) => drivers.givenName === `${driver.givenName}`
                  ).picture
                }`}
                sx={{
                  height: '150px',
                  paddingLeft: '60px',
                  zIndex:'2'
                  // backgroundImage: `url(${trophy})`,
                  // backgroundSize: 'contain',
                  // backgroundRepeat: 'no-repeat'
                }}
              ></Box>
            </Stack>
            <Box
              sx={{
                position: 'absolute',
                bottom: '0',
                marginBottom: '-20px' //fix this shit
              }}
            >
              <Typography
                variant="profile"
                fontSize={70}
                color={`${team.color}`}
              >
                {permanentNumber}
              </Typography>
            </Box>
          </>
        )}
      </Box>
    </Stack>
  );
};

export default DriverProfile;
