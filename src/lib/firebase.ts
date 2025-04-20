
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDLzvdPVlG4nsNzKMpSsaXID_1zHcIpo5I",
  authDomain: "quipaitquoi.firebaseapp.com",
  projectId: "quipaitquoi",
  storageBucket: "quipaitquoi.firebasestorage.app",
  messagingSenderId: "818821848168",
  appId: "1:818821848168:web:a9e8f520cfb9514b196fdd",
  measurementId: "G-ZQLPE33XH4"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
