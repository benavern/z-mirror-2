import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'

import AdminIndex from './views/admin/Index.vue'
import Admin from './views/admin/Admin.vue'
import Login from './views/admin/Login.vue'
import Shopping from './views/admin/Shopping.vue'
import Meteo from './views/admin/Meteo.vue'

import Mirror from './views/mirror/Index.vue'

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
          component: AdminIndex,
          meta: {
            displayName: 'Accueil',
            displayInHeader: true,
            authentication: true
          }
        },
        {
          path: 'shopping',
          name: 'shopping',
          component: Shopping,
          meta: {
            displayName: 'Liste de courses',
            displayInHeader: true,
            authentication: true
          }
        },
        {
          path: 'meteo',
          name: 'meteo',
          component: Meteo,
          meta: {
            displayName: 'Météo',
            displayInHeader: true,
            authentication: true
          }
        },
        {
          path: 'login',
          component: Login,
          meta: {
            displayName: 'Connection',
            displayInHeader: false,
            authentication: false
          }
        },
        {
          path: '*',
          redirect: '/admin'
        }
      ]
    },
    {
      path: '/mirror',
      name: 'mirror',
      component: Mirror
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
