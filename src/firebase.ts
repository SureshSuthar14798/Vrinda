import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

// Firebase web app configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCAAavpGcxc631Tjc8ft1myQr6QrQ7gbUA',
  authDomain: 'vrinda-7b09d.firebaseapp.com',
  projectId: 'vrinda-7b09d',
  storageBucket: 'vrinda-7b09d.firebasestorage.app',
  messagingSenderId: '869727096290',
  appId: '1:869727096290:web:ec9e754df7559d9413fdbb',
  measurementId: 'G-948NS3GPRF'
};

const app = initializeApp(firebaseConfig);

// Auth export
export const auth = getAuth(app);

// Firestore export
export const db = getFirestore(app);

// Optional Realtime Database export
export const realtimeDB = getDatabase(app);

// (Optional) simple test connection for Firestore
async function testFirestoreConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log('Firestore connection success.');
  } catch (error) {
    console.warn('Firestore connection check failed:', error);
  }
}

// Avoid a network round-trip on every refresh. Enable explicitly when needed:
// VITE_FIREBASE_DEBUG_CONNECTION=true
if (import.meta.env.VITE_FIREBASE_DEBUG_CONNECTION === 'true') {
  void testFirestoreConnection();
}

export default app;
