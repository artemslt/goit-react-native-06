import AsyncStorage from "@react-native-async-storage/async-storage";
import "firebase/storage";
import "firebase/firestore";
import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";
import { Firestore, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // apiKey: "AIzaSyDj11WHmrIl6ANJz9yxDEJ0eQx1KI8Wt5s",
  // authDomain: "rn-social-a12da.firebaseapp.com",
  // projectId: "rn-social-a12da",
  // storageBucket: "rn-social-a12da.appspot.com",
  // messagingSenderId: "125275922932",
  // appId: "1:125275922932:web:8c5783f43f8a35ec7359a1",
  // measurementId: "G-CD250YSQWK",
  apiKey: "AIzaSyDj11WHmrIl6ANJz9yxDEJ0eQx1KI8Wt5s",
  authDomain: "rn-social-a12da.firebaseapp.com",
  databaseURL: "https://rn-social-a12da-default-rtdb.firebaseio.com",
  projectId: "rn-social-a12da",
  storageBucket: "rn-social-a12da.appspot.com",
  messagingSenderId: "125275922932",
  appId: "1:125275922932:web:8c5783f43f8a35ec7359a1",
  measurementId: "G-CD250YSQWK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const fsbase = getFirestore(app);
