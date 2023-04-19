import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB_0D3f_dHAMZKHOFurQYZTXw_3HRSApvE",
  authDomain: "stribe-45c45.firebaseapp.com",
  projectId: "stribe-45c45",
  storageBucket: "stribe-45c45.appspot.com",
  messagingSenderId: "600262032115",
  appId: "1:600262032115:web:075361b29f34cb3edc9586",
  measurementId: "G-WWNZTQ9LQ4",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = getAuth();
const db = firebase.firestore();

export { auth, db };
