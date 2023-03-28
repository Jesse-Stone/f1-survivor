import './App.css'
import { QueryClient, QueryClientProvider } from 'react-query';
import React from 'react';
import NavBar from './components/NavBar';
import DriverPicker from './pages/DriverPicker';
import Home from './pages/Home';
import Standings from './pages/Standings';
import Login from './pages/Login';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

const queryClient = new QueryClient();

const App = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <NavBar/>
      <>
      <Routes>
        <Route path='/' Component={Login} exact></Route>
        <Route path='/standings' Component={Standings} exact></Route>
        <Route path='/makepicks' Component={DriverPicker} exact></Route>
      </Routes>
      </>
   </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
