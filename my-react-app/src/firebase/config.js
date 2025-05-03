import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfdvZ04MWZWf_3pEJGzrdn-8s8u-sp0vQ",
  authDomain: "fir-5b648.firebaseapp.com",
  databaseURL: "https://fir-5b648-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fir-5b648",
  storageBucket: "fir-5b648.firebasestorage.app",
  messagingSenderId: "291467007780",
  appId: "1:291467007780:web:744076cbabc60794eec5b1"
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
  console.log('Firebase initialized with config:', firebaseConfig);
} else {
  app = getApps()[0];
  console.log('Using existing Firebase app');
}

// Initialize services
const auth = getAuth(app);
const db = getDatabase(app, firebaseConfig.databaseURL);

// Log database URL for verification
console.log('Database URL:', firebaseConfig.databaseURL);

export { auth, db }; 