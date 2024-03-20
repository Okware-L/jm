// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnAbxVRSnX-Yvm1Q6PHWGk3NBCWRIvwJg",
  authDomain: "jonmaurice-99edb.firebaseapp.com",
  projectId: "jonmaurice-99edb",
  storageBucket: "jonmaurice-99edb.appspot.com",
  messagingSenderId: "722863364922",
  appId: "1:722863364922:web:e129f07aad3465811f8e03",
  measurementId: "G-5E9XBNR537"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();


export { db }