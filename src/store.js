import Vue from 'vue'
import Vuex from 'vuex'
import firebaseDb from './firebase'

import shopping from './store/shopping'
import shoppingPlugin from './store/shopping/shoppingPlugin'

import meteo from './store/meteo'
import meteoPlugin from './store/meteo/meteoPlugin'

import todo from './store/todo'
import todoPlugin from './store/todo/todoPlugin'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    shopping,
    meteo,
    todo
  },
  plugins: [
    shoppingPlugin(firebaseDb),
    meteoPlugin(firebaseDb),
    todoPlugin(firebaseDb)
  ]
})
