//    root/firebseConfig.js


import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: "G-5E9XBNR537",
};
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// Connect to emulators in development
if (process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_USE_EMULATORS === 'true') {
  try {
    // Firestore emulator (default port: 8080)
    connectFirestoreEmulator(db, 'localhost', 8080);
    
    // Storage emulator (default port: 9199)
    connectStorageEmulator(storage, 'localhost', 9199);
    
    // Auth emulator (default port: 9099)
    connectAuthEmulator(auth, 'http://localhost:9099');
    
    console.log('🔥 Connected to Firebase Emulators');
  } catch (error) {
    console.warn('Failed to connect to emulators:', error);
  }
}

export { db };
export { app };
