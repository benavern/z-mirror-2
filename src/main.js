import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Buefy from 'buefy'
import store from './store'
import 'buefy/dist/buefy.css'
import '@mdi/font/css/materialdesignicons.css'
import 'weather-icons2/css/weather-icons.min.css'
import dayjs from 'dayjs'
import 'dayjs/locale/fr'

dayjs.locale('fr')

Vue.use(Buefy)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.meta.authentication && !store.getters['user/isConnected']) {
    next({ path: '/admin/login', query: { to: to.path } })
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
