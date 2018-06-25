import Vue from 'vue'
import Vuex from 'vuex'
import firebaseDb from './firebase'

import shopping from './store/shopping'
import shoppingPlugin from './store/shopping/shoppingPlugin'

import meteo from './store/meteo'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    shopping,
    meteo
  },
  plugins: [
    shoppingPlugin(firebaseDb)
  ]
})
