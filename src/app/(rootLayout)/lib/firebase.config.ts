// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZtJRQR8pKw-Qd9AxQNDdoe5ChGGCLppM",
  authDomain: "bloodbank-52cdd.firebaseapp.com",
  projectId: "bloodbank-52cdd",
  storageBucket: "bloodbank-52cdd.appspot.com",
  messagingSenderId: "877989327157",
  appId: "1:877989327157:web:35502317ff1c7019915c7c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
