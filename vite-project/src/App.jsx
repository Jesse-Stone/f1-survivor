import './App.css'
import { QueryClient, QueryClientProvider,} from 'react-query'
import { Box, Grid, Stack, Typography } from '@mui/material'
import DriverProfile from './components/DriverProfile'
import driversData from './data/driversData'

const queryClient = new QueryClient()


function App() {

  return (
    <QueryClientProvider client={queryClient}>
    <div className="App">
    <img src="/f1_favicon.png" alt="image" width="250" height="250" />
    <Stack flexDirection={'row'}>
    <Grid container spacing={2}>
    <Grid item xs={12}>
    {driversData.Drivers.map(driver => <DriverProfile key={driver.driverId} driver={driver} />)}
    </Grid>
    </Grid>
    </Stack>
    </div>
    </QueryClientProvider>
  )
}

export default App
