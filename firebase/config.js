import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDeCSJkThwzw3A9D8gtsSz0mFy4sKIQFx4",
  authDomain: "photoshare-6fd0f.firebaseapp.com",
  projectId: "photoshare-6fd0f",
  storageBucket: "photoshare-6fd0f.appspot.com",
  messagingSenderId: "801672089217",
  appId: "1:801672089217:web:7447465434292f8a78c780",
  measurementId: "G-8ZGNN6WHHG"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);


