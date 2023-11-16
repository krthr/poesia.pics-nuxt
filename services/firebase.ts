import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export { uploadBytes, ref } from "firebase/storage";
export { doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB1zKX5IGpUvBEfH97WS5n-ncFQmJr1Pgc",
  authDomain: "poesiapics.firebaseapp.com",
  projectId: "poesiapics",
  storageBucket: "poesiapics.appspot.com",
  messagingSenderId: "1042574337197",
  appId: "1:1042574337197:web:4b349f2347b4699d5b5224",
  measurementId: "G-K80PMDDGSD",
};

export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
