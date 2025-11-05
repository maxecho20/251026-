// FIX: Changed to compat import to resolve initialization error which can occur with older firebase versions or misconfigured dependencies.
import firebase from 'firebase/compat/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAUyr1Jcf7W4lA9JmSjFWVS8QIegEIHlo4",
  authDomain: "copypose-7f3b2.firebaseapp.com",
  projectId: "copypose-7f3b2",
  storageBucket: "copypose-7f3b2.appspot.com",
  messagingSenderId: "501951956167",
  appId: "1:501951956167:web:a040f00b0f9647f9ceaae2",
  measurementId: "G-71WZ7R3XD7"
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);

// FIX: Corrected the initialization of Firestore. The `getFirestore` function was called
// with a settings object, which is not a valid signature. The `experimentalForceLongPolling`
// setting is also not supported in the modular SDK. The call has been corrected to `getFirestore(app)`.
export const db = getFirestore(app);

export const storage = getStorage(app, "gs://copypose-7f3b2.appspot.com");
export const googleProvider = new GoogleAuthProvider();
