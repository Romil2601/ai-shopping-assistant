import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAY8_9c7mfiinq1u7CLR4Zf_JnqrPTPhic",
  authDomain: "ai-shopping-assistant-f3661.firebaseapp.com",
  projectId: "ai-shopping-assistant-f3661",
  appId: "1:248771327999:web:78de7da99da42bb85399ca",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();