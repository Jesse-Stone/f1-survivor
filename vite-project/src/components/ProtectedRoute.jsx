import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';

const ProtectedRoute = ({children}) => {
    const [user, loading, error] = useAuthState(auth);
    if (!user) {
       return <Navigate to='/'/>
    }
  return (
    children
  )
}

export default ProtectedRoute;
