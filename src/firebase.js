// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA55EgZ8hW361aIn5NCArvf2WOcGdIcFio",
  authDomain: "todo-simple-93f1e.firebaseapp.com",
  projectId: "todo-simple-93f1e",
  storageBucket: "todo-simple-93f1e.appspot.com",
  messagingSenderId: "524328883290",
  appId: "1:524328883290:web:8c6fd868d863a6274d7463",
  measurementId: "G-6Z015PWH7W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);