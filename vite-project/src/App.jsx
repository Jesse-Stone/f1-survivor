import { useState } from 'react'
import './App.css'
import DriverList from './components/DriverList'
import { QueryClient, QueryClientProvider,} from 'react-query'

const queryClient = new QueryClient()


function App() {

  return (
    <QueryClientProvider client={queryClient}>
    <div className="App">
      <DriverList/>
    </div>
    </QueryClientProvider>
  )
}

export default App
