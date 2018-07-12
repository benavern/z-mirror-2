<template>
  <div id="weather" v-if="weather">
    <div class="temperature">
      <div class="temp-item left">
        <i :class="['wi', 'wi-fw', `wi-owm-${weather.weather[0].id}`, 'temp-icon']"></i>

        <div class="temp-description">
          ({{ weather.weather[0].description }})
        </div>
      </div>

      <div class="temp-item">
        <div class="temp-text">
          {{ Math.round(weather.main.temp) }} °C
          <!-- &#8451; -->
        </div>
      </div>
    </div>

    <!-- <div class="city">
      {{ weather.name }}
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'defaultWeather',
  props: ['weather']
}
</script>

<style lang="scss">
#weather {
  .temperature {
    display: flex;

    .temp-item {
      &.left {
        text-align: center;
      }

      .temp-icon {
        font-size: 4rem;
        margin-bottom: 1rem;
      }

      .temp-description {
        font-size: .75rem;
      }

      .temp-text {
        font-size: 5rem;
        font-family: 'Lobster', cursive;
        margin-left: 1rem;
      }
    }

    .city {
      margin-top: 1rem;
    }
  }
}
</style>
