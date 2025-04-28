import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getVariable } from "@/utils";

const config = {
  apiKey: getVariable("FIREBASE_API_KEY"),
  authDomain: getVariable("FIREBASE_AUTH_DOMAIN"),
  projectId: getVariable("FIREBASE_PROJECT_ID"),
  storageBucket: getVariable("FIREBASE_STORAGE_BUCKET"),
  messagingSenderId: getVariable("FIREBASE_MESSAGING_SENDER_ID"),
  appId: getVariable("FIREBASE_APP_ID"),
};

const app = initializeApp(config);
const storage = getStorage(app);

export { storage };
