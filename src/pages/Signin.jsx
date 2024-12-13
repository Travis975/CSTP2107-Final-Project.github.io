import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Box, Button, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth, db } from '../firebaseConfig'; 
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';
import { getErrorCode } from '../utils';
import useLocalStorage from '../hooks/useLocalStorage';
import '../css/signin.css';
import '../components/Footer';

const SignInPage = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [alertConfig, setAlertConfig] = useState({});
  const [forgotEmail, setForgotEmail] = useState('');
  const [openResetDialog, setOpenResetDialog] = useState(false);
  const navigate = useNavigate();
  const [_currentUser, setCurrentUser] = useLocalStorage('current_user', null);

  const isUsername = (input) => {
    const usernameRegex = /^[a-zA-Z0-9$#%&_\\-]{2,20}$/; 
    return usernameRegex.test(input);
  };

  const resolveEmailFromUsername = async (username) => {
    try {
      const usernameDoc = await getDoc(doc(db, 'usernames', username.toLowerCase()));
      if (usernameDoc.exists()) {
        return usernameDoc.data().email;
      } else {
        throw new Error('Username not found');
      }
    } catch (error) {
      console.error('Error resolving username to email: ', error);
      throw error;
    }
  };

  const handleSignin = async () => {
    try {
      let email = credentials.email;
      if (isUsername(email)) {
        email = await resolveEmailFromUsername(email);
      }

      const { user } = await signInWithEmailAndPassword(auth, email, credentials.password);
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      setAlertConfig({ message: 'Successfully Signed in', color: 'success', isOpen: true });
      setCurrentUser(user);
      setTimeout(() => {
        navigate('/Movies');
      }, 2000);
    } catch (error) {
      const message = error.message === 'Username not found' 
        ? 'Invalid username or email' 
        : getErrorCode(error.code);
      setAlertConfig({ message, color: 'error', isOpen: true });
    }
  };

  const handleForgotPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, forgotEmail);
      setAlertConfig({ message: 'Password reset email sent. Check your inbox.', color: 'success', isOpen: true });
      setOpenResetDialog(false);
    } catch (error) {
      const message = getErrorCode(error.code);
      setAlertConfig({ message, color: 'error', isOpen: true });
    }
  };

  return (
    <div className='sign-in-page'>
      <Box className="signin-container">
        <Typography className="signin-header"><h1 className="signin-title">Sign in</h1></Typography>
        <TextField
          required
          id="email"
          label="Username or Email"
          placeholder="Enter your username or email"
          type="text"
          value={credentials.email}
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
          className="signin-textfield"
        />
        <TextField
          required
          id="password"
          label="Password"
          placeholder="Enter your Password"
          type="password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          className="signin-textfield"
        />
        <Button onClick={handleSignin} variant="contained" >
          Sign in
        </Button>
        <Typography
          variant="body2"
          color="primary"
          style={{ cursor: 'pointer', marginTop: '10px' }}
          className="forgot-password"
          onClick={() => setOpenResetDialog(true)}
        >
          Forgot Password?
        </Typography>
        <Alert alertConfig={alertConfig} className="signin-alert" />
        <Link to="/signup" className="signup-link">Don't have an account? Signup</Link>

        {/* Forgot Password Dialog */}
        <Dialog open={openResetDialog} onClose={() => setOpenResetDialog(false)}>
          <DialogTitle>Reset Password</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="forgotEmail"
              label="Email Address"
              type="email"
              fullWidth
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
            />
          </DialogContent>
          <DialogActions className="reset-dialog-actions">
            <Button onClick={() => setOpenResetDialog(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleForgotPassword} color="secondary">
              Reset Password
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
};

export default SignInPage;
