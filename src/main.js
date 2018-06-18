import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase/app'
import 'firebase/database'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Buefy)

const fireBaseConfig = {
  apiKey: 'AIzaSyB_TZzRnGXSH-xvPS8hpdqXOcnnVhPKeaM',
  authDomain: 'z-mirror-2.firebaseapp.com',
  databaseURL: 'https://z-mirror-2.firebaseio.com',
  projectId: 'z-mirror-2',
  storageBucket: 'z-mirror-2.appspot.com',
  messagingSenderId: '721220130430'
}

Vue.prototype.$firebase = firebase.initializeApp(fireBaseConfig).database()

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
