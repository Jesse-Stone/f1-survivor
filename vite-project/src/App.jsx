// import './App.css'
import { QueryClient, QueryClientProvider,} from 'react-query'
import { Box, Grid, Stack, Typography } from '@mui/material'
import DriverProfile from './components/DriverProfile'
import driversData from './data/driversData'

const queryClient = new QueryClient()


function App() {

  return (
    <QueryClientProvider client={queryClient}>
    {/* <img src="/f1_favicon.png" alt="image" width="250" height="250" /> */}
    <>
    <Typography variant={'h3'} mb={5}>Pick Your Driver</Typography>
    <Grid justifyContent="center" container spacing={2}>
        {driversData.Drivers.map(driver => <DriverProfile key={driver.driverId} driver={driver} />)}
    </Grid>
    </>
    </QueryClientProvider>
  )
}

export default App
