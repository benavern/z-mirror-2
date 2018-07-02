<template>
  <div class="container">
    <div class="section">
      <div class="mirror-controls">
        <button class="button" @click.prevent="fullscreen">
          <b-icon icon="fullscreen"></b-icon>
        </button>
      </div>

      <div class="mirror-container" ref="mirrorContainer">
        <div class="mirror has-background-dark has-text-white">
          <h1>Mirror content</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mirrorIndex',
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
    fullscreen () {
      this.$refs.mirrorContainer.webkitRequestFullscreen()
    }
  }
}
</script>

<style lang="scss">
.mirror-container {
  --mirror-display-ratio: 0.75;
}
</style>

<style lang="scss" scoped>
@import '~bulma/sass/utilities/initial-variables';
@import '~bulma/sass/utilities/derived-variables';

.mirror-container {
  // only when not fullscreen
  &:not(:fullscreen) {
    width: calc(var(--mirror-display-ratio) * 900px);
    height: calc(var(--mirror-display-ratio) * 1440px);
    margin: 2rem auto;
    outline: 2rem solid $light;

    .mirror {
      zoom: var(--mirror-display-ratio);
    }
  }

  // only when fullscreen
  &:fullscreen {
    width: 100%;
    height: 100%;
  }

  // always
  .mirror {
    padding: 2rem;
    width: 100%;
    height: 100%;
    position: relative;
  }
}
</style>
