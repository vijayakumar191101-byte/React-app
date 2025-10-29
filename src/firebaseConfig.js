import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCNKcqa2x9eMQ8itHBjB9CYeEdUVU07poU",
    authDomain: "mobile-store-app-ee2fe.firebaseapp.com",
    projectId: "mobile-store-app-ee2fe",
    storageBucket: "mobile-store-app-ee2fe.firebasestorage.com",
    messagingSenderId: "590342065261",
    appId: "1:590342065261:web:d69e6207322c1dfb66c364",
    // measurementId: "G-W46FTSKL00"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
