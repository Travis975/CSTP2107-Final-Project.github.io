import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { Box, Button, Typography } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import Alert from '../components/Alert';
import { Link, useNavigate } from 'react-router-dom';
import { getErrorCode } from '../utils';
import '../css/signup.css';
import Footer from '../components/Footer'


const SignUpPage = () => {

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const [alertConfig, setAlertConfig] = useState({});
    const navigate = useNavigate();

    const handleSignup = async () => {
        
        try {
            const { user } = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
            setAlertConfig({...alertConfig, message:'Succesfully Signed up', color: 'success', isOpen: true })

            setTimeout(() => {
                navigate('/');
            }, 2000);

        } catch (error) {
            console.log(error, "this is the error message")
            const message = getErrorCode(error.code);
            setAlertConfig({...alertConfig, message, color: 'error', isOpen: true })
        }
    }

    return (
        <div className='signup-page'>
            <Box className="signup-container">
                <Typography className="signup-title" variant="h3">Sign up</Typography>
                <TextField
                    required
                    id="email"
                    label="Email"
                    placeholder='Enter your email'
                    type='email'
                    value={credentials.email}
                    onChange={(e) => setCredentials({
                        ...credentials,
                        email: e.target.value
                    })}
                />
                <TextField
                    required
                    id="password"
                    label="Password"
                    placeholder='Enter your Password'
                    type='password'
                    value={credentials.password}
                    onChange={(e) => setCredentials({
                        ...credentials,
                        password: e.target.value
                    })}
                />
                <Button className="signup-button" onClick={handleSignup} variant="contained">Sign up</Button>
                <Alert alertConfig={alertConfig} />
                <Link className="signin-link" to="/signin">Already have an account? Signin</Link>
            </Box>
        </div>
        
    )
}

export default SignUpPage