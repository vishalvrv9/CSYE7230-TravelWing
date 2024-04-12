import { Alert, Button, TextField, Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import "../css/SignUp.css"; // Assuming this CSS file has the necessary styles

// Reusing MotionInput from your Signup form
const MotionInput = ({ id, label, type, value, setValue, placeholder }) => {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const background = useMotionTemplate`
    radial-gradient(circle at ${mouseX}px ${mouseY}px, #ffffff20 0%, #ffffff00 80%)`;

  return (
    <div className="form-group" onMouseMove={handleMouseMove} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <label htmlFor={id} className="form-label">{label}</label>
      <motion.input
        type={type}
        className="form-input"
        id={id}
        name={id}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        required
        style={{ background: isHovered ? background : 'none' }}
      />
    </div>
  );
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, googleSignIn } = useUserAuth();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/"); 
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

  return (
    <div className="modal-backdrop">
      <div className="welcome-modal">
        <h2>Welcome Back to TravelWing!</h2>
        <p>Log in to continue your journey</p>

        <div className="signup-form-container">
          {error && <div className="alert alert-error">{error}</div>}
          <form onSubmit={handleSubmit} className="signup-form">
            <MotionInput
              id="email"
              label="Email"
              type="email"
              value={email}
              setValue={setEmail}
              placeholder="Enter your email"
            />
            <MotionInput
              id="password"
              label="Password"
              type="password"
              value={password}
              setValue={setPassword}
              placeholder="Enter your password"
            />
            <button type="submit" className="submit-btn">Log In</button>
            <div className="divider">OR</div>
            <button type="button" className="social-signup google-signup" onClick={handleGoogleSignIn}>
              <FaGoogle /> Log in with Google
            </button>
            <button type="button" className="social-signup facebook-signup" onClick={handleGoogleSignIn}>
              <FaFacebook /> Log in with Facebook
            </button>
          </form>
        </div>

        <Typography variant="body2" sx={{ mt: 2 }}>
          <Link to="/signup">Don't have an account? Sign Up</Link>
        </Typography>
      </div>
    </div>
  );
};

export default Login;
