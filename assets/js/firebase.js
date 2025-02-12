import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAtj2_7GgeY5ehrJO4L0B0zEX1cbdfcnDA",
  authDomain: "fanshawe-web-trends.firebaseapp.com",
  projectId: "fanshawe-web-trends",
  storageBucket: "fanshawe-web-trends.firebasestorage.app",
  messagingSenderId: "168492363002",
  appId: "1:168492363002:web:a13643eda15437d31ced43",
  measurementId: "G-W93MECTFGD",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
