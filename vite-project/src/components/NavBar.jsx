import React, { useState } from 'react';
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function Navbar() {
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  return (
      <Stack>
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
        <Drawer anchor="left" open={openDrawer} onClose={handleDrawerClose}>
          <List>
            <ListItem button onClick={handleDrawerClose}>
              <ListItemIcon>
                <MenuIcon />
              </ListItemIcon>
              <ListItemText primary="Menu Item 1" />
            </ListItem>
            <ListItem button onClick={handleDrawerClose}>
              <ListItemIcon>
                <MenuIcon />
              </ListItemIcon>
              <ListItemText primary="Menu Item 2" />
            </ListItem>
            <ListItem button onClick={handleDrawerClose}>
              <ListItemIcon>
                <MenuIcon />
              </ListItemIcon>
              <ListItemText primary="Menu Item 3" />
            </ListItem>
          </List>
        </Drawer>
      </Stack>
  );
}

export default Navbar;
