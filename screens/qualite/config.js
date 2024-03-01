// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSVRxNRx7r6Dv79qcQtEw4wtMShDCJvy4",
  authDomain: "alaintchuente-1.firebaseapp.com",
  projectId: "alaintchuente-1",
  storageBucket: "alaintchuente-1.appspot.com",
  messagingSenderId: "312597741294",
  appId: "1:312597741294:web:954eb05634a7d6b1f57dff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db =getFirestore(app);