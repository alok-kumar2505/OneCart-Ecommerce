import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "loginonecart-450ee.firebaseapp.com",
  projectId: "loginonecart-450ee",
  storageBucket: "loginonecart-450ee.firebasestorage.app",
  messagingSenderId: "295803757916",
  appId: "1:295803757916:web:4d40c5effce0ccff934d99"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()


export {auth , provider}

