import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    db: {
      cityCode: null
    },
    local: {
      api: {
        baseUrl: 'https://api.openweathermap.org/data/2.5/',
        key: process.env.VUE_APP_OPENWEATHERMAP_API_KEY
      },
      autocompleteData: [],
      data: {
        weather: null,
        forecast: null
      }
    }
  },
  getters: {
    autocompleteData: state => state.local.autocompleteData,
    currentCityWeather: state => state.local.data.weather,
    currentCityForecast: state => state.local.data.forecast
  },
  mutations: {
    setAutocompleteData (state, {list}) {
      Vue.set(state.local, 'autocompleteData', [...list])
    },
    resetAutocompleteData (state) {
      Vue.set(state, 'items', [])
    },
    setDataWeather (state, payload) {
      Vue.set(state.local.data, 'weather', payload)
    },
    setDataForecast (state, {list}) {
      Vue.set(state.local.data, 'forecast', [...list])
    },
    setSettingsCityCode (state, {code}) {
      state.db.cityCode = code
    }
  },
  actions: {
    fetchAutocompleteData ({state, commit}, payload) {
      return fetch(`${state.local.api.baseUrl}find?appid=${state.local.api.key}&q=${encodeURIComponent(payload.name)}&mode=json&units=metric&type=like&lang=fr`)
        .then(response => response.json())
        .then(data => commit('setAutocompleteData', data))
        .catch(() => commit('resetAutocompleteData'))
    },
    selectCity ({commit, dispatch}, payload) {
      commit('setSettingsCityCode', {code: payload.id})
      return dispatch('fetchData')
    },
    fetchData ({state, commit}) {
      if (state.db.cityCode) {
        const fetchDataWeather = fetch(`${state.local.api.baseUrl}weather?appid=${state.local.api.key}&id=${state.db.cityCode}&mode=json&units=metric&lang=fr`)
          .then(res => res.json())
        const fetchDataForecast = fetch(`${state.local.api.baseUrl}forecast/daily?appid=${state.local.api.key}&id=${state.db.cityCode}&mode=json&units=metric&cnt=4&lang=fr`)
          .then(res => res.json())
        return Promise.all([fetchDataWeather, fetchDataForecast])
          .then(([weatherData, weatherForecast]) => {
            commit('setDataWeather', weatherData)
            commit('setDataForecast', weatherForecast)
          })
      }
    }
  }
}
