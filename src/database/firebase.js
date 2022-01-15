import {initializeApp} from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAPfFUJgGFdt8GN8-Su-1s8s7w7uwDPy9A",
    authDomain: "outdoor-companion-cs394.firebaseapp.com",
    databaseURL: "https://outdoor-companion-cs394-default-rtdb.firebaseio.com",
    projectId: "outdoor-companion-cs394",
    storageBucket: "outdoor-companion-cs394.appspot.com",
    messagingSenderId: "798212385188",
    appId: "1:798212385188:web:52db04bde0fea443f67931"
};

export const firebase = initializeApp(firebaseConfig);
export const storage = firebase.storage();
