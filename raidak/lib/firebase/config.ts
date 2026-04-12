import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCaMXWxlJsPsTOAjqxJ6bo1r28hl6ZZJWA",
  authDomain: "raidak-9b0ba.firebaseapp.com",
  projectId: "raidak-9b0ba",
  storageBucket: "raidak-9b0ba.firebasestorage.app",
  messagingSenderId: "770701370599",
  appId: "1:770701370599:web:968e254c85130970866e42",
  measurementId: "G-6PV37Q2W7Q"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
