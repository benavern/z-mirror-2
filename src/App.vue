<template>
  <div id="z-mirror-app">
    <Navigation />

    <router-view/>
  </div>
</template>

<script>
import { firebaseAuth } from './firebase.js'
import Navigation from '@/components/Navigation.vue'

export default {
  name: 'app',
  components: { Navigation },
  mounted () {
    firebaseAuth
      .onAuthStateChanged(user => {
        if (user) {
          // User is signed in.
          this.$store.dispatch('user/login', user)
            .then(() => {
              this.$router.replace(this.$route.query.to || '/admin')
            })
        } else {
          // User is signed out.
          if (this.$store.getters['user/isConnected'] && this.$route.meta.authentication) {
            this.$store.dispatch('user/logout')
          }
        }
      })
  }
}
</script>

<style scoped>
#z-mirror-app {
  padding-top: 3.25rem;
}
</style>
