import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    button: {
      textTransform: 'none'
    },
    profile: {
      fontSize: 28,
      fontFamily: ['Racing Sans One', 'cursive'].join(',')
    },
    profile2: {
      fontSize: 28,
      fontFamily: ['Titillium Web', 'sans-serif'].join(',')
    },
    profile3: {
      fontSize: 28,
      fontFamily: ['Bebas Neue', 'cursive'].join(',')
    },
    f1: {
      fontSize: 28,
      fontFamily:['f1']
    },
    f1bold: {
      fontSize: 28,
      fontFamily:['f1bold']
    },
  },
  palette: {
    primary: {
      main: '#FF1801'
    }
  },
});

export default theme;
