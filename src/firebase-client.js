
import { initializeApp } from "firebase/app";
import { collection, doc, getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCm9utte6v4lTceymRPeHjNo9OJMPG4Klo",
  authDomain: "test-pro-9794c.firebaseapp.com",
  projectId: "test-pro-9794c",
  storageBucket: "test-pro-9794c.appspot.com",
  messagingSenderId: "558241115026",
  appId: "1:558241115026:web:a2da8da47ec5a4fe63ef4b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export const dashboardsCollection = collection(db, "dashboards")
export const cardsCollection = doc(dashboardsCollection, "cards")
