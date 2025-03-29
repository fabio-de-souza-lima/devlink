// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore  } from "firebase/firestore"
import {getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8-R4o8XfKbQi8yerUvVZcaid6nKpDHmA",
  authDomain: "reactlinks-e5694.firebaseapp.com",
  projectId: "reactlinks-e5694",
  storageBucket: "reactlinks-e5694.firebasestorage.app",
  messagingSenderId: "515978215033",
  appId: "1:515978215033:web:7df6969d021d23d7ba5ea8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);

export { auth, db};