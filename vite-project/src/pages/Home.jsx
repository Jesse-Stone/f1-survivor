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
          variant="profile"
          fontSize={30}
          sx={{
            '@media (min-width:850px)': {
              fontSize: '60px'
            }
          }}
        >
          HOME
        </Typography>
      </Stack>
    </>
  );
};

export default Home;
