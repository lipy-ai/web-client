// Import the functions you need from the SDKs you need

import { getApps, initializeApp } from 'firebase/app'
import { browserLocalPersistence, getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getFunctions } from 'firebase/functions'
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_APT_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MESUREMENT_ID,
}

// Initialize Firebase
export const firebase_app =
    getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

export const firebase_auth = getAuth()
export const firebase_db = getFirestore(firebase_app)
export const firebase_fn = getFunctions(firebase_app)
export const firebase_storage = getStorage(firebase_app)

if (process.env.NEXT_PUBLIC_APP_ENV === 'staging') {
    firebase_auth.setPersistence(browserLocalPersistence)
}
