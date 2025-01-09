// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBN9Xy8srE0y9Xm_9fXwJfcJTa4sup3o50",
  authDomain: "social-zone-16aca.firebaseapp.com",
  projectId: "social-zone-16aca",
  storageBucket: "social-zone-16aca.firebasestorage.app",
  messagingSenderId: "374754979574",
  appId: "1:374754979574:web:d0f70788a8affbe063c6d7"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
