
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyC49je26lKFTUFn31wnQy7lqOixPCgHqrw",
  authDomain: "xapp-26901.firebaseapp.com",
  projectId: "xapp-26901",
  storageBucket: "xapp-26901.appspot.com",
  messagingSenderId: "496666021448",
  appId: "1:496666021448:web:155ceef28521b49293d27d"
};

const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
export default auth;