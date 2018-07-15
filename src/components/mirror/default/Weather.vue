<template>
  <div id="weather" v-if="weather">
    <div class="temperature">
      <div class="temp-item left">
        <i :class="['wi', 'wi-fw', `wi-owm-${weather.weather[0].id}`, 'temp-icon']"></i>

        <div class="temp-description">
          ({{ weather.weather[0].description }})
        </div>
      </div>

      <div class="temp-item right">
        <div class="temp-text">
          <span>{{ Math.round(weather.main.temp) }}</span> °C
        </div>
      </div>
    </div>

    <div class="city">
      {{ weather.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'defaultWeather',
  props: ['weather']
}
</script>

<style lang="scss" scoped>
#weather {
  .temperature {
    display: flex;

    .temp-item {
      &.left {
        text-align: center;
      }

      &.right {
        flex: 1;
      }

      .temp-icon {
        font-size: 3rem;
        margin: 1rem 0;
      }

      .temp-description {
        font-size: .75rem;
      }

      .temp-text {
        font-size: 5rem;
        margin-left: 1rem;

        span {
          font-weight: bold;
        }
      }
    }
  }
  .city {
    margin-bottom: 1rem;
  }
}
</style>
