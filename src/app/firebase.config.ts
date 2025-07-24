import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { environment } from "../environments/environment";

// Firebase'i başlat
const app = initializeApp(environment.firebase);

// Firebase servislerini dışa aktar
export const auth = getAuth(app);
export const firestore = getFirestore(app);
