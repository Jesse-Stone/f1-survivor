import { Stack, Typography } from '@mui/material';

const Home = () => {
  return (
    <>
      <Stack
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
        </Typography>
        <Typography variant="profile2">
          TBD info here...rules, real life standings/stats/news?
        </Typography>
      </Stack>
    </>
  );
};

export default Home;
