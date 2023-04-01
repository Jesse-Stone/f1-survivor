import { Stack, Divider, Typography, Box } from '@mui/material';
import driversData from '../data/driversData';
import { toOrdinalSuffix } from '../utils/utils';
import { useState } from 'react';
import DriverDialog from './DriverDialog';

const DriverProfile = ({ driver, points, position, race, qualifying }) => {
  const { givenName, familyName, flag, permanentNumber, team, driverId } =
    driver;

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState([]);

  const handleDriverCardClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // setSelectedValue(value);
  };

  return (
    <>
      {/* {!qualifying && <h1>loading</h1>} */}
      <Stack
        id="profile-card"
        onClick={handleDriverCardClick}
        sx={{
          boxSizing: 'border-box',
          transition: 'all .2s ease-in-out',
          maxWidth: 250,
          backgroundColor: 'white',
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
                    height: '30px',
                    width: '5px'
                  }}
                ></Box>
                <Stack marginLeft={1} justifyContent={'space-between'}>
                  <Typography variant="f1" fontSize={12} fontWeight={100}>
                    {`${givenName}`}
                  </Typography>
                  <Typography variant="f1bold" fontSize={16}>
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
            {qualifying && (
              <Stack direction={'row'} mt={1} mb={-2}>
                <Typography color="text.secondary" fontSize={14}>
                  Q:{qualifying}
                </Typography>
                <Typography color="text.secondary" fontSize={14}>
                {toOrdinalSuffix(qualifying)}
                </Typography>
              </Stack>
            )}

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
                  zIndex: '2'
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
              <Typography
                variant="profile"
                fontSize={70}
                color={`${team.color}`}
              ></Typography>
            </Box>
          </>
        )}
      </Stack>
      <DriverDialog
        race={race}
        open={open}
        color={team.color}
        flag={flag}
        team={team.name}
        onClose={handleClose}
        driver={`${givenName} ${familyName}`}
        firstName={givenName}
        lastName={familyName}
      />
    </>
  );
};

export default DriverProfile;
