import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebaseDb from './firebase'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import '@mdi/font/css/materialdesignicons.css'
import store from './store'

Vue.use(Buefy)

Vue.prototype.$firebase = firebaseDb

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
