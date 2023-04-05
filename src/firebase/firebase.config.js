// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrM-lvjbCr1arrAbFpaQ3TvyyJ2t-fDH4",
  authDomain: "taskly-3c3f2.firebaseapp.com",
  projectId: "taskly-3c3f2",
  storageBucket: "taskly-3c3f2.appspot.com",
  messagingSenderId: "538810175076",
  appId: "1:538810175076:web:8b6b1d1bf49a72589e5971"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;