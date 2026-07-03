import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBlaEd8tCIo_u6zuW0S4kqecQUu-MCJtCI",
  authDomain: "now-or-never-202f0.firebaseapp.com",
  projectId: "now-or-never-202f0",
  storageBucket: "now-or-never-202f0.firebasestorage.app",
  messagingSenderId: "1033823038500",
  appId: "1:1033823038500:web:39deab38a54565210dfcb1",
  measurementId: "G-7V81VEQDWR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth(app);