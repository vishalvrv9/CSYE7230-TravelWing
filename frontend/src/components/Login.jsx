import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, TextField, Box, Typography } from "@mui/material";
import { useUserAuth } from "../context/UserAuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user, logIn, googleSignIn, resetPassword } = useUserAuth(); 
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    console.log("Hello handleSubmit - coming in function handleSubmit");
    e.preventDefault();
    setError("");
    try {
      console.log("Hello tryblock handleSubmit - coming in function handleSubmit");
      await logIn(email, password);
      navigate("/"); // Navigate to homepage or dashboard upon successful login
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  // Assuming you have a resetPassword function in your useUserAuth
  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email to reset your password.");
      return;
    }
    
    try {
      await resetPassword(email);
      alert('Password reset email sent! Check your inbox.');
    } catch (error) {
      setError(error.message);
    }
  };
  
  return (
    <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {error && <Alert severity="error">{error}</Alert>}

      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Log In
        </Button>
        <Typography variant="body2" sx={{ mt: 2 }}>
          <Link to="#" onClick={handleForgotPassword}>Forgot password?</Link>
        </Typography>
      </Box>

      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 2, backgroundColor: '#DB4437', '&:hover': { backgroundColor: '#DB4437' } }}
        onClick={handleGoogleSignIn}
      >
        Sign in with Google
      </Button>

      <Box mt={2}>
        <Typography variant="body2">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
