<template>
  <div id="admin-index" class="section columns is-multiline">
    <div class="column" v-for="(page, index) in pages" :key="index">
      <div class="card">
        <div @click="$router.go(page.path)" class="card-content">
          <div class="media">
            <div class="media-left" v-if="page.icon">
              <b-icon :icon="page.icon" size="is-large" />
            </div>

            <div class="media-content">
              <p class="title is-4">{{ page.title }}</p>
              <p class="subtitle is-6">{{ page.subtitle }}</p>
            </div>
          </div>

          <div class="content">
            {{ page.content }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'adminIndex',
  data () {
    return {
      pages: [
        {
          path: '/admin/shopping',
          icon: 'basket-fill',
          title: 'Liste de courses',
          subtitle: '',
          content: 'Pour ne jamais se retrouver le frigo vide.'
        }
      ]
    }
  },
  mounted () {
    // dynamic shopping list count
    this.$data.pages[0].subtitle = this.nbShoppingItems
  },
  computed: {
    nbShoppingItems () {
      const nb = this.$store.getters['shopping/items'].length || 0
      return `(${nb} ${nb > 1 ? ' articles' : ' article'})`
    }
  }
}
</script>
