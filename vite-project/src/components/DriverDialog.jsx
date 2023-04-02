import Dialog from '@mui/material/Dialog';
import { Stack, Typography, Button, Divider, Box } from '@mui/material';
import { useState } from 'react';

const DriverDialog = (props) => {
  const {
    onClose,
    selectedValue,
    open,
    race,
    color,
    firstName,
    team,
    lastName
  } = props;
  const [loaded, setLoaded] = useState(false);

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <>
      {loaded ? null : (
        <Dialog onClose={handleClose} open={open}>
          <Stack
            justifyContent={'space-around'}
            alignItems={'center'}
            height={'175px'}
            width={'300px'}
          >
            <Stack alignItems={'center'}>
            <Typography fontSize={20} variant={'f1bold'}>
              Driver Selection
            </Typography>
            <Typography fontSize={12} variant={'f1'}>
              {race}
            </Typography>
            </Stack>

            <Stack justifyContent={'center'} alignItems={'center'}>
              <Divider width={'100%'}/>

              <Stack
                direction={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
                color="black"
                sx={{ padding: 'auto' }}
              >
                <Stack direction={'row'} alignItems={'center'} width={'200px'}>
                  <Box
                    sx={{
                      backgroundColor: `${color}`,
                      height: '30px',
                      width: '5px'
                    }}
                  ></Box>
                  <Stack marginLeft={1} justifyContent={'space-between'}>
                    <Typography variant="f1" fontSize={12} fontWeight={100}>
                      {`${firstName}`}
                    </Typography>
                    <Typography variant="f1bold" fontSize={16}>
                      {`${lastName}`.toUpperCase()}
                    </Typography>
                  </Stack>
                </Stack>
                <Typography variant="profile2" fontSize={16}>
                  {team}
                </Typography>
              </Stack>
              <Divider width={'100%'}/>
            </Stack>
            <Button variant={'contained'} sx={{ fontFamily: 'profile2' }}>
              Confirm
            </Button>
          </Stack>
        </Dialog>
      )}
    </>
  );
};

export default DriverDialog;
