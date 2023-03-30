import { Box, Stack, Typography, Button } from '@mui/material';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleAuthProvider } from '../config/firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider);
      navigate('/home');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Stack justifyContent={'center'} alignItems={'center'} height={'80vh'}>
        <Stack justifyContent={'center'} alignItems={'center'}>
          <Typography
            variant="profile"
            fontSize={30}
            sx={{
              '@media (min-width:550px)': {
                fontSize: '60px'
              }
            }}
          >
            FORMULA 1 // SURVIVOR
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={signInWithGoogle}
          >
            LOGIN
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default Login;
