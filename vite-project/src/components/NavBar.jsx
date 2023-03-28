import React, { useState } from 'react';
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Drawer,
  Stack
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

function Navbar() {
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  return (
    <Stack
      id="navbar"
      sx={{
        margin: '50px',
        '@media (min-width:550px)': {
          margin: '0px'
        },
        borderRadius:'8px'
      }}
    >
      <AppBar position="fixed" color="transparent" elevation={0}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={handleDrawerClose}
        PaperProps={{
          sx: { width: '10%' }
        }}
      >
        <Stack height={'25%'} mt={3} justifyContent={'space-between'} alignItems={'center'}>
          <Typography>
            <Link to={'/'} onClick={handleDrawerClose}>Home</Link>
          </Typography>
          <Typography>
            <Link to={'/makepicks'} onClick={handleDrawerClose}>Make Picks</Link>
          </Typography>
          <Typography>
            <Link to={'/standing'} onClick={handleDrawerClose}>Standings</Link>
          </Typography>
          <Typography>
            <Link to={'/logout'} onClick={handleDrawerClose}>Logout</Link>
          </Typography>
        </Stack>
      </Drawer>
    </Stack>
  );
}

export default Navbar;
