import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, useTheme, ThemeProvider, createTheme, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useUserAuth } from '../context/UserAuthContext'; 
import '../css/Navbar.css';

const Navbar = () => { 

  const { user, setUser, logOut } = useUserAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const [click, setClick] = useState(false);
  const [button, SetButton] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 960);

  const handleResize = () => {
    setIsMobileView(window.innerWidth <= 960);
  };
  

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

    const handleLogout = async () => {
    try {
      await logOut();
      console.log("Logged out successfully");
      setUser(null);
      // redirect to the home page
      navigate("/about");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const staticLinks = [
    { path: "/", name: "TravelWing" },
    { path: "/about", name: "About" },
    { path: "/itinerary", name: "Itinerary" },
    { path: "/login", name: "Login" },
    { path: "/signup", name: "Signup" },
  ];

  const dynamicLinks = [
    { path: "/", name: "TravelWing" },
    { path: "/about", name: "About" },
    { path: "/itinerary", name: "Itinerary" },
    { path: "/saved", name: "Saved" }

  ];


  const showButton = () => {
    if(window.innerWidth <= 960) {
      SetButton(false);
    } else {
      SetButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  const changeBackground = () => {
    console.log (window.scrollY);
  }

  const textColor = isScrolled ? 'white' : 'black';

  

  return (
    <AppBar position="fixed" className='navbar-main'>
      <Toolbar className="toolbar-centered">
        {!isMobileView && (
          <Box flexGrow={1} display="flex" justifyContent="center">
            {(user ? dynamicLinks : staticLinks).map((link) => (
              <Button key={link.name} component={Link} to={link.path} className="navbar-button" onClick={link.action}>
                <Typography variant="button">{link.name}</Typography>
              </Button>))}
          {user && (
            <Button onClick={handleLogout} style={{color: "white"}}>Logout</Button>
          )}
        </Box>
        )}

        {/* {isMobileView && (
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"

            <MenuIcon />
          </IconButton>
        )} */}
      </Toolbar>
    </AppBar>
  //   <AppBar position="fixed" className='navbar-main' sx={{ alignItems: 'center' }}>
  //     <Toolbar className="toolbar-centered">
  //       <Box className="desktop-menu" flexGrow={1}>
  //         {(user ? dynamicLinks : staticLinks).map((link) => (
  //           <Button key={link.path} component={Link} to={link.path} className="navbar-button">
  //             <Typography variant="button">{link.name}</Typography>
  //           </Button>
  //         ))}
  //       </Box>

  //       {/* <IconButton
  //         size="large"
  //         edge="start"
  //         color="inherit"
  //         aria-label="menu"
  //         sx={{ display: { xs: 'block', md: 'none' } }} // Only show on small screens
  //       >
  //         <MenuIcon />
  //       </IconButton> */}

      
  //  {(user ? dynamicLinks : staticLinks).map((link) => (
  //         <Button key={link.path} component={Link} to={link.path} sx={{ margin: '0 10px' }} style={{ color: textColor }}>
  //           <Typography variant="button" style={{ color: textColor }}>{link.name}</Typography>
  //         </Button>
  //       ))}
  //       {user && (
  //         <Button onClick={handleLogout} style={{ color: textColor }}>Logout</Button>
  //       )}

        
  //       <Box flexGrow={1} />

  //   </Toolbar>
  // </AppBar>
// </div>

);

}

export default Navbar;