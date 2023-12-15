// firebaseConfig.js
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyANhGEp-DFhKN4AtW09RnDJIvMJauRYco8",
  authDomain: "marine-lodge-308314.firebaseapp.com",
  projectId: "marine-lodge-308314",
  storageBucket: "marine-lodge-308314.appspot.com",
  messagingSenderId: "670450759419",
  appId: "1:670450759419:web:e219f42eb501ee3426625e",
  measurementId: "G-91P19F4K6B",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
