import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Box, Button, Typography } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import Alert from '../components/Alert';
import { Link, useNavigate } from 'react-router-dom';
import { getErrorCode } from '../utils';
import '../css/signup.css';
import Footer from '../components/Footer';

const SignUpPage = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    username: '',
  });

  const [alertConfig, setAlertConfig] = useState({});
  const navigate = useNavigate();

  const validateUsername = (username) => {
    const regex = /^[a-zA-Z0-9$#%&_\\-]{2,20}$/;
    return regex.test(username);
  };

  const handleSignup = async () => {
    if (!validateUsername(credentials.username)) {
      setAlertConfig({
        message: 'Invalid username. Must be 2-20 characters and contain only letters, numbers, $, #, %, &, _, or -.',
        color: 'error',
        isOpen: true,
      });
      return;
    }

    try {
      const usernameDoc = await getDoc(doc(db, 'usernames', credentials.username.toLowerCase()));
      if (usernameDoc.exists()) {
        setAlertConfig({
          message: 'Username is already taken.',
          color: 'error',
          isOpen: true,
        });
        return;
      }

      const { user } = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
      await setDoc(doc(db, 'usernames', credentials.username.toLowerCase()), { email: credentials.email });
      await setDoc(doc(db, 'users', user.uid), {
        username: credentials.username,
        email: credentials.email,
      });

      setAlertConfig({
        message: 'Successfully Signed up',
        color: 'success',
        isOpen: true,
      });

      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.log(error, 'this is the error message');
      const message = getErrorCode(error.code);
      setAlertConfig({ message, color: 'error', isOpen: true });
    }
  };

  return (
    <div className="signup-page">
      <Box className="signup-container">
        <Typography className="signup-title" variant="h3">
          Sign up
        </Typography>
        <TextField
          required
          id="username"
          label="Username"
          placeholder="Enter a unique username"
          value={credentials.username}
          onChange={(e) =>
            setCredentials({
              ...credentials,
              username: e.target.value,
            })
          }
        />
        <TextField
          required
          id="email"
          label="Email"
          placeholder="Enter your email"
          type="email"
          value={credentials.email}
          onChange={(e) =>
            setCredentials({
              ...credentials,
              email: e.target.value,
            })
          }
        />
        <TextField
          required
          id="password"
          label="Password"
          placeholder="Enter your Password"
          type="password"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({
              ...credentials,
              password: e.target.value,
            })
          }
        />
        <Button className="signup-button" onClick={handleSignup} variant="contained">
          Sign up
        </Button>
        <Alert alertConfig={alertConfig} />
        <Link className="signin-link" to="/signin">
          Already have an account? Signin
        </Link>
      </Box>
    </div>
  );
};

export default SignUpPage;
