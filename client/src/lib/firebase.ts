import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAICiJOT5FazmTDz0Kcb4p9K3-HqpZkjCk",
  authDomain: "design-brew.firebaseapp.com",
  projectId: "design-brew",
  storageBucket: "design-brew.firebasestorage.app",
  messagingSenderId: "137376975563",
  appId: "1:137376975563:web:0a1e033c63c9ba7da3a94e",
  measurementId: "G-M8NLNG99KL"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const analytics = getAnalytics(app);
