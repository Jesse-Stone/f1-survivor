// import './App.css'
import { QueryClient, QueryClientProvider } from 'react-query';
import { Grid, Stack, Box, Typography } from '@mui/material';
import DriverProfile from './components/DriverProfile';
import driversData from './data/driversData';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import DriverPicker from './pages/DriverPicker';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' Component={DriverPicker} exact></Route>
      </Routes>
   </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
