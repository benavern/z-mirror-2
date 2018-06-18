<template>
  <div id="admin">
    <navigation></navigation>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navigation from '../../components/Navigation'

export default {
  name: 'admin',
  components: {
    Navigation
  }
}
</script>
<style lang="scss" scoped>
  #admin {
    padding-top: 3.25rem;
  }
</style>
