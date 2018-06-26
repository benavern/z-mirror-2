export default function (firebase) {
  return store => {
    firebase.ref('meteo/cityCode').on('value', cityCode => {
      store.commit('meteo/setCityCode', { code: cityCode.val() })
      store.dispatch('meteo/fetchData')
    })
  }
}
