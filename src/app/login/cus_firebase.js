import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDeJBU9jPt6lp3YTdN14_iPgFZ5LIMTOSE",
    authDomain: "catalyst-d11fa.firebaseapp.com",
    projectId: "catalyst-d11fa",
    storageBucket: "catalyst-d11fa.appspot.com",
    messagingSenderId: "620904647700",
    appId: "1:620904647700:web:e6dc05a7fcd38845d4ab01",
    measurementId: "G-VXKNQKWHYM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
