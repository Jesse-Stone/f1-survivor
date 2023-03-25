import React from 'react'
import ReactDOM from 'react-dom/client'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import App from './App'
import './index.css'

const theme = createTheme({
  typography: {
    button: {
      fontFamily: "'Roboto', sans-serif",
      textTransform: 'none',
    },
  },
});




ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
  </React.StrictMode>,
)
