// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app';

import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyARxGtFsTDE2LrtrNJsAnElPJ30XqIZYYc",
    authDomain: "sahayakai-466115.firebaseapp.com",
    projectId: "sahayakai-466115",
    storageBucket: "sahayakai-466115.firebasestorage.app",
    messagingSenderId: "522049177242",
    appId: "1:522049177242:web:9d8112f7629f20198b4123",
    measurementId: "G-EFCXE1DXJP"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
