import { initializeApp } from "firebase/app";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"


export const firebaseConfig = {
    apiKey: "AIzaSyDxLX9jTYVyGPJGp2n1qC_I5DtXOEVzXHg",
    authDomain: "zachetka-54364.firebaseapp.com",
    projectId: "zachetka-54364",
    storageBucket: "zachetka-54364.appspot.com",
    messagingSenderId: "747497482915",
    appId: "1:747497482915:web:e44708412819b56f78ed16"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;

export const db = getFirestore(app)
export const storage = getStorage(app);


const sendPasswordReset = async (email) => {
    alert("Ссылка для восстановления отправлена на вашу электронную почту!");
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (err) {
        console.error(err);
    }
};

export {
    sendPasswordReset
};
