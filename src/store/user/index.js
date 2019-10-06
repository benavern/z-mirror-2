export default {
  namespaced: true,
  state: {
    db: {},
    local: {
      user: null
    }
  },
  getters: {
    isConnected (state) {
      return !!state.local.user
    }
  },
  mutations: {
    setUser (state, user) {
      state.local.user = { ...user }
    },
    resetUser (state) {
      state.local.user = null
    }
  },
  actions: {
    login ({ commit }, user) {
      return commit('setUser', user)
    },
    logout ({ commit }) {
      return commit('resetUser')
    }
  }
}
