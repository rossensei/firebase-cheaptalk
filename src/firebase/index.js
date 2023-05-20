// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXGdJN5yvlGGLDzdaFDlfbQ8X4jD6NPS4",
  authDomain: "cheaptalk-82e46.firebaseapp.com",
  projectId: "cheaptalk-82e46",
  storageBucket: "cheaptalk-82e46.appspot.com",
  messagingSenderId: "866477754906",
  appId: "1:866477754906:web:340418603ad0fd9efd1fa3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth }