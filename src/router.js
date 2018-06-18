import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'

import Index from './views/admin/Index.vue'
import Admin from './views/admin/Admin.vue'
import Shopping from './views/admin/Shopping.vue'

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
          component: Index
        },
        {
          path: 'shopping',
          name: 'shopping',
          component: Shopping
        }
      ]
    }
  ]
})
