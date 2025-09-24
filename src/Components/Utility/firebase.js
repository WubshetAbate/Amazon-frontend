// firebase.js

// Import modular SDK
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC7ZwkR21Az6jCNg8x6tGiTs8n3YhTJmbI",
  authDomain: "clone-bd5b8.firebaseapp.com",
  projectId: "clone-bd5b8",
  storageBucket: "clone-bd5b8.firebasestorage.app",
  messagingSenderId: "813415979476",
  appId: "1:813415979476:web:3576e2270fdee32ced9e41",
  measurementId: "G-8FLTBM293W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export services for use in app
export const auth = getAuth(app);
export const db = getFirestore(app);
export { analytics };
