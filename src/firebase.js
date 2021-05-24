import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

const fireBaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGEING_SENDER_ID
}

const firebaseApp = firebase.initializeApp(fireBaseConfig)

export const firebaseDb = firebaseApp.database()
export const firebaseAuth = firebaseApp.auth()
