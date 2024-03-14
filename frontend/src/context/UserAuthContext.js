import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const UserAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe;
  }, []);

  // Authentication functions here (e.g., logIn, signUp)
  function logIn(email, password, fname = "", lname = "") {
    return signInWithEmailAndPassword(auth, email, password);
  }
  
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  async function signUp(email, password, fname = "", lname = "") {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const apiResponse = await fetch('http://localhost:8080/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        fname,
        lname
      }),
    });

    if (!apiResponse.ok) {
      throw new Error('Failed to register user details with the backend API.');
    }
    return userCredential;

  }
  

  function logOut() {
    return signOut(auth);
  }
  
  function googleSignIn() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // You can handle the user details here
        console.log(user);

        // Prepare user data to be sent to the backend
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          // Add other user details you might want to store
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
        console.log(responseData);

      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(error);
      });
  }

  

  return (
    <UserAuthContext.Provider 
      value={{ user, logIn, logOut, signUp, googleSignIn, resetPassword }}>
        {children}
    </UserAuthContext.Provider>);
}

export const useUserAuth = () => {
  return useContext(UserAuthContext);
}