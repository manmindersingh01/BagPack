// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsE1kXQvijNB9XRJZy5o3vLsTpfNWuNQw",
  authDomain: "dropbag-10e74.firebaseapp.com",
  projectId: "dropbag-10e74",
  storageBucket: "dropbag-10e74.appspot.com",
  messagingSenderId: "171679371038",
  appId: "1:171679371038:web:5d58bcc57570047281430f",
  measurementId: "G-D96RGJ3EDL"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };