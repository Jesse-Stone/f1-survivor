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
    }
  }
});

export default theme;
