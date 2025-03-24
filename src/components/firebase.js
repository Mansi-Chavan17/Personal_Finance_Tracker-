// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMIGdvHxmaDIBPez5BxejN2r7xjr2p5xc",
  authDomain: "authentication-b29cc.firebaseapp.com",
  projectId: "authentication-b29cc",
  storageBucket: "authentication-b29cc.firebasestorage.app",
  messagingSenderId: "567033659420",
  appId: "1:567033659420:web:868028246750c920f29fd9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const db=getFirestore(app)
export default app