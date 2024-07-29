import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAU3cP9hw_bkjgG0qno9E5wh94uDO9K3CQ",
    authDomain: "fir-60c38.firebaseapp.com",
    databaseURL: "https://fir-60c38-default-rtdb.firebaseio.com",
    projectId: "fir-60c38",
    storageBucket: "fir-60c38.appspot.com",
    messagingSenderId: "50172964767",
    appId: "1:50172964767:web:79c6f17e4b30fa627897aa"
};


const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const auth = getAuth()
const firestore = getFirestore(app)
const storage = getStorage(app)

export { app, firestore, storage, auth }