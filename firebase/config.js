import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC6UUbXYeQpqn-MdX2S9CwHmgGK7WgatLM",
  authDomain: "photo-share-5ef7b.firebaseapp.com",
  projectId: "photo-share-5ef7b",
  storageBucket: "photo-share-5ef7b.appspot.com",
  messagingSenderId: "475942853037",
  appId: "1:475942853037:web:751deb966d339e1afc6924",
  measurementId: "G-0FVCB1WWXG"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);


