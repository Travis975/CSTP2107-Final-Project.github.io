import { AppBar, Box, Button, Toolbar } from '@mui/material';
import { signOut } from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import logo from '../assets/logo.png';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null); 

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
        } catch (error) {
            console.log(error);
        }
    };

    const handleLogoClick = () => {
        if (
            location.pathname === '/' || 
            location.pathname === '/signin' || 
            location.pathname === '/signup'
        ) {
            navigate('/'); 
        } else if (location.pathname === '/movies' || location.pathname === '/watch-trailer') {
            navigate('/movies'); 
        }
    };

    return (
        <AppBar style={{ display: 'flex', justifyContent: 'space-between', padding: '0 16px', backgroundColor: '#D3D3D3' }}>
            <Toolbar style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <Box>
                    <img
                        src={logo}
                        alt="Webflix Logo"
                        style={{ 
                            height: 60, 
                            cursor: 'pointer',
                            marginLeft: '-15px', 
                            marginTop: '5px'
                        }}
                        onClick={handleLogoClick} 
                    />
                </Box>

                <Box display="flex" alignItems="center">
                    {user ? (
                        <Button
                            onClick={handleSignout}
                            variant="outlined"
                            style={{ color: 'white', border: '1px solid white' }}
                        >
                            Sign Out
                        </Button>
                    ) : (
                        <Button
                            component={Link}
                            to="/signin"
                            variant="outlined"
                            style={{ color: 'white', border: '1px solid white' }}
                        >
                            Sign In
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
