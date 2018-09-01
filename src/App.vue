<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { firebaseAuth } from './firebase.js'

export default {
  name: 'app',
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
