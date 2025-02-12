// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuuhKXGxS3GAKw8j4bX2aOjRtVJvxGkMA",
  authDomain: "the-pendle-fridge-ebc63.firebaseapp.com",
  projectId: "the-pendle-fridge-ebc63",
  storageBucket: "the-pendle-fridge-ebc63.firebasestorage.app",
  messagingSenderId: "524364453306",
  appId: "1:524364453306:web:094457ef6641fe40b17983",
  databaseURL:
    "https://the-pendle-fridge-ebc63-default-rtdb.europe-west1.firebasedatabase.app/",
};

//Initialise Firebase
const app = initializeApp(firebaseConfig);

//Initialise firestore
const firestore = getFirestore(app);

//Initialise storage
const storage = getStorage(app);

export default app;
export { firestore, storage };
