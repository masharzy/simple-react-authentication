// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBX2xPMyHhflVAl6TVnsemK45hhLV-99vY",
  authDomain: "email-password-auth-c5fb0.firebaseapp.com",
  projectId: "email-password-auth-c5fb0",
  storageBucket: "email-password-auth-c5fb0.appspot.com",
  messagingSenderId: "240141204509",
  appId: "1:240141204509:web:b419d594d8abe6c75ddaf4",
  measurementId: "G-X0XHLWZRYM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth };