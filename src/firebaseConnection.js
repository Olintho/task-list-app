import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/path"

const firebaseConfig = {
  apiKey: "AIzaSyAE6iQ_pcPSqLrPYTTj88DxaCoYI_bhLqY",
  authDomain: "task-list-app-orei.firebaseapp.com",
  projectId: "task-list-app-orei",
  storageBucket: "task-list-app-orei.appspot.com",
  messagingSenderId: "816233389619",
  appId: "1:816233389619:web:57bf771b954a1b4ecccd46",
  measurementId: "G-9P2DJMLPCP"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)

export { db, auth}