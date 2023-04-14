import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import React from 'react';
import NavBar from './components/NavBar';
import DriverPicker from './pages/DriverPicker';
import Home from './pages/Home';
import StandingsTest from './pages/Standings';
import Login from './pages/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './config/firebase';

const queryClient = new QueryClient();

const App = () => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {user && <NavBar />}
        <Routes>
          <Route path="/" Component={Login} exact></Route>
          {user && (
            <>
              <Route path="/home" Component={Home} exact></Route>
              <Route path="/standings" Component={StandingsTest} exact></Route>
              <Route path="/makepicks" Component={DriverPicker} exact></Route>
            </>
          )}
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
