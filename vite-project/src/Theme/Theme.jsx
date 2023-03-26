import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    button: {
      textTransform: 'none',
    },
    profile: {
      fontSize: 28,
      fontFamily: [
        'Racing Sans One',
        'cursive',
      ].join(','),
    }    
  },

}
);

export default theme;
