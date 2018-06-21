<template>
  <div class="navbar is-fixed-top is-light">
    <div class="navbar-brand">
      <router-link to="/admin" class="navbar-item">
        <img src="../../assets/icon.png" alt="Z-mirror, a mirror with super power">
      </router-link>

      <h1 class="navbar-item page-title">
        {{ $route.meta.displayName || 'Z-Mirror 2' }}
      </h1>

      <a class="navbar-burger" @click.prevent="toggleMenu">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div :class="['navbar-menu', {'is-active': menuVisible}]" @click="toggleMenu">
      <div class="navbar-end">
        <router-link to="/admin" class="navbar-item">
          Administration
        </router-link>

        <router-link to="/admin/shopping" class="navbar-item">
          Liste de courses
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navigation',
  data () {
    return {
      menuVisible: false,
      routes: []
    }
  },
  mounted () {
    // debugger
    this.routes = this.$router.options.routes
  },
  methods: {
    toggleMenu () {
      this.menuVisible = !this.menuVisible
    }
  }
}
</script>
