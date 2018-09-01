import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseDb } from './firebase'

import shopping from './store/shopping'
import shoppingPlugin from './store/shopping/shoppingPlugin'

import meteo from './store/meteo'
import meteoPlugin from './store/meteo/meteoPlugin'

import todo from './store/todo'
import todoPlugin from './store/todo/todoPlugin'

import bigMessage from './store/bigMessage'
import bigMessagePlugin from './store/bigMessage/bigMessagePlugin'

import user from './store/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    shopping,
    meteo,
    todo,
    bigMessage,
    user
  },
  plugins: [
    shoppingPlugin(firebaseDb),
    meteoPlugin(firebaseDb),
    todoPlugin(firebaseDb),
    bigMessagePlugin(firebaseDb)
  ]
})
