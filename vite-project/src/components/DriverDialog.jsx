import Dialog from '@mui/material/Dialog';
import { Stack, Typography, Button, Divider, Box } from '@mui/material';
import { useState } from 'react';
import { addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { getDocs, collection, query } from 'firebase/firestore';
import { auth } from '../config/firebase';

const DriverDialog = (props) => {
  const picksCollectionRef = collection(db, 'picks');

  const { onClose, open, race, color, firstName, team, lastName, driverId } =
    props;
  const [loaded, setLoaded] = useState(false);
  const [pick, setPick] = useState([race, driverId]);
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleClose = () => {
    setDialogOpen(false)
  };

  const handleSubmit = async () => {
    await addDoc(picksCollectionRef, { race: pick[0], driverId: pick[1], userId: auth.currentUser.uid, name: auth.currentUser.displayName });
    window.location.reload(false);
    onClose();
  };

  return (
    <>
      {loaded ? null : (
        <Dialog onClose={onClose} open={open}>
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
              <Divider width={'100%'} />

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
              <Divider width={'100%'} />
            </Stack>
            <Button
              variant={'contained'}
              onClick={handleSubmit}
              sx={{ fontFamily: 'profile2' }}
            >
              Confirm
            </Button>
          </Stack>
        </Dialog>
      )}
    </>
  );
};

export default DriverDialog;
