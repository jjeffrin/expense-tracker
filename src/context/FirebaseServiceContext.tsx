import * as React from 'react';
import { createContext, PropsWithChildren } from "react";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, NextOrObserver, onAuthStateChanged, signInWithPopup, Unsubscribe, User, UserCredential, signOut } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDXYDSKWh5Keov314Cw29ueLwGCdHfpkOo",
    authDomain: "authentication-eed69.firebaseapp.com",
    databaseURL: "https://authentication-eed69.firebaseio.com",
    projectId: "authentication-eed69",
    storageBucket: "authentication-eed69.appspot.com",
    messagingSenderId: "145348508659",
    appId: "1:145348508659:web:669e81a20c8affbf1f3086"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

export interface IFirebaseServiceContext {
    signInWithGoogle: () => Promise<UserCredential>
    getCurrentUser: (nextOrObserver: NextOrObserver<User>) => Unsubscribe
    logout: () => Promise<void>
}

export const FirebaseServiceContext = createContext<IFirebaseServiceContext>({} as IFirebaseServiceContext)

export const FirebaseServiceProvider = (props: PropsWithChildren) => {
    
    const signInWithGoogle = () => {
        return signInWithPopup(auth, new GoogleAuthProvider())
    }

    const getCurrentUser = (nextOrObserver: NextOrObserver<User>) => {
        return onAuthStateChanged(auth, nextOrObserver)
    }

    const logout = () => {
        return signOut(auth)
    }

    return (
        <FirebaseServiceContext.Provider value={{ signInWithGoogle, getCurrentUser, logout }}>
            {props.children}
        </FirebaseServiceContext.Provider>
    )
}