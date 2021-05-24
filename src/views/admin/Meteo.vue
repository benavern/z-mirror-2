<template>
    <section class="section">
      <b-field>
        <b-autocomplete
          v-model="autocomplete.name"
          :data="autocomplete.data"
          placeholder="Nom de la ville"
          field="Ville"
          :loading="autocomplete.isFetching"
          @input="getAutocompleteData"
          @select="selectCity">

          <template slot-scope="props">
            <div class="media meteo-card">
              <div class="media-left">
                <i :class="['wi', 'wi-fw', `wi-owm-${props.option.weather[0].id}`, 'is-size-3']"></i>
              </div>

              <div class="media-content">
                <div class="title is-6">
                  [{{ props.option.sys.country }}] {{ props.option.name }}
                </div>

                <div class="subtitle is-7">
                {{ Math.round(props.option.main.temp) }}&#8451;
                -
                <span class="description">{{ props.option.weather[0].description }}</span>
              </div>
              </div>
            </div>
          </template>

        </b-autocomplete>
      </b-field>

      <div class="card selected-city-card" v-if="currentCityWeather || currentCityForecast">
        <div class="card-content" v-if="currentCityWeather">
          <div class="media meteo-card">
            <div class="media-left">
              <i :class="['wi', 'wi-fw', `wi-owm-${currentCityWeather.weather[0].id}`, 'is-size-3']"></i>
            </div>

            <div class="media-content">
              <div class="title is-6">
                [{{ currentCityWeather.sys.country }}] {{ currentCityWeather.name }}
              </div>

              <div class="subtitle is-7">
                {{ Math.round(currentCityWeather.main.temp) }}&#8451;
                -
                <span class="description">{{ currentCityWeather.weather[0].description }}</span>
              </div>
            </div>

            <div class="media-right">
              <button class="refresh-button button is-rounded is-white is-small" @click.prevent="refreshCurrentCityData">
                <b-icon icon="refresh" size="is-small" :custom-class="refreshing ? 'spin' : ''"></b-icon>
              </button>
            </div>
          </div>
        </div>

        <div class="card-footer" v-if="currentCityForecast">
          <div class="card-footer-item"
            v-for="forecast in currentCityForecast" :key="forecast.dt">
            <div class="forecast-item has-text-centered">
              <div class="day-name is-size-7">
                {{ getDay(forecast.dt) }}
              </div>

              <div class="icone">
                <i :class="['wi', 'wi-fw', `wi-owm-${forecast.weather[0].id}`, 'is-size-4']"></i>
              </div>

              <div class="temp is-size-7">
                <div class="min">
                  <b-icon icon="chevron-down" type="is-info" size="is-small"></b-icon>
                  {{ Math.round(forecast.temp.min) }}&#8451;
                </div>

                <div class="max">
                  <b-icon icon="chevron-up" type="is-danger" size="is-small"></b-icon>
                  {{ Math.round(forecast.temp.max) }}&#8451;
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
import debounce from 'lodash.debounce'
import dayjs from 'dayjs'

export default {
  data () {
    return {
      autocomplete: {
        data: [],
        name: '',
        selected: null,
        isFetching: false
      },
      refreshing: false,
      interval: null
    }
  },
  methods: {
    getAutocompleteData: debounce(function () {
      this.autocomplete.data = []
      if (this.autocomplete.name) {
        this.autocomplete.isFetching = true
        this.$store.dispatch('meteo/fetchAutocompleteData', { name: this.autocomplete.name })
          .then(() => {
            this.autocomplete.data = this.$store.getters['meteo/autocompleteData']
            this.autocomplete.isFetching = false
          })
      }
    }, 500),

    selectCity (option) {
      this.$store.dispatch('meteo/updateCityCode', option)
    },
    getDay (dt = 0) {
      return dayjs.unix(dt).format('dddd')
    },
    refreshCurrentCityData () {
      this.refreshing = true
      this.$store.dispatch('meteo/fetchData')
        .then(() => {
          this.refreshing = false
        })
    }
  },
  computed: {
    currentCityWeather () {
      return this.$store.getters['meteo/currentCityWeather']
    },
    currentCityForecast () {
      return this.$store.getters['meteo/currentCityForecast']
    }
  }
}
</script>

<style lang="scss" scoped>

  @keyframes spin {
      from {transform:rotate(0deg);}
      to {transform:rotate(360deg);}
  }

  .meteo-card {
    .media-content {
      .description {
        text-transform: capitalize;
      }
    }
  }

  .selected-city-card {
    .refresh-button ::v-deep .spin {
      animation: spin 1s infinite linear;
    }

    .forecast-item {
      .day-name {
        text-transform: capitalize;
      }

      .icone {
        margin: .5rem 0
      }
    }
  }
</style>
