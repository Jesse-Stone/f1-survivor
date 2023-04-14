import React, { useState } from 'react';
import { AppBar, IconButton, Toolbar, Drawer, Stack } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';

import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import SpeedIcon from '@mui/icons-material/Speed';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import SportsMotorsportsIcon from '@mui/icons-material/SportsMotorsports';

const NavBar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const handleSignout = () => {
    signOut(auth);
  };

  const LinkStyled = styled(Link)({
    fontFamily: 'f1',
    transition: 'all .1s ease-in-out',
    color: 'white',
    fontSize: '18px',
    '&:hover':
     {
        transform: 'scale(1.1)'
      }
  });

  return (
    <Stack id="navbar">
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
          sx: {
            width: '50%',
            '@media (min-width:850px)': {
              width: '200px'
            },
            background: 'rgba(0,0,0,.8)'
          }
        }}
      >
        <Stack height={'200px'} mt={5} justifyContent={'space-between'} alignItems={'center'}>
            <LinkStyled to={'/home'} onClick={handleDrawerClose}>
            Home
          </LinkStyled>
          <LinkStyled to={'/makepicks'} onClick={handleDrawerClose}>
            Make Picks
          </LinkStyled>
          <LinkStyled to={'/standings'} onClick={handleDrawerClose}>
            Standings
          </LinkStyled>
          <LinkStyled to={'/'} onClick={handleSignout}>
            Logout
          </LinkStyled>
        </Stack>
      </Drawer>
    </Stack>
  );
};

export default NavBar;
