import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, useTheme, ThemeProvider, createTheme, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const links = [
    { path: "/", name: "TravelWing" },
    { path: "/about", name: "About" },
    { path: "/itinerary", name: "Itinerary" },
    { path: "/login", name: "Login" },
    { path: "/signup", name: "Signup" }
  ];

  const location = useLocation();

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          {links.map((link) => (
            <Button key={link.path} color="inherit" component={Link} to={link.path} sx={{ margin: '0 10px' }}>
              <Typography variant="button" style={{ color: location.pathname === link.path ? theme.palette.secondary.main : 'inherit' }}>
                {link.name}
              </Typography>
            </Button>
          ))}
          <Box flexGrow={1} />
          <IconButton onClick={toggleDarkMode} color="inherit">
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;