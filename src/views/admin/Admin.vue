<template>
  <div class="container">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'admin'
}
</script>

<style lang="scss">
  .corner-button {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    width: 3rem;
    height: 3rem;
  }
</style>
