<template>
  <form @submit.prevent="login" class="section">
    <b-field position="is-centered">
      <b-input value="123" type="password" v-model="pwd" placeholder="Mot de pass" autofocus />

      <b-input type="submit" value="Valider" />
    </b-field>
  </form>
</template>

<script>
import md5 from 'md5'

export default {
  name: 'login',
  data () {
    return {
      pwd: '',
      pwdModel: process.env.VUE_APP_ADMIN_AUTH_SECRET
    }
  },
  methods: {
    login () {
      if (md5(this.pwd) === this.pwdModel) {
        this.success()
      } else {
        this.fail()
      }
    },

    success () {
      sessionStorage.setItem('authenticated', true)
      this.$router.replace(this.$route.query.to || '/admin')
    },

    fail () {
      this.pwd = ''
      this.$toast.open({
        message: `Mauvais mot de pass !`,
        position: 'is-bottom',
        type: 'is-danger'
      })
    }
  }
}
</script>
