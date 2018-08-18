<template>
  <div id="admin">
    <navigation></navigation>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navigation from '../../components/admin/Navigation'

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

<style lang="scss">
.corner-button {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  width: 3rem;
  height: 3rem;
}
</style>
