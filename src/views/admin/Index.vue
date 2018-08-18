<template>
  <div id="admin-index" class="section">
    <div class="columns is-multiline">
      <div class="column" v-for="(page, index) in pages" :key="index">
        <div class="card">
          <div @click="$router.push(page.path)" class="card-content">
            <div class="media">
              <div class="media-left" v-if="page.icon">
                <b-icon :icon="page.icon" size="is-large" :type="page.iconType"/>
              </div>

              <div class="media-content">
                <p class="title is-4">{{ page.title }}</p>
                <p class="subtitle is-7">{{ page.subtitle }}</p>
              </div>
            </div>

            <div class="content">
              {{ page.content }}
            </div>
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
    const excludedRoutes = ['', 'login']
    return {
      adminRoutes: this.$router.options.routes
        .find(route => route.path === '/admin').children
        .filter(route => route.meta && !excludedRoutes.includes(route.path))
        .map(route => {
          // get data from router meta object
          const { icon, iconType, displayName: title, subtitle, description: content } = route.meta
          // format it for the page
          return {
            path: `/admin/${route.path}`,
            icon,
            iconType,
            title,
            subtitle,
            content
          }
        })
    }
  },
  computed: {
    pages () {
      return this.adminRoutes.map(route => {
        if (route.path === '/admin/shopping') {
          route.subtitle = this.nbShoppingItems
        }
        return route
      })
    },
    nbShoppingItems () {
      const nb = this.$store.getters['shopping/items'].length || 0
      return `${nb} ${nb !== 1 ? ' articles' : ' article'} dans la liste`
    }
  }
}
</script>
