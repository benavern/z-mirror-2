<template>
  <form @submit.prevent="login" class="section">
    <b-field label="Email" horizontal>
      <b-input type="email" v-model="email" placeholder="mail@exemple.com" autofocus />
    </b-field>
    <b-field label="Password" horizontal>
      <b-input type="password" v-model="password" placeholder="Mot de pass" password-reveal />
    </b-field>

    <b-field horizontal>
      <button type="submit" class="button">Connection</button>
    </b-field>
  </form>
</template>

<script>
import { firebaseAuth } from '@/firebase.js'

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

    fail () {
      // reset form
      this.email = ''
      this.password = ''

      // notify
      this.$buefy.toast.open({
        message: `Mauvais mot de pass !`,
        position: 'is-bottom',
        type: 'is-danger'
      })
    }
  }
}
</script>
