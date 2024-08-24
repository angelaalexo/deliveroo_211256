import {getApp, getApps, initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBAbpQJ8BsWarAxmW6vnpznqhkVdIMOUUo",
  authDomain: "deliverooweb-abe5e.firebaseapp.com",
  databaseURL: "https://deliverooweb-abe5e-default-rtdb.firebaseio.com",
  projectId: "deliverooweb-abe5e",
  storageBucket: "deliverooweb-abe5e.appspot.com",
  messagingSenderId: "420521411879",
  appId: "1:420521411879:web:fdc763b48cd7ebd94ed502"
  };

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);
  
export { app, firestore, storage };