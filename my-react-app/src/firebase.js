import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCfdvZ04MWZWf_3pEJGzrdn-8s8u-sp0vQ",
  authDomain: "fir-5b648.firebaseapp.com",
  projectId: "fir-5b648",
  storageBucket: "fir-5b648.firebasestorage.app",
  messagingSenderId: "291467007780",
  appId: "1:291467007780:web:744076cbabc60794eec5b1",
  measurementId: "G-F3MG3BXLCE"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app; 