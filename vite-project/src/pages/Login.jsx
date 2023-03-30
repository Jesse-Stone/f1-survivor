import { Stack, Typography, Button } from '@mui/material';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleAuthProvider } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import F1Video from '../assets/F1 1980s - The Era of Heroes.mp4';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { IconButton } from '@mui/material';
import { useState } from 'react';

const Login = () => {
  const navigate = useNavigate();
  const [muteIcon, setMuteIcon] = useState(false);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider);
      navigate('/home');
    } catch (err) {
      console.log(err);
    }
  };

  const handleMuteToggle = () => {
    const video = document.getElementById('myVideo');
    video.muted = !video.muted;
    setMuteIcon(!muteIcon);
  };

  return (
    <>
      <video id="myVideo" autoPlay="autoplay" muted loop playsInline>
        <source src={F1Video} type="video/mp4" />
      </video>
      <Stack justifyContent={'center'} alignItems={'center'} height={'80vh'}>
        <Stack justifyContent={'center'} alignItems={'center'}>
          <Typography
            variant="f1bold"
            fontSize={40}
            sx={{
              '@media (min-width:550px)': {
                fontSize: '75px'
              }
            }}
          >
            FORMULA 1
          </Typography>
          <Typography
            variant="f1"
            fontSize={30}
            sx={{
              '@media (min-width:550px)': {
                fontSize: '45px'
              }
            }}
          >
            SURVIVOR
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={signInWithGoogle}
            sx={{
              width: '30%',
              height: '40%',
              mt: 2,
              fontFamily: 'profile2',
              borderRadius: '8px'
            }}
          >
            Sign In
          </Button>
          <IconButton onClick={handleMuteToggle}>
            {muteIcon ? (
              <VolumeUpIcon sx={{ color: 'white' }} />
            ) : (
              <VolumeOffIcon sx={{ color: 'white' }} />
            )}
          </IconButton>
        </Stack>
      </Stack>
    </>
  );
};

export default Login;
