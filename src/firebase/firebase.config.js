import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
}

export const app = initializeApp(firebaseConfig)


// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCAX-N3RtWhjpxbhTntLuGq96wp1r2SwK4",
//   authDomain: "plantnet-31532.firebaseapp.com",
//   projectId: "plantnet-31532",
//   storageBucket: "plantnet-31532.firebasestorage.app",
//   messagingSenderId: "581641707913",
//   appId: "1:581641707913:web:66e002a5a27b7f3b074158"
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);