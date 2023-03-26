// import './App.css'
import { QueryClient, QueryClientProvider } from 'react-query';
import { Box, Grid, Stack, Typography } from '@mui/material';
import DriverProfile from './components/DriverProfile';
import driversData from './data/driversData';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <img src="/f1_favicon.png" alt="image" width="250" height="250" /> */}
      <>
        <Stack justifyContent={'center'} flexDirection={'row'}>
          <Typography variant="profile" mb={5} fontSize={40}>
            PICK YOUR DRIVER
          </Typography>
        </Stack>
        <Grid justifyContent="center">
          {driversData.Drivers.map((driver) => (
            <DriverProfile key={driver.driverId} driver={driver} />
          ))}
        </Grid>
      </>
    </QueryClientProvider>
  );
}

export default App;
