<template>
  <div id="mirror">
    <h1>Mirroir par défaut</h1>
  </div>
</template>

<script>
export default {
  name: 'defaultMirror',
  computed: {
    weather () {
      return this.$store.getters['meteo/currentCityWeather']
    },
    forecast () {
      return this.$store.getters['meteo/currentCityForecast']
    },
    shoppingList () {
      return this.$store.getters['shopping/items']
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~bulma/sass/utilities/initial-variables';
  @import '~bulma/sass/utilities/derived-variables';

  #mirror {
    padding: 1rem;
    color: $light;
    background-color: $black;
  }
</style>
