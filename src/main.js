import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Buefy from 'buefy'
import store from './store'
import 'buefy/lib/buefy.css'
import '@mdi/font/css/materialdesignicons.css'
import 'weather-icons/css/weather-icons.css'
import moment from 'moment'

Vue.use(Buefy)

Vue.config.productionTip = false

moment.locale('fr')

router.beforeEach((to, from, next) => {
  if (to.meta.authentication && !sessionStorage.getItem('authenticated')) {
    next({path: '/admin/login', query: { to: to.path }})
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
