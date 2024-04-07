import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, TextField, Box, Typography } from "@mui/material";
import { useUserAuth } from "../context/UserAuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState(""); // State for first name
  const [lname, setLname] = useState(""); // State for last name
  const [uid, setUid] = useState(""); // State for user id
  const [error, setError] = useState("");
  const { signUp, googleSignIn } = useUserAuth();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userData = await signUp( email, password, fname, lname);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const googleSignInresponse = await googleSignIn();
      console.log(googleSignInresponse);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };


  return (
    <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

      {error && <Alert severity="error">{error}</Alert>}

      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{ mt: 1 }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="fname"
          label="First Name"
          name="fname"
          autoComplete="fname"
          autoFocus
          onChange={(e) => setFname(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="lname"
          label="Last Name"
          name="lname"
          autoComplete="lname"
          onChange={(e) => setLname(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
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
          Sign up
        </Button>
      </Box>

      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 2, backgroundColor: '#DB4437', '&:hover': { backgroundColor: '#DB4437' } }} // Google color
        onClick={handleGoogleSignIn}
      >
        Sign up with Google
      </Button>

      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 2, backgroundColor: '#4267B2', '&:hover': { backgroundColor: '#4267B2' } }} // Facebook color
        onClick={handleGoogleSignIn}
      >
        Sign up with Facebook
      </Button>

      <Box mt={2}>
        <Typography variant="body2">
          Already have an account? <Link to="/login">Log In</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Signup;
