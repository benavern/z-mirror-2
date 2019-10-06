<template>
  <div id="mirror">
    <div class="clock">
      <clock class="circle"></clock>
    </div>

    <div class="meteo">
      <weather class="circle weather" :weather="weather"></weather>
      <forecast class="circle forecast" :forecast="forecast"></forecast>
    </div>

    <div class="shopping-list">
      <shopping-list class="circle" :shopping-list="shoppingList"></shopping-list>
    </div>
  </div>
</template>

<script>
import Clock from './circle/Clock.vue'
import Weather from './circle/Weather.vue'
import Forecast from './circle/Forecast.vue'
import ShoppingList from './circle/ShoppingList.vue'

export default {
  name: 'circleMirror',
  components: {
    Clock,
    Weather,
    Forecast,
    ShoppingList
  },
  data () {
    return { updateMeteoInterval: null }
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

  // external font
  @import url('https://fonts.googleapis.com/css?family=Manjari&display=swap');

  #mirror {
    --padding: 2rem;

    padding: var(--padding);
    color: $light;
    background-color: $black;
    font-family: 'Manjari', sans-serif;

    .circle {
      position: relative;
      width: 15rem;
      height: 15rem;
      border: .15rem solid $light;
      border-radius: 50%;
      text-align: center;
      background-color: $black;
      overflow: hidden;
    }

    .clock {
      position: absolute;
      top: var(--padding);
      left: var(--padding);
    }

    .meteo {
      position: absolute;
      top: var(--padding);
      right: var(--padding);

      .forecast {
        position: absolute;
        top: 8rem;
        right: 11rem;
      }
    }

    .shopping-list {
      position: absolute;
      bottom: var(--padding);
      right: var(--padding);
    }
  }
</style>
