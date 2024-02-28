const firebase = require('firebase/app');
require('firebase/auth');

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCPkaZnU0EHysv6q5j26j1kLabQiMj9_jI",
    authDomain: "travelwing-4cfa2.firebaseapp.com",
    projectId: "travelwing-4cfa2",
    storageBucket: "travelwing-4cfa2.appspot.com",
    messagingSenderId: "552190757350",
    appId: "1:552190757350:web:d8039bdead4bfdda1e2e27",
    measurementId: "G-56K2N8LY8G"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();