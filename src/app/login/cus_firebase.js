// cus_firebase.js (or firebase.js)
import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    signInWithEmailLink, 
    sendSignInLinkToEmail, 
    isSignInWithEmailLink, 
    signInWithEmailAndPassword ,
    onAuthStateChanged// Import signInWithEmailAndPassword for email/password authentication
  } from "firebase/auth";
  
  // Your Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDeJBU9jPt6lp3YTdN14_iPgFZ5LIMTOSE",
    authDomain: "catalyst-d11fa.firebaseapp.com",
    projectId: "catalyst-d11fa",
    storageBucket: "catalyst-d11fa.appspot.com",
    messagingSenderId: "620904647700",
    appId: "1:620904647700:web:e6dc05a7fcd38845d4ab01",
    measurementId: "G-VXKNQKWHYM"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  
  // Initialize Firebase Authentication and get a reference to the servic
  const auth = getAuth(app);
  
  // Export the necessary functions
  export { 
    auth, 
    signInWithEmailLink, 
    sendSignInLinkToEmail, 
    isSignInWithEmailLink, 
    signInWithEmailAndPassword,
    onAuthStateChanged // Export signInWithEmailAndPassword for usage in other parts of the app
  };
  