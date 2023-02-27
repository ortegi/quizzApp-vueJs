
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'


const firebaseConfig = {
  apiKey: "AIzaSyB7aqPZttQRnMDja9JLJT5RFB05PqRiaUU",
  authDomain: "quizzapp-77957.firebaseapp.com",
  projectId: "quizzapp-77957",
  storageBucket: "quizzapp-77957.appspot.com",
  messagingSenderId: "957431978825",
  appId: "1:957431978825:web:ebc8aad79af6dfc8c85898"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()
const db = getFirestore()

export {auth, db}