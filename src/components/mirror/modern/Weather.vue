<template>
  <div id="weather">
    <template v-if="weather">
      <div class="temperature">
        <div class="temp-item">
          <i :class="['wi', 'wi-fw', `wi-owm-${weather.weather[0].id}`, 'temp-icon']"></i>

          <div class="temp-description">
            {{ weather.weather[0].description }}
          </div>
        </div>

        <div class="temp-item">
          <div class="temp-text">
            {{ weather.main.temp | roundHalf }}°
          </div>

          <div class="temp-extrems">
            <span class="temp-extrems-item">
              <b-icon icon="arrow-down" type="is-info" size="is-small"></b-icon>
              {{ weather.main.temp_min | roundHalf }}°
            </span>

            <span class="temp-extrems-item">
              <b-icon icon="arrow-up" type="is-danger" size="is-small"></b-icon>
              {{ weather.main.temp_max | roundHalf }}°
            </span>
          </div>
        </div>
      </div>
    </template>

    <h1 v-else class="error">
      Une erreur est survenue, impossible de récupérer la météo.
    </h1>
  </div>
</template>

<script>
export default {
  name: 'defaultWeather',

  props: ['weather'],

  filters: {
    roundHalf(val = 0) {
      const value = Number(val)
      if (isNaN(value)) return 'NA'
      return Math.round(Number(value)*2)/2
    }
  }
}
</script>

<style lang="scss" scoped>
#weather {
  .temperature {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;

    .temp-item {
      text-align: center;
      font-size: 1.5rem;

      .temp-icon {
        font-size: 5rem;
      }

      .temp-description {
        margin-top: 1rem;
      }

      .temp-text {
        font-size: 5rem;
        margin-left: 1rem;
      }

      .temp-extrems {
        text-align: left;
        margin-top: 1rem;

        .temp-extrems-item + .temp-extrems-item {
          margin-left: 1rem;
        }
      }
    }
  }
  .city {
    margin-bottom: 1rem;
  }
}
</style>
