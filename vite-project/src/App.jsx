import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import React from 'react';
import NavBar from './components/NavBar';
import DriverPicker from './pages/DriverPicker';
import Home from './pages/Home';
import Standings from './pages/Standings';
import Login from './pages/Login';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './config/firebase';
import ProtectedRoute from './components/ProtectedRoute';

const queryClient = new QueryClient();

const WithNav = () => {
  //hide nav in login flow
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

const WithoutNav = () => <Outlet />;

const App = () => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<WithoutNav />}>
            <Route path="/" element={<Login />} />
            <Route path="*" element={<Login />} />
          </Route>
          <Route element={<WithNav />}>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} exact></Route>
            <Route path="/standings" element={<Standings />} exact></Route>
            <Route path="/makepicks" element={<DriverPicker />} exact></Route>
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
