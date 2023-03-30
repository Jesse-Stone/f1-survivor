import { Box, Stack, Typography, Button } from '@mui/material';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleAuthProvider } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import GoogleButton from 'react-google-button'

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
            variant="f1bold"
            fontSize={30}
            sx={{
              '@media (min-width:550px)': {
                fontSize: '65px'
              }
            }}
          >
            FORMULA 1
          </Typography>
          <Typography
            variant="f1"
            fontSize={20}
            sx={{
              '@media (min-width:550px)': {
                fontSize: '45px'
              }
            }}
          >
            SURVIVOR
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            onClick={signInWithGoogle}
            sx= {{
              width: '30%',
              height:'40%',
              mt: 2
            }}
          >
            Login
          </Button>
          {/* <GoogleButton
  onClick={signInWithGoogle}
/> */}
        </Stack>
      </Stack>
    </>
  );
};

export default Login;
