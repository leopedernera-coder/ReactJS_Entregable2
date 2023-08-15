import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDC9BgE1bdD3DNl6xA2RyqvA-vI7fdAFoU",
  authDomain: "readmetxt-92c8b.firebaseapp.com",
  projectId: "readmetxt-92c8b",
  storageBucket: "readmetxt-92c8b.appspot.com",
  messagingSenderId: "1076936190773",
  appId: "1:1076936190773:web:986db6b6825526b0a57a7c",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
