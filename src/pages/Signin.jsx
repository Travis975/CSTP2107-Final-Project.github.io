import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Box, Button, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';
import { getErrorCode } from '../utils';
import useLocalStorage from '../hooks/useLocalStorage';

const SignInPage = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [alertConfig, setAlertConfig] = useState({});
  const [forgotEmail, setForgotEmail] = useState('');
  const [openResetDialog, setOpenResetDialog] = useState(false);
  const navigate = useNavigate();
  const [_currentUser, setCurrentUser] = useLocalStorage('current_user', null);

  const handleSignin = async () => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
      setAlertConfig({ message: 'Successfully Signed in', color: 'success', isOpen: true });
      setCurrentUser(user);
      setTimeout(() => {
        navigate('/Movies');
      }, 2000);
    } catch (error) {
      const message = getErrorCode(error.code);
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
    <Box display="flex" flexDirection="column" gap="12px" border="1px solid black" padding="40px" borderRadius="12px">
      <Typography variant="h3">Sign in</Typography>
      <TextField
        required
        id="email"
        label="Email"
        placeholder="Enter your email"
        type="email"
        value={credentials.email}
        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
      />
      <TextField
        required
        id="password"
        label="Password"
        placeholder="Enter your Password"
        type="password"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
      />
      <Button onClick={handleSignin} variant="contained" color="secondary">
        Signin
      </Button>
      <Typography
        variant="body2"
        color="primary"
        style={{ cursor: 'pointer', marginTop: '10px' }}
        onClick={() => setOpenResetDialog(true)}
      >
        Forgot Password?
      </Typography>
      <Alert alertConfig={alertConfig} />
      <Link to="/Signup">Don't have an account? Signup</Link>

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
        <DialogActions>
          <Button onClick={() => setOpenResetDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleForgotPassword} color="secondary">
            Reset Password
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SignInPage;
