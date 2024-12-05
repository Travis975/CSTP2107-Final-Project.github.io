import { AppBar, Box, Button, Toolbar } from '@mui/material';
import { signOut } from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebaseConfig';

const Navbar = () => {
    const navigate = useNavigate();
    // Track the user state
    const [user, setUser] = useState(null); 

    // Check if the user is signed in
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user); // Update state based on auth state
        });
        // Clean up listener on component unmount
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
        <AppBar style={{ display: 'flex', alignItems: 'flex-end' }}>
            <Toolbar>
                <Box display="flex" alignItems="flex-end">
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
                            to="/Signin" // Navigate to sign-in page
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
