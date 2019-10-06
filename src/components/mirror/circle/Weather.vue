<template>
  <div id="weather" v-if="weather">
    <div class="weather-content">
      <div class="temperature">
        <div class="temp-item left">
          <i :class="['wi', 'wi-fw', `wi-owm-${weather.weather[0].id}`, 'temp-icon']"></i>
        </div>

        <div class="temp-item right">
          <div class="temp-text">
            <span>{{ Math.round(weather.main.temp) }}</span> °C
          </div>
        </div>
      </div>

      <div class="temp-description">
        {{ weather.weather[0].description }}
      </div>

      <div class="city">
        À <b>{{ weather.name }}</b>
      </div>
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
    position: relative;

    .weather-content {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 100%;
    }

    .temp-icon {
      font-size: 4rem;
    }

    .temp-description {
      font-size: .75rem;
      margin-bottom: .5rem;
    }

    .temp-text {
      font-size: 4rem;
      line-height: 4rem;
      margin-top: .5em;
    }
  }
</style>
