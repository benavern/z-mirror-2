<template>
  <div class="navbar is-fixed-top is-light">
    <div class="container">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item">
          <img src="@/assets/icon.png" alt="Z-mirror, a mirror with super power">
        </router-link>

        <div class="navbar-item page-title">
          <h6 class="title is-6">
            {{ currentRouteName }}
          </h6>
        </div>

        <a class="navbar-burger" @click.prevent="toggleMenu" v-if="userConnected">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div :class="['navbar-menu', {'is-active': menuVisible}]" @click="toggleMenu" v-if="userConnected">
        <div class="navbar-end">

          <router-link v-for="route in routes" :key="route.path"
            :to="route.path"
            class="navbar-item"
            exact-active-class="is-active">
            <b-icon :icon="route.icon" class="navbar-item-icon" v-if="route.icon"/>

            <span>
              {{ route.name }}
            </span>
          </router-link>

          <a class="navbar-item" @click.prevent="logout">
            <b-icon icon="account-remove" class="navbar-item-icon"/>

            <span>
              Déconnection
            </span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { firebaseAuth } from '@/firebase.js'
import { mapGetters } from 'vuex'

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
          name: route.meta.displayName,
          icon: route.meta.icon
        }
      })

    return {
      menuVisible: false,
      routes
    }
  },
  computed: {
    currentRouteName () {
      return this.$route.meta.displayName || 'Z-Mirror 2'
    },
    ...mapGetters({
      userConnected: 'user/isConnected'
    })
  },
  methods: {
    toggleMenu () {
      this.menuVisible = !this.menuVisible
    },

    logout () {
      firebaseAuth.signOut().then(() => {
        // Sign-out successful.
        this.$router.go('/admin/login')
      }).catch(() => {
        // An error happened.
        this.$buefy.toast.open({
          message: `Une erreur est survenue`,
          position: 'is-bottom',
          type: 'is-danger'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  .navbar-item {
    .navbar-item-icon {
      margin-right: .5rem;
    }
  }
}
</style>
