import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, TextField, Box, Typography } from "@mui/material";
import { useUserAuth } from "../context/UserAuthContext";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import "../css/SignUp.css";

// Motion Input component
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


const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState(""); // State for first name
  const [lname, setLname] = useState(""); // State for last name
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
  <div className="modal-backdrop">
  <img src="/flight1.png" alt="Flight" className="flying-flight flight1" />
  <img src="/flight2.png" alt="Flight" className="flying-flight flight2" />
  <img src="/flight1.png" alt="Flight" className="flying-flight flight3" />
  <img src="/flight2.png" alt="Flight" className="flying-flight flight4" />
      <div className="welcome-modal">
        <h2>Seize the Skies with TravelWing!</h2>
        <p>Sign up and Soar</p>
        
  <div className="signup-form-container">
    {error && <div className="alert alert-error">{error}</div>}
    <form onSubmit={handleSubmit} className="signup-form">
    <div className="name-fields">
      <MotionInput
        id="fname"
        label="First Name"
        type="text"
        value={fname}
        setValue={setFname}
        placeholder="Enter your first name"
      />
      <MotionInput
        id="lname"
        label="Last Name"
        type="text"
        value={lname}
        setValue={setLname}
        placeholder="Enter your last name"
      />
    </div>
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
      <button type="submit" className="submit-btn" onClick={handleSubmit}>Sign Up</button>
      <div className="divider">OR</div>
      <button type="button" className="social-signup google-signup">
            <FaGoogle /> Sign up with Google
          </button>
          <button type="button" className="social-signup facebook-signup">
            <FaFacebook /> Sign up with Facebook
      </button>    
    </form>
  </div>
  </div>

</div>
);
};

export default Signup;
