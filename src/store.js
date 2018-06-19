import Vue from 'vue'
import Vuex from 'vuex'
import firebaseDb from './firebase'

import shopping from './store/shopping'
import shoppingPlugin from './store/shopping/shoppingPlugin'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    shopping
  },
  plugins: [
    shoppingPlugin(firebaseDb)
  ]
})
