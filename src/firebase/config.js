import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBpvFYvh1nV08rMerhpuQYJO2u4mxwapH8",
  authDomain: "life-app-f35c7.firebaseapp.com",
  projectId: "life-app-f35c7",
  storageBucket: "life-app-f35c7.appspot.com",
  messagingSenderId: "643547989986",
  appId: "1:643547989986:web:90b97044faf589df219bbb"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp); 
export const firebaseDB = getFirestore(firebaseApp);