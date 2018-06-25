<template>
    <section class="section">

      <div class="card" v-if="autocomplete.selected">
        <div class="card-content">
          <div class="media meteo-card">
            <div class="media-left">
              <i :class="['wi', 'wi-fw', `wi-owm-${autocomplete.selected.weather[0].id}`]"></i>
            </div>

            <div class="media-content">
              <div class="title is-6">
                [{{ autocomplete.selected.sys.country }}] {{ autocomplete.selected.name }}
              </div>

              <div class="subtitle is-7">
                {{ Math.round(autocomplete.selected.main.temp) }}&#8451;
                -
                <span class="description">{{ autocomplete.selected.weather[0].description }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br v-if="autocomplete.selected">

      <b-field>
        <b-autocomplete
          v-model="autocomplete.name"
          :data="autocomplete.data"
          placeholder="Nom de la ville"
          field="Ville"
          :loading="autocomplete.isFetching"
          @input="getAutocompleteData"
          @select="option => autocomplete.selected = option">

          <template slot-scope="props">
            <div class="media meteo-card">
              <div class="media-left">
                <i :class="['wi', 'wi-fw', `wi-owm-${props.option.weather[0].id}`]"></i>
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
    </section>
</template>

<script>
import debounce from 'lodash.debounce'

export default {
  data () {
    return {
      autocomplete: {
        data: [],
        name: '',
        selected: null,
        isFetching: false
      }
    }
  },
  methods: {
    getAutocompleteData: debounce(function () {
      this.autocomplete.data = []
      if (this.autocomplete.name) {
        this.autocomplete.isFetching = true
        this.$store.dispatch('meteo/getAutocompleteData', {name: this.autocomplete.name})
          .then(() => {
            this.autocomplete.data = this.$store.getters['meteo/autocompleteData']
            this.autocomplete.isFetching = false
          })
      }
    }, 500)
  }
}
</script>

<style lang="scss" scoped>
  .meteo-card {
    .media-left {
      .wi {
        font-size: 2rem;
      }
    }

    .description {
      text-transform: capitalize;
    }
  }
</style>
