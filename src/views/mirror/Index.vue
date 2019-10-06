<template>
  <div class="container">
    <div class="section">
      <div class="mirror-controls">
        <b-field grouped>
          <b-select placeholder="Selectionner un thème" v-model="selectedTheme" @input="updateTheme" expanded>
            <option value="">-- Aucun --</option>

            <option v-for="(option, index) in themes" :key="index"
              :value="option">
              {{ option.name }}
            </option>
          </b-select>

          <button class="button" @click.prevent="fullscreen" :disabled="!currentTheme">
            <b-icon icon="fullscreen"></b-icon>
          </button>
        </b-field>
      </div>
    </div>

    <div class="section">
      <div class="mirror-container" ref="mirrorContainer" v-if="selectedTheme && currentTheme">
        <div class="mirror" :is="currentTheme.component" />
      </div>
    </div>
  </div>
</template>

<script>

const themes = [
  { name: 'Default', routeParam: 'default', component: 'default-mirror' }
]

export default {
  name: 'mirrorIndex',
  components: {
    DefaultMirror: () => import('../../components/mirror/DefaultMirror.vue')
  },
  data () {
    return {
      themes,
      currentTheme: null,
      selectedTheme: null
    }
  },
  created () {
    this.getThemeFromRouteParam(this.$route.params.theme)
      .then(theme => {
        this.currentTheme = theme
        this.selectedTheme = theme
      })
      .catch(() => {
        this.$router.replace('/mirror')
      })
  },
  beforeRouteUpdate (to, from, next) {
    this.getThemeFromRouteParam(to.params.theme)
      .then(theme => {
        this.currentTheme = theme
        next()
      })
      .catch(err => {
        next(err)
      })
  },
  methods: {
    fullscreen () {
      this.$refs.mirrorContainer.webkitRequestFullscreen()
    },
    getThemeFromRouteParam (param) {
      return new Promise((resolve, reject) => {
        const theme = themes.find(theme => theme.routeParam === param)
        if (theme || !param) resolve(theme)
        else reject(new Error(`Le theme (${param}) n'existe pas`))
      })
    },
    updateTheme (to) {
      if (!to) {
        this.$router.push('/mirror')
        return
      }

      this.getThemeFromRouteParam(to.routeParam)
        .then(theme => {
          this.$router.push(`/mirror/${to.routeParam}`)
        })
        .catch(err => {
          throw err
        })
    }
  }
}
</script>

<style lang="scss">
.mirror-container {
  @import '~bulma/sass/utilities/initial-variables';

  --mirror-display-ratio: 0.25;

  @media (min-width: $tablet) {
    --mirror-display-ratio: 0.5;
  }

  @media (min-width: $desktop) {
    --mirror-display-ratio: 0.75;
  }

  .debug {
    border: 1px dotted pink;

    pre {
      text-align: left;
    }
  }
}
</style>

<style lang="scss" scoped>
@import '~bulma/sass/utilities/initial-variables';
@import '~bulma/sass/utilities/derived-variables';

.mirror-container {
  // only when NOT fullscreen
  &:not(:fullscreen) {
    // my screen is H1440xL900
    width: calc(var(--mirror-display-ratio) * 900px);
    height: calc(var(--mirror-display-ratio) * 1440px);
    margin: 2rem auto;
    outline: 1.5rem solid $border;

    .mirror {
      zoom: var(--mirror-display-ratio);
      overflow: auto;
    }
  }

  // only when fullscreen
  &:fullscreen {
    width: 100%;
    height: 100%;

    .mirror {
      overflow: hidden;
    }
  }

  // always
  .mirror {
    width: 100%;
    height: 100%;
    position: relative;
  }
}
</style>
