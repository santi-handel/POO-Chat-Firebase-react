// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASaT9gXPN9xDU48prCaRUtn_cyt6AlLFg",
  authDomain: "chat-poo-react.firebaseapp.com",
  projectId: "chat-poo-react",
  storageBucket: "chat-poo-react.appspot.com",
  messagingSenderId: "1004636859385",
  appId: "1:1004636859385:web:7395bf3cbb35c475aeab28"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);