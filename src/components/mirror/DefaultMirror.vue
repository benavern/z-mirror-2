<template>
  <div id="mirror">
    <clock class="clock position top left" />

    <div class="meteo position top right">
      <weather class="weather" :weather="weather" />
      <forecast class="forecast" :forecast="forecast" />
    </div>

    <div class="big-message position middle center">
      <big-message :big-message-list="bigMessageList"/>
    </div>

    <div class="todo-list position bottom left">
      <todo-list :todo-list="todoList"></todo-list>
    </div>

    <div class="shopping-list position bottom right">
      <shopping-list class="shopping-list" :shopping-list="shoppingList"></shopping-list>
    </div>
  </div>
</template>

<script>
import Clock from './default/Clock'
import Weather from './default/Weather'
import Forecast from './default/Forecast'
import ShoppingList from './default/ShoppingList'
import TodoList from './default/TodoList'
import BigMessage from './default/BigMessage'

export default {
  name: 'defaultMirror',
  components: { Clock, Weather, Forecast, ShoppingList, TodoList, BigMessage },
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
    },
    todoList () {
      return this.$store.getters['todo/items']
    },
    bigMessageList () {
      return this.$store.getters['bigMessage/items']
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
    padding: 1.5rem;
    color: $light;
    background-color: $black;

    .position {
      position: absolute;
      margin: 1.5rem;
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
        transform: translateX(-50%);
        text-align: center;
      }

      &.middle {
        top: 50%;
        transform: translateY(-50%);

        &.center {
          transform: translate(-50%, -50%);
          max-width: 100%;
        }
      }
    }
  }
</style>
