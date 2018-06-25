import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    db: {
      settings: {
        city: {},
        unit: ''
      },
      data: {
        weather: {},
        forecast: {}
      }
    },
    local: {
      api: {
        baseUrl: 'https://api.openweathermap.org/data/2.5/',
        key: process.env.VUE_APP_OPENWEATHERMAP_API_KEY
      },
      autocompleteData: []
    }
  },
  getters: {
    autocompleteData: state => state.local.autocompleteData
  },
  mutations: {
    setAutocompleteData (state, {list}) {
      Vue.set(state.local, 'autocompleteData', [...list])
    },
    resetAutocompleteData (state) {
      Vue.set(state, 'items', [])
    }
  },
  actions: {
    getAutocompleteData ({state, commit}, payload) {
      return fetch(`${state.local.api.baseUrl}find?appid=${state.local.api.key}&q=${payload.name}&mode=json&units=metric&type=like&lang=fr`)
        .then(response => response.json())
        .then(data => commit('setAutocompleteData', data))
        .catch(() => commit('resetAutocompleteData'))
    }
  }
}
