import React, { createContext, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged, signInWithRedirect } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";
import { GoogleAuthProvider,  } from 'firebase/auth';

const UserAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("Current user before fetching details", currentUser);
      if (currentUser) {
        // Before fetching user details, ensure the session is active
        try {
          const userDetails = await fetchUserDetails(currentUser.email);
          if (userDetails) {
            setUser(userDetails);
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
          setUser(null); // Handle any errors and reset user
        }
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  const fetchUserDetails = async (email) => {
    try {
      console.log("Hello fetchUserDetails - coming in function fetchUserDetails");
      const response = await fetch(`http://localhost:8080/getUserDetails/${email}`);

      if (response.status === 401 || response.status === 403) {
        // Handle the expired session
        console.log("Session expired. Please log in again.");
        // Here you would typically call a logout function or redirect to a login page
        handleSessionExpired();
        return null;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch user details.');
      }
      const userDetails = await response.json();
      // setUser((currentUser) => ({ ...currentUser, ...userDetails }));
      setUser(userDetails);
      console.log("User details fetched successfully:", userDetails); 
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  
// Function to handle the session expiry
function handleSessionExpired() {
  // Clear the user context or perform any other cleanup
  setUser(null);

  // Show a message or alert if desired
  alert("Your session has expired. Please log in again.");

  <Navigate to="/login" replace={true} />
}
  
  // Authentication functions here (e.g., logIn, signUp)
  async function logIn(email, password) {
    console.log("Hello logIn - coming in function logIn");
    // const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userCredential = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password
      }),
    });
    if (!userCredential.ok) {
      throw new Error('Failed to login user with the backend API.');
    }
    const userData = await userCredential.json();
    console.log("User signed in successfully:", userData);
    setUser(userData.user);
    console.log("User data printing : ", userData.user);  
    return userCredential;
  }

  
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  async function signUp(email, password, fname = "", lname = "") {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // console.log("User signed up successfully:", userCredential.user);
    const apiResponse = await fetch('http://localhost:8080/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        // displayName : fname,
        fname,
        lname
      }),
    });

    if (!apiResponse.ok) {
      throw new Error('Failed to register user details with the backend API.');
    }
    const userData = await apiResponse.json();
    console.log("User signed in successfully:", userData);
    setUser(userData.user);
    console.log("User data printing : ", userData.user);  
    
    return apiResponse;

  }
  

  function logOut() {
    console.log("Hello logOut - coming in function logOut");
    return signOut(auth);
  }
  
  async function googleSignIn() {
    try {
      console.log("Hello googleSignIn - coming in function googleSignIn");
      const provider = new GoogleAuthProvider();
      const result = await signInWithRedirect(auth, provider);
  
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      console.log(`Google Access Token: ${token}`);
  

      // The signed-in user info.
      const user = result.user;
      // You can handle the user details here
      console.log(user);
  
    
      // Prepare user data to be sent to the backend
      const userData = {
        userId: user.uid,
        email: user.email,
        lname: user.displayName,
        password: 'googleSignUpDummyPassword',
        provider: 'google',
      };
  
      // Send the user data to your backend API for MongoDB storage
      const response = await fetch('http://localhost:8080/google-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to save user data to MongoDB');
      }
  
      // Handle response data if necessary
      const responseData = await response.json();
      console.log("Coming here? - printing the response" , responseData);
    } catch (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(error);
    }
  }

  return (
    <UserAuthContext.Provider 
      value={{ user, setUser, logIn, logOut, signUp, googleSignIn, resetPassword, signOut }}>
        {children}
    </UserAuthContext.Provider>);
}

export const useUserAuth = () => {
  return useContext(UserAuthContext);
}