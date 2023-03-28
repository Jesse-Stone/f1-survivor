import { Box, Stack, Typography, Button } from '@mui/material';
import {signInWithPopup } from 'firebase/auth'
import {auth, googleAuthProvider} from '../config/firebase'

const Login = () => {

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider)
    }catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <Stack
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Typography
          variant="profile"
          fontSize={30}
          mt={3}
          sx={{
            '@media (min-width:550px)': {
              fontSize: '60px'
            }
          }}
        >
          FORMULA 1 // SURVIVOR
        </Typography>
        <Button onClick = {signInWithGoogle}>
          LOGIN
        </Button>
      </Stack>
    </>
  );
};

export default Login;
