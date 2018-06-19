import firebase from 'firebase/app'
import 'firebase/database'

const fireBaseConfig = {
  apiKey: 'AIzaSyB_TZzRnGXSH-xvPS8hpdqXOcnnVhPKeaM',
  authDomain: 'z-mirror-2.firebaseapp.com',
  databaseURL: 'https://z-mirror-2.firebaseio.com',
  projectId: 'z-mirror-2',
  storageBucket: 'z-mirror-2.appspot.com',
  messagingSenderId: '721220130430'
}

export default firebase.initializeApp(fireBaseConfig).database()
