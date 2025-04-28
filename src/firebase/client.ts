import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getValue } from "@/utils/getValue";

const config = {
    appId: getValue("FIREBASE_APP_ID"),
    apiKey: getValue("FIREBASE_API_KEY"),
    projectId: getValue("FIREBASE_PROJECT_ID"),
    authDomain: getValue("FIREBASE_AUTH_DOMAIN"),
    storageBucket: getValue("FIREBASE_STORAGE_BUCKET"),
    messagingSenderId: getValue("FIREBASE_MESSAGING_SENDER_ID"),
};

const app = initializeApp(config);
export const storage = getStorage(app);
