import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCfbeO70YFW-Ggo2fpHMuJd3nfzmBhczS0",
  authDomain: "step-ai9.firebaseapp.com",
  projectId: "step-ai9",
  storageBucket: "step-ai9.firebasestorage.app",
  messagingSenderId: "306434975878",
  appId: "1:306434975878:web:4263f3428d36fec9d28907",
  measurementId: "G-KG9M7WB9DL"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });