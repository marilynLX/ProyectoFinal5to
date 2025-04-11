import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBQspLphD1qDFuPMzACiJnUXO7x8dFTO8o",
  authDomain: "tecnollenado-fbac1.firebaseapp.com",
  projectId: "tecnollenado-fbac1",
  storageBucket: "tecnollenado-fbac1.appspot.com", // Corregido el dominio de storage
  messagingSenderId: "583352936875",
  appId: "1:583352936875:web:fafd2400c000aef43a0aee",
  measurementId: "G-61SXB1B33F"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); 

export { auth, db }; 
