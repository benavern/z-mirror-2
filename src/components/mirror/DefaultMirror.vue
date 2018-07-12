<template>
  <div id="mirror">
    <clock class="clock" />
  </div>
</template>

<script>
import Clock from './default/Clock'

export default {
  name: 'defaultMirror',
  components: { Clock },
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

    .clock {
      position: absolute;
      top: 2rem;
      left: 2rem;
    }
  }
</style>
