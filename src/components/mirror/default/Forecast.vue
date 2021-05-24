<template>
  <div id="forecast" v-if="forecast">
    <div class="previsions">
      <div class="prevision" v-for="prevision in forecast" :key="prevision.dt">
        <div class="day-name">
          {{ getDay(prevision.dt) }}
        </div>

        <div class="prevision-icon">
          <i :class="['wi', 'wi-fw', `wi-owm-${prevision.weather[0].id}`]"></i>
        </div>

        <div class="temp">
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
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'defaultForecast',
  props: ['forecast'],
  methods: {
    getDay (dt = 0) {
      return dayjs.unix(dt).format('dddd')
    }
  }
}
</script>

<style lang="scss" scoped>
  #forecast {
    .previsions {
      display: flex;

      .prevision {
        flex: 1;
        text-align: center;

        &:not(:last-child) {
          padding-right: 2rem;
        }

        .day-name {
          text-transform: capitalize;
        }

        .prevision-icon {
          margin: .5rem 0;
          font-size: 1.5rem;
        }
      }
    }
  }
</style>
