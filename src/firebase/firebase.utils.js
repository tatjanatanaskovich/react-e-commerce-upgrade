import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
  apiKey: "AIzaSyBgdbqNzC8bSRznIsFZsCdv7H3WlHwsaGg",
  authDomain: "react-e-commerce-db-4fc74.firebaseapp.com",
  databaseURL: "https://react-e-commerce-db-4fc74.firebaseio.com",
  projectId: "react-e-commerce-db-4fc74",
  storageBucket: "",
  messagingSenderId: "775396144996",
  appId: "1:775396144996:web:ba4757bfa93ce6256d6c71"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;