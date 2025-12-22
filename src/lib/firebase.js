import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getRemoteConfig } from "firebase/remote-config";
import { GoogleGenerativeAI } from "@google/generative-ai";

const firebaseConfig = {
  apiKey: "AIzaSyCvWTWg0xXp7S41wa7Ms8YEq1zER2tELJ4",
  authDomain: "my-ai-portfolio-96c91.firebaseapp.com",
  projectId: "my-ai-portfolio-96c91",
  storageBucket: "my-ai-portfolio-96c91.firebasestorage.app",
  messagingSenderId: "198892591918",
  appId: "1:198892591918:web:834243398f8d1ed44d38bf",
  measurementId: "G-H4K6C61Q6Q"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const remoteConfig = getRemoteConfig(app);

// Standard Gemini SDK (Free Tier friendly)
const genAI = new GoogleGenerativeAI(firebaseConfig.apiKey);
export const aiModel = genAI.getGenerativeModel({ model: "gemini-pro" });
