<template>
  <div class="navbar is-fixed-top is-light">
    <div class="container">
      <div class="navbar-brand">
        <router-link to="/admin" class="navbar-item">
          <img src="../../assets/icon.png" alt="Z-mirror, a mirror with super power">
        </router-link>

        <div class="navbar-item page-title">
          <h6 class="title is-6">
            {{ $route.meta.displayName || 'Z-Mirror 2' }}
          </h6>
        </div>

        <a class="navbar-burger" @click.prevent="toggleMenu">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div :class="['navbar-menu', {'is-active': menuVisible}]" @click="toggleMenu">
        <div class="navbar-end">

          <router-link v-for="route in routes" :key="route.path"
            :to="route.path" class="navbar-item">
            {{ route.name }}
          </router-link>

          <a class="navbar-item" @click.prevent="logout">
            Déconnection
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navigation',
  data () {
    const routes = this.$router.options.routes
      .find(route => route.path === '/admin' && route.children)
      .children
      .filter(route => route.meta && route.meta.displayInHeader)
      .map((route) => {
        return {
          path: `/admin/${route.path}`,
          name: route.meta.displayName
        }
      })

    return {
      menuVisible: false,
      routes
    }
  },
  methods: {
    toggleMenu () {
      this.menuVisible = !this.menuVisible
    },

    logout () {
      sessionStorage.removeItem('authenticated')
      this.$router.go('/admin/login')
    }
  }
}
</script>
