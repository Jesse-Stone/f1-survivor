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
import {styled} from '@mui/system'
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'



const NavBar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate= useNavigate();

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const handleSignout = () => {
    signOut(auth)
  }

  const LinkStyled = styled(Link)({
    fontFamily:'f1',
    color: 'white',
  })

  return (
    <Stack
      id="navbar"
      // sx={{
      //   margin: '50px',
      //   '@media (min-width:550px)': {
      //     margin: '0px'
      //   },
      // }}
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
          sx: { width: '50%', '@media (min-width:550px)': {
            width: '200px'
          },  background: 'rgba(0,0,0,.8)' }
        }}
      >
        <Stack height={'30%'} mt={5} justifyContent={'space-between'} alignItems={'center'}>
            <LinkStyled to={'/'} onClick={handleDrawerClose}>Home</LinkStyled>
            <LinkStyled to={'/makepicks'} onClick={handleDrawerClose}>Make Picks</LinkStyled>
            <LinkStyled to={'/standings'} onClick={handleDrawerClose}>Standings</LinkStyled>
            <LinkStyled to={'/'} onClick={handleSignout}>Logout</LinkStyled>
        </Stack>
      </Drawer>
    </Stack>
  );
}

export default NavBar;
