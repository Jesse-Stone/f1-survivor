import React from 'react'
import ReactDOM from 'react-dom/client'
import theme from './Theme/Theme'
import App from './App'
import './index.css'
import { ThemeProvider } from '@mui/system'

ReactDOM.createRoot(document.getElementById('root')).render(
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
)
