
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB223oBsEDKroH-5zMPJaUSlaJfFmNVrY4",
  authDomain: "ammazon-clone-21523.firebaseapp.com",
  projectId: "ammazon-clone-21523",
  storageBucket: "ammazon-clone-21523.appspot.com", 
  messagingSenderId: "458197772367",
  appId: "1:458197772367:web:7ba2df6466211a8924223a"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 


