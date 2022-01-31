import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBfC6gRdxum38bCYMQFpqUtZxejz3AmbnI",
  authDomain: "yarn-react.firebaseapp.com",
  projectId: "yarn-react",
  storageBucket: "yarn-react.appspot.com",
  messagingSenderId: "933932339745",
  appId: "1:933932339745:web:16347dcd37d8df5e5e4960",
  measurementId: "G-Q2BSDSJLN3"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);