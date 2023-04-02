import { Stack, Typography } from '@mui/material';

const Standings = () => {
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
            '@media (min-width:550px)': {
              fontSize: '60px'
            }
          }}
        >
          STANDINGS
        </Typography>
        
      </Stack>
    </>
  );
};

export default Standings;
