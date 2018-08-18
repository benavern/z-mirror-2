import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'

import AdminIndex from './views/admin/Index.vue'
import Admin from './views/admin/Admin.vue'
import Login from './views/admin/Login.vue'
import Shopping from './views/admin/Shopping.vue'
import Meteo from './views/admin/Meteo.vue'
import Todo from './views/admin/Todo.vue'
import BigMessage from './views/admin/BigMessage.vue'

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
            authentication: true,
            icon: 'home'
          }
        },
        {
          path: 'shopping',
          name: 'shopping',
          component: Shopping,
          meta: {
            displayName: 'Liste de courses',
            displayInHeader: true,
            authentication: true,
            icon: 'basket-fill',
            iconType: 'is-primary',
            subtitle: null,
            description: 'Pour ne jamais se retrouver le frigo vide.'
          }
        },
        {
          path: 'meteo',
          name: 'meteo',
          component: Meteo,
          meta: {
            displayName: 'Météo',
            displayInHeader: true,
            authentication: true,
            icon: 'weather-partlycloudy',
            iconType: 'is-warning',
            subtitle: 'En direct et prévisions',
            description: 'Parce qu\'en T-shirt sous la pluie c\'est pas marrant!'
          }
        },
        {
          path: 'todo',
          name: 'todo',
          component: Todo,
          meta: {
            displayName: 'Liste de tâches',
            displayInHeader: true,
            authentication: true,
            icon: 'format-list-checks',
            iconType: 'is-success',
            subtitle: 'Pour ne rien oublier',
            description: 'Un RDV ? Un rappel ? etc ... pas de problème!'
          }
        },
        {
          path: 'big-message',
          name: 'big-message',
          component: BigMessage,
          meta: {
            displayName: 'Messages',
            displayInHeader: true,
            authentication: true,
            icon: 'message-text-outline',
            iconType: 'is-info',
            subtitle: 'Pour dire bonjour / faire plaisir / ...',
            description: 'Faire passer un message qu\'on ne pourra pas ratter'
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
      path: '/mirror/:theme?',
      name: 'mirror',
      component: Mirror
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
