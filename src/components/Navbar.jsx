import React, { useState, useEffect, useRef } from 'react';
import { AppBar, Box, Menu, MenuItem, Toolbar } from '@mui/material';
import { signOut } from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import logo from '../assets/logo.png';
import userlogo from '../assets/user.png';

const Navbar = ({ favoritesRef, watchlaterRef }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    const handleSignout = async () => {
        try {
            await signOut(auth);
            navigate('/');
            handleCloseDropdown();
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const handleLogoClick = () => {
        if (
            location.pathname === '/' ||
            location.pathname === '/signin' ||
            location.pathname === '/signup' ||
            location.pathname === '/privacy-policy' ||
            location.pathname === '/terms-and-conditions' 
        ) {
            navigate('/');
        } else if (
            location.pathname === '/movies' ||
            location.pathname === '/watch-trailer' ||
            location.pathname === '/account' ||
            location.pathname === '/favourites' ||
            location.pathname === '/watchlater'
        ) {
            navigate('/movies');
        }
    };

    const handleUserLogoHover = (event) => {
        setAnchorEl(event.currentTarget);
    };


    const handleCloseDropdown = () => {
        setAnchorEl(null);
    };

    const handleNavigation = (route) => {
        navigate(route);
        handleCloseDropdown();
    };

    const handleDivNavigation = (route) => {
        navigate(`/movies#${route}`);
        setTimeout(() => {
          if (route === 'favorites' && favoritesRef) {
            favoritesRef.current.scrollIntoView({ behavior: 'smooth' });
          } else if (route === 'watchlater' && watchlaterRef) {
            watchlaterRef.current.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      };
    
      
      

    

    return (
        <AppBar
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0 16px',
                backgroundColor: '#D3D3D3',
            }}
        >
            <Toolbar style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <Box>
                    <img
                        src={logo}
                        alt="Webflix Logo"
                        style={{
                            height: 60,
                            cursor: 'pointer',
                            marginLeft: '-15px',
                            marginTop: '5px',
                        }}
                        onClick={handleLogoClick}
                    />
                </Box>

                <Box>
                    <img
                        src={userlogo}
                        alt="User Logo"
                        style={{
                            height: 45,
                            cursor: 'pointer',
                            marginRight: '25px',
                            marginTop: '5px',
                        }}
                        onMouseEnter={handleUserLogoHover}
                    />

                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleCloseDropdown}
                        MenuListProps={{
                            onMouseLeave: handleCloseDropdown,
                        }}
                    >
                        <MenuItem onClick={() => handleNavigation('/account')}>
                            My Account
                        </MenuItem>
                        <MenuItem onClick={() => handleDivNavigation('favorites')}>
                        Favorite Movies
                        </MenuItem>
                        <MenuItem onClick={() => handleDivNavigation('watchlater')}>
                        Watch Later
                        </MenuItem>
                        <MenuItem onClick={handleSignout}>Sign Out</MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
