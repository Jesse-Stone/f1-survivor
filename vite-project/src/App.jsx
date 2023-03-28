import './App.css'
import { QueryClient, QueryClientProvider } from 'react-query';
import React from 'react';
import NavBar from './components/NavBar';
import DriverPicker from './pages/DriverPicker';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path='/' Component={DriverPicker} exact></Route>
      </Routes>
   </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
