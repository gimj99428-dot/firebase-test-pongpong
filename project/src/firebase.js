// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, deleteDoc, doc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZ8euPPtVuxyOc0CWXWuek-5mUKDcU71M",
  authDomain: "pongpong-ed328.firebaseapp.com",
  projectId: "pongpong-ed328",
  storageBucket: "pongpong-ed328.firebasestorage.app",
  messagingSenderId: "861282978645",
  appId: "1:861282978645:web:f3b49c808b352f3de8bddc",
  measurementId: "G-7CQBSL3XXV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Firebase 서비스 초기화 및 export
export const auth = getAuth(app);
export const db = getFirestore(app);

export {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    collection,
    addDoc,
    getDocs,
    query,
    orderBy,
    deleteDoc,
    doc
};

export default app;