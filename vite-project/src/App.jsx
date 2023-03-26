import { useState } from 'react'
import './App.css'
import DriverList from './components/DriverList'
import { QueryClient, QueryClientProvider,} from 'react-query'
import { Typography } from '@mui/material'
import DriverProfile from './components/DriverProfile'
import driversData from './data/driversData'

const queryClient = new QueryClient()


function App() {

  return (
    <QueryClientProvider client={queryClient}>
    <div className="App">
    <img src="/f1_favicon.png" alt="image" width="250" height="250" />
    <Typography variant='h3'>Testing API Fetching and Caching</Typography>
      {/* <DriverList/>
      <DriverProfile/> */}
            {driversData.Drivers.map(driver => <DriverProfile key={driver.driverId} driver={driver} />)}

    </div>
    </QueryClientProvider>
  )
}

export default App
