import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

const fireBaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGEING_SENDER_ID
}

const firebaseApp = firebase.initializeApp(fireBaseConfig)

export const firebaseDb = firebaseApp.database()
export const firebaseAuth = firebaseApp.auth()
