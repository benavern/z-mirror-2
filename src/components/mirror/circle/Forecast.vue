<template>
  <div id="forecast" v-if="forecast">
    <div class="forecast-content">
      <div class="previsions">
        <div class="prevision" v-for="prevision in forecast" :key="prevision.dt">
          <div class="day-name prevision-item">
            {{ getDay(prevision.dt) }}
          </div>

          <div class="prevision-icon prevision-item">
            <i :class="['wi', 'wi-fw', `wi-owm-${prevision.weather[0].id}`]"></i>
          </div>

          <div class="temp prevision-item">
            <div class="min">
              <b-icon icon="chevron-down" type="is-info" size="is-small"></b-icon>
              {{ Math.round(prevision.temp.min) }}&#8451;
            </div>

            <div class="max">
              <b-icon icon="chevron-up" type="is-danger" size="is-small"></b-icon>
              {{ Math.round(prevision.temp.max) }}&#8451;
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'defaultForecast',
  props: ['forecast'],
  methods: {
    getDay (dt = 0) {
      return moment.unix(dt).format('dddd D')
    }
  }
}
</script>

<style lang="scss" scoped>
  #forecast {
    position: relative;

    .forecast-content {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 100%;
    }

    .previsions {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: .7rem;

      .prevision {
        display: flex;
        text-align: center;
        padding: 0 1em;

        &:not(:last-child) {
          margin-bottom: .5em;
          border-bottom: 1px solid rgba(#fff, .3);
        }

        .day-name {
          text-transform: capitalize;
          width: 6em;
          text-align: right;
          padding-top: .5em;
        }

        .prevision-icon {
          margin: 0 .5em;
          font-size: 1.5em;
        }
      }
    }
  }
</style>
