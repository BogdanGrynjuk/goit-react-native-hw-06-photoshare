import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCiAU5b520IHedK8d-mBB1x78gT0fymv-w",
  authDomain: "app-photo-share.firebaseapp.com",
  projectId: "app-photo-share",
  storageBucket: "app-photo-share.appspot.com",
  messagingSenderId: "433616920331",
  appId: "1:433616920331:web:efbfa68563989b8e11cc0e",
  measurementId: "G-N2GS5QPBCR"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);


