// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnaME6d0vdDyLwMCevNNMPS50M3CXWMyE",
  authDomain: "adfriend-46d46.firebaseapp.com",
  databaseURL: "https://adfriend-46d46-default-rtdb.firebaseio.com",
  projectId: "adfriend-46d46",
  storageBucket: "adfriend-46d46.firebasestorage.app",
  messagingSenderId: "1028972097489",
  appId: "1:1028972097489:web:9e85b772bdf647aa61baf0",
  measurementId: "G-PRZHW6RYE6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);