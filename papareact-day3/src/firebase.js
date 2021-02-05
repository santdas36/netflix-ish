import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCRl-hxmSzf8Qsb_eKjNP6ZRn4zMOuyJrY",
    authDomain: "netflix-cish.firebaseapp.com",
    projectId: "netflix-cish",
    storageBucket: "netflix-cish.appspot.com",
    messagingSenderId: "1024887444436",
    appId: "1:1024887444436:web:21632b54fa96d274ea7c41",
    measurementId: "G-QGLBBRFFCH"
  };

const firebaseAdmin = firebase.initializeApp(firebaseConfig);
const db = firebaseAdmin.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, db, provider };
