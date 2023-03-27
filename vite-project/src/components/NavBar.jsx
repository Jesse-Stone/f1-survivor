import { AppBar, Box, Toolbar, Typography } from '@mui/material';

function Navbar() {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
          <Box component={'img'} src={"/f1_favicon.png"} sx={{ display:'flex', width:"150px", height:"150px", justifyContent:'flex-start'}} />
        <Typography variant="h6">Item 1</Typography>
        <Typography variant="h6">Item 2</Typography>
        <Typography variant="h6">Item 3</Typography>
        <Typography variant="h6">Item 4</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
