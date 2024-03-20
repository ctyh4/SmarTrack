import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCupfNTTpa6BkaDdMZOgyPqmmiarVpfb9s",
  authDomain: "smartrack-7b20c.firebaseapp.com",
  projectId: "smartrack-7b20c",
  storageBucket: "smartrack-7b20c.appspot.com",
  messagingSenderId: "326506554583",
  appId: "1:326506554583:web:5a4e90fcf113b13bbafc92",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
