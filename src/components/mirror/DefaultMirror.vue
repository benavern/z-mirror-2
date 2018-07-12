<template>
  <div id="mirror">
    <clock class="clock position top left" />

    <div class="meteo position top right">
      <weather class="weather" :weather="weather" />
      <forecast class="forecast" :forecast="forecast" />
    </div>

    <div class="shoppingList position bottom right">
      <shopping-list class="shopping-list" :shopping-list="shoppingList"></shopping-list>
    </div>
  </div>
</template>

<script>
import Clock from './default/Clock'
import Weather from './default/Weather'
import Forecast from './default/Forecast'
import ShoppingList from './default/ShoppingList'

export default {
  name: 'defaultMirror',
  components: { Clock, Weather, Forecast, ShoppingList },
  data () {
    return {
      updateMeteoInterval: null
    }
  },
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
  },
  methods: {
    updateMeteo () {
      this.$store.dispatch('meteo/fetchData')
    }
  },
  mounted () {
    // refresh meteo data regularily
    clearInterval(this.updateMeteoInterval)
    const t = 1000 * 60 * 60 * 2 // (1000ms -> 1s) * (60s -> 1min) | (60min -> 1h) * 2 = 2h
    this.updateMeteoInterval = setInterval(this.updateMeteo, t)
  },
  beforeDestroy () {
    clearInterval(this.updateMeteoInterval)
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
