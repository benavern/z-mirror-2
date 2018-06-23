import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'

import Index from './views/admin/Index.vue'
import Admin from './views/admin/Admin.vue'
import Login from './views/admin/Login.vue'
import Shopping from './views/admin/Shopping.vue'
import Meteo from './views/admin/Meteo.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/admin',
      component: Admin,
      children: [
        {
          path: '',
          component: Index,
          meta: {
            displayName: 'Accueil',
            authentication: true
          }
        },
        {
          path: 'login',
          component: Login,
          meta: {
            displayName: 'Connection'
          }
        },
        {
          path: 'shopping',
          name: 'shopping',
          component: Shopping,
          meta: {
            displayName: 'Liste de courses',
            authentication: true
          }
        },
        {
          path: 'meteo',
          name: 'meteo',
          component: Meteo,
          meta: {
            displayName: 'Météo',
            authentication: true
          }
        },
        {
          path: '*',
          redirect: '/admin'
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
