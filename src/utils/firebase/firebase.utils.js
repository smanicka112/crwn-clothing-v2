// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    

} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC99CO4MLOiN2XCXWiLlLPNeUHNxEO9Kc0",
  authDomain: "crwn-clothing-db-a582a.firebaseapp.com",
  projectId: "crwn-clothing-db-a582a",
  storageBucket: "crwn-clothing-db-a582a.appspot.com",
  messagingSenderId: "727273367920",
  appId: "1:727273367920:web:417b7d1eeddec7f42e07b5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth,googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey,objectsToAdd,field ='title') =>
{
 const collectionRef = collection(db, collectionKey);
 const batch = writeBatch(db);

 objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object[field].toLowerCase());
    batch.set(docRef, object);

 });
 await batch.commit();
}

export const getCategoriesAndDocuments = async () =>{
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);
    const querSnapShot = await getDocs(q);
    const categoryMap = querSnapShot.docs.reduce((acc,docSnapshot) => {
        const {title,items} = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    },{});
    return categoryMap;
}
export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    const userDocRef = doc(db,"users",userAuth.uid);
     const userSnapshot = await getDoc(userDocRef);
    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });

        }
        catch(error){
            console.log('error creating the user',error.message);
        }
    }
    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email,password) => {
    if(!email || !password) return;
    return createUserWithEmailAndPassword(auth,email,password);

}

export const signInAuthUserWithEmailAndPassword = async (email,password) => {
    if(!email || !password) return;
    return signInWithEmailAndPassword(auth,email,password);

}

export const signOutUser = async () => { 
    return signOut(auth);
}

export const onAuthStateChangedListener =  (callback) => onAuthStateChanged(auth, callback)