import { Stack, Typography } from '@mui/material';

const Home = () => {
  return (
    <>
      <Stack
        flexDirection={'row'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Typography
          variant="f1"
          fontSize={30}
          sx={{
            '@media (min-width:850px)': {
              fontSize: '60px'
            }
          }}
        >
          HOME
          Table with Track, driver pick, points placeholder
        </Typography>
      </Stack>
    </>
  );
};

export default Home;
