<template>
  <div class="container">
    <div class="section">
      <div class="mirror-controls">
        <b-field grouped>
          <b-select placeholder="Selectionner un thème" v-model="selectedTheme" @input="updateTheme" expanded>
            <option value="">-- Aucun --</option>

            <option v-for="(option, themeName) in themes" :key="themeName"
              :value="themeName">
              {{ option.displayName }}
            </option>
          </b-select>

          <button
            class="button control"
            @click.prevent="toggleOrientation"
            :disabled="!selectedTheme">
            <b-icon v-if="orientation === 'landscape'" icon="phone-rotate-portrait"></b-icon>
            <b-icon v-if="orientation === 'portrait'" icon="phone-rotate-portrait"></b-icon>
          </button>

          <button class="button control" @click.prevent="fullscreen" :disabled="!selectedTheme">
            <b-icon icon="fullscreen"></b-icon>
          </button>
        </b-field>
      </div>
    </div>

    <div class="section">
      <div class="mirror-container" ref="mirrorContainer" v-if="selectedTheme" :class="{'landscape': orientation === 'landscape'}">
        <div class="mirror" :is="themes[selectedTheme].component" />
      </div>
    </div>
  </div>
</template>

<script>

const themes = {
  default: { displayName: 'Default', component: () => import('@/components/mirror/DefaultMirror.vue') },
  circle: { displayName: 'Circle', component: () => import('@/components/mirror/CircleMirror.vue') },
  modern: { displayName: 'Modern', component: () => import('@/components/mirror/ModernMirror.vue') }
}

const orientations = {
  portrait: 'portrait',
  landscape: 'landscape'
}

export default {
  name: 'mirrorIndex',

  data () {
    return {
      themes,
      selectedTheme: null,
      orientation: 'portrait'
    }
  },

  methods: {
    fullscreen () {
      if(!this.$refs.mirrorContainer) return
      this.$refs.mirrorContainer.webkitRequestFullscreen()
    },

    updateTheme (theme) {
      this.$router.push({
        name: 'mirror',
        params: { theme },
        query: { orientation: this.orientation }
      })
    },

    toggleOrientation() {
      const orientation = this.orientation === orientations.landscape
        ? orientations.portrait
        : orientations.landscape

      this.$router.push({
        name: 'mirror',
        params: { theme: this.selectedTheme },
        query: { orientation }
      })
    }
  },

  watch: {
    $route: {
      handler(newValue) {
        const { params: { theme }, query: { orientation } } = newValue

        this.selectedTheme = themes[theme]
          ? theme
          : null

        this.orientation = Object.values(orientations).includes(orientation)
          ? orientation
          : orientations.portrait
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss">
.mirror-container {
  @import 'bulma/sass/utilities/initial-variables';

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
@import 'bulma/sass/utilities/initial-variables';
@import 'bulma/sass/utilities/derived-variables';

.mirror-container {
  // only when NOT fullscreen
  &:not(:fullscreen) {
    // my screen is H1440xL900
    width: calc(var(--mirror-display-ratio) * 900px);
    height: calc(var(--mirror-display-ratio) * 1440px);
    margin: 2rem auto;
    outline: 1.5rem solid $border;

    &.landscape {
      width: calc(var(--mirror-display-ratio) * 1440px);
      height: calc(var(--mirror-display-ratio) * 900px);
    }

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
