<template>
  <div id="mirror">
    <div class="clock">
      <clock class="circle"></clock>
    </div>

    <div class="meteo">
      <weather class="circle weather" :weather="weather" :period="period"></weather>
      <forecast class="circle list forecast" :forecast="forecast"></forecast>
    </div>

    <div class="shopping-list">
      <shopping-list class="circle list" :shopping-list="shoppingList"></shopping-list>
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

<style>

#mirror {
    --padding: 2rem;
    --circle-width: 15rem;
    --primary-color: #16a085;
}

</style>

<style lang="scss" scoped>
  @import 'bulma/sass/utilities/initial-variables';
  @import 'bulma/sass/utilities/derived-variables';

  #mirror {
    padding: var(--padding);
    color: $light;
    background-color: $black;
    font-family: 'Manjari', sans-serif;

    .circle {
      position: relative;
      width: var(--circle-width);
      height: var(--circle-width);
      border: .15rem solid $light;
      border-radius: 50%;
      text-align: center;
      background-color: $black;
      overflow: hidden;

      &.list {
        &:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: calc(var(--circle-width) / 2);
          background-image: linear-gradient(to top, black 15%, transparent)
        }
      }
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
        top: calc(var(--circle-width) * .5);
        right: calc(var(--circle-width) * .75);
      }
    }

    .shopping-list {
      position: absolute;
      bottom: var(--padding);
      right: var(--padding);
    }
  }
</style>
