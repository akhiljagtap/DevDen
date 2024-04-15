// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "fullstackauth-83b6c.firebaseapp.com",
  projectId: "fullstackauth-83b6c",
  storageBucket: "fullstackauth-83b6c.appspot.com",
  messagingSenderId: "919121777778",
  appId: "1:919121777778:web:f012a318bc1bba24399eeb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);