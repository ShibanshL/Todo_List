import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database"
import { getFirestore } from "firebase/firestore";
// import {update} from 'firebase/database'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBuMtV9sE_rBiiwCiFDBEUvrWCoVEruLrk",
  authDomain: "reactfirebasebackend.firebaseapp.com",
  databaseURL: "https://reactfirebasebackend-default-rtdb.firebaseio.com",
  projectId: "reactfirebasebackend",
  storageBucket: "reactfirebasebackend.appspot.com",
  messagingSenderId: "1088953803583",
  appId: "1:1088953803583:web:67f7d33f8d4da0678be98a"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const db0 =  getDatabase(app)
const db1 = getFirestore(app)
// const update_Data = update(app);
// const auth = getAuth(app)


export { db, db1, db0};