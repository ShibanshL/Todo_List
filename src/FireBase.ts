import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
function FireBase(){
    const firebaseConfig = {
        apiKey: "AIzaSyBuMtV9sE_rBiiwCiFDBEUvrWCoVEruLrk",
        authDomain: "reactfirebasebackend.firebaseapp.com",
        databaseURL: "https://reactfirebasebackend-default-rtdb.firebaseio.com",
        projectId: "reactfirebasebackend",
        storageBucket: "reactfirebasebackend.appspot.com",
        messagingSenderId: "1088953803583",
        appId: "1:1088953803583:web:67f7d33f8d4da0678be98a"
      };
      
      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      return getDatabase(app)
}


export default FireBase