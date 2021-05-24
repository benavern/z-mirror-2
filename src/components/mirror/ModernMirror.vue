<template>
  <div id="mirror">
    <div class="mirror-line justify-end">
      <Clock />
    </div>

    <div class="mirror-line">
      <Weather :weather="weather" />
    </div>

    <div class="mirror-line justify-center">
      <Features :shopping-list="shoppingList"/>
    </div>
  </div>
</template>

<script>
import Clock from './modern/Clock.vue'
import Weather from './modern/Weather.vue'
import Features from './modern/Features.vue'

export default {
  name: 'ModernMirror',

  components: { Clock, Weather, Features },

  data () {
    return {
      updateMeteoInterval: null,
      period: 'day'
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
      this.updatePeriod()
    },
    updatePeriod () {
      const nowH = new Date().getHours()
      const isDay = nowH < 20 && nowH > 8
      this.period = isDay ? 'day' : 'night'
    }
  },

  mounted () {
    // refresh meteo data regularily
    clearInterval(this.updateMeteoInterval)
    const t = 1000 * 60 * 60 * 2 // (1000ms -> 1s) * (60s -> 1min) | (60min -> 1h) * 2 = 2h
    this.updateMeteoInterval = setInterval(this.updateMeteo, t)

    // update the day part (day / night)
    this.updatePeriod()
  },

  beforeDestroy () {
    clearInterval(this.updateMeteoInterval)
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;400;700&display=swap');
@import 'bulma/sass/utilities/initial-variables';
@import 'bulma/sass/utilities/derived-variables';

#mirror {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem;
  color: $light;
  background-color: $black;
  font-family: Poppins, sans-serif;
  font-weight: lighter;

  * {
    line-height: 1;
  }

  .mirror-line {
    display: flex;
    justify-content: space-between;


    &.justify-end {
      justify-content: flex-end;
    }

    &.justify-center {
      justify-content: space-around;
    }
  }
}
</style>
