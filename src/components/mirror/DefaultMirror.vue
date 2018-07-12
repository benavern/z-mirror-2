<template>
  <div id="mirror">
    <clock class="clock position top left" />

    <div class="meteo position top right">
      <weather class="weather" :weather="weather" />
      <forecast class="forecast" :forecast="forecast" />
    </div>
  </div>
</template>

<script>
import Clock from './default/Clock'
import Weather from './default/Weather'
import Forecast from './default/Forecast'

export default {
  name: 'defaultMirror',
  components: { Clock, Weather, Forecast },
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

    .position {
      position: absolute;
      margin: 1rem;

      max-width: 50%;

      &.top {
        top: 0;
      }

      &.left {
        left: 0;
      }

      &.right {
        right: 0;
        text-align: right;
      }

      &.bottom {
        bottom: 0;
      }

      &.center {
        left: 50%;
        transform: translateX(-50%)
      }

      &.middle {
        top: 50%;
        transform: translateY(-50%)
      }
    }
  }
</style>
