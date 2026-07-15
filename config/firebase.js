import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

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

let auth;
if (Platform.OS === "web") {
  auth = getAuth(app); // En web, Firebase usa IndexedDB/LocalStorage automáticamente
} else {
  // En móviles (iOS/Android), forzamos la persistencia usando AsyncStorage nativo
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
}

export { auth };
export const db = getFirestore(app);
export const storage = getStorage(app);