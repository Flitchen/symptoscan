// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpFDZajYsAtdnWXH_wz_5a7QnD0-duGmw",
  authDomain: "symptoscan-ca6f8.firebaseapp.com",
  projectId: "symptoscan-ca6f8",
  storageBucket: "symptoscan-ca6f8.appspot.com",
  messagingSenderId: "243157630908",
  appId: "1:243157630908:web:b7afcb8af133cf78c7f5b9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

export const usersRef = collection(db, "users");

export const roomsRef = collection(db, "rooms");
