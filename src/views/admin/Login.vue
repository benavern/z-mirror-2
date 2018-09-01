<template>
  <form @submit.prevent="login" class="section">
    <b-field position="is-centered">
      <b-input type="email" v-model="email" placeholder="Mot de pass" autofocus />
      <b-input type="password" v-model="password" placeholder="Mot de pass" autofocus />

      <b-input type="submit" value="Valider" />
    </b-field>
  </form>
</template>

<script>
// import md5 from 'md5'
import { firebaseAuth } from '../../firebase.js'

export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      firebaseAuth
        .signInWithEmailAndPassword(this.email, this.password)
        .catch(this.fail)
    },

    fail (reason) {
      // reset form
      this.email = ''
      this.password = ''

      // notify
      this.$toast.open({
        message: `Mauvais mot de pass !`,
        position: 'is-bottom',
        type: 'is-danger'
      })
    }
  }
}
</script>
