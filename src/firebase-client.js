import { initializeApp } from "firebase/app";
import { collection, getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAoRx0GJ3CpqtyMx34tlQ1DZ5Z7ItzmuJQ",
  authDomain: "trello-clone-d8c73.firebaseapp.com",
  projectId: "trello-clone-d8c73",
  storageBucket: "trello-clone-d8c73.appspot.com",
  messagingSenderId: "309563818791",
  appId: "1:309563818791:web:2c79316bf1d5186aa11f02"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//
export const db = getFirestore(firebaseConfig);
export const auth = getAuth(app);