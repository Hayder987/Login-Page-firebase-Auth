
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC12uEBSFIYOKvClMGqF-0fojFEz-QC2_s",
  authDomain: "email-password-login-project1.firebaseapp.com",
  projectId: "email-password-login-project1",
  storageBucket: "email-password-login-project1.firebasestorage.app",
  messagingSenderId: "624119662150",
  appId: "1:624119662150:web:8d893a1ad81482d6446c47"
};


const app = initializeApp(firebaseConfig);
export const Auth = getAuth(app)