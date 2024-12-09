import React, { useState, useEffect } from 'react';
import { AppBar, Box, Menu, MenuItem, Toolbar } from '@mui/material';
import { signOut } from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import logo from '../assets/logo.png';
import userlogo from '../assets/user.png';

const Navbar = () => {
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

    const handleLogoClick = (event) => {
        event.stopPropagation();
        if (
            location.pathname === '/' ||
            location.pathname === '/signin' ||
            location.pathname === '/signup'
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

    const handleUserLogoClick = (event) => {
        event.stopPropagation();
        if (
            location.pathname === '/' ||
            location.pathname === '/signin' ||
            location.pathname === '/signup'
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

    const handleCloseDropdown = () => {
        setAnchorEl(null);
    };

    const handleNavigation = (route) => {
        navigate(route);
        handleCloseDropdown();
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
                        onClick={handleUserLogoClick}
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
                        <MenuItem onClick={() => handleNavigation('/favourites')}>
                            Favourite Movies
                        </MenuItem>
                        <MenuItem onClick={() => handleNavigation('/watchlater')}>
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
