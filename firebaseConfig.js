import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCfWVdrKAZ2WSAv1fQ3vAfVatXgN11zB-w",
  authDomain: "audit-dashboard-6acc0.firebaseapp.com",
  projectId: "audit-dashboard-6acc0",
  storageBucket: "audit-dashboard-6acc0.firebasestorage.app",
  messagingSenderId: "194410595200",
  appId: "1:194410595200:web:2fb114f3b4fab3fd14f765",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export { db }