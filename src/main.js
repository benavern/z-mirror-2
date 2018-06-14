import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyB_TZzRnGXSH-xvPS8hpdqXOcnnVhPKeaM',
  authDomain: 'z-mirror-2.firebaseapp.com',
  databaseURL: 'https://z-mirror-2.firebaseio.com',
  projectId: 'z-mirror-2',
  storageBucket: 'z-mirror-2.appspot.com',
  messagingSenderId: '721220130430'
}

Vue.prototype.$firebase = firebase.initializeApp(config).database()

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
