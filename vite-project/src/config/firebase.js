import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// import { initializeApp } from 'firebase-admin/app';

  
const firebaseConfig = {
  apiKey: "AIzaSyBwL-Gyjdboz_kP8EIM3EXqLF-9FumXwj4",
  authDomain: "f1-survivor.firebaseapp.com",
  projectId: "f1-survivor",
  storageBucket: "f1-survivor.appspot.com",
  messagingSenderId: "263196726250",
  appId: "1:263196726250:web:de0999ee11add2b626d893",
  measurementId: "G-X5N4BWDVG3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const db = getFirestore(app);