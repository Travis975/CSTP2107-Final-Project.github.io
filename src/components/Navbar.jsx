import { AppBar, Box, Button, Toolbar } from '@mui/material';
import { signOut } from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import logo from '../assets/logo.png';

const Navbar = () => {
    const navigate = useNavigate();
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

    return (
        <AppBar style={{ display: 'flex', justifyContent: 'space-between', padding: '0 16px' }}>
            <Toolbar style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <Box>
                    <Link to="/Movies" style={{ textDecoration: 'none' }}>
                        <img
                            src={logo}
                            alt="Webflix Logo"
                            style={{ 
                                height: 60, 
                                cursor: 'pointer',
                                marginLeft: '-15px', 
                                marginTop: '5px'
                            }}
                        />
                    </Link>
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
                            to="/Signin"
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
