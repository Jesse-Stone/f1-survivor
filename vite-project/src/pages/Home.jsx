import { Box, Stack, Typography } from '@mui/material';

const Home = () => {
  return (
    <>
      <Stack
        flexDirection={'row'}
        justifyContent={'center'}
        alignItems={'center'}
      >
                  <Typography variant="profile" fontSize={30} mt={3} sx = {{ '@media (min-width:550px)': {
            fontSize: '60px'
          },

          }}>
            FORMULA 1  // SURVIVOR
          </Typography>
      </Stack>
    </>
  );
};

export default Home;
