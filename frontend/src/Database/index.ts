import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBQUu7rrils0y9fHLR8pZDzlHMqIllJfk8",
  authDomain: "testing-87675.firebaseapp.com",
  projectId: "testing-87675",
  storageBucket: "testing-87675.appspot.com",
  messagingSenderId: "12456568743",
  appId: "1:12456568743:web:150dbc15f876eec0317882",
  measurementId: "G-1SBLHTLQ8M"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const messaging = getMessaging(app);


export { db, messaging };
