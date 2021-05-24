<template>
  <div class="container">
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
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      pages: [
        {
          path: '/admin',
          icon: 'cog-outline',
          iconType: 'is-primary',
          title: 'Administration',
          subtitle: 'Réglages de l\'application et du miroir',
          content: 'Attention, il faut se connecter pour y accéder!'
        },
        {
          path: "/mirror",
          icon: 'window-open',
          iconType: 'is-info',
          title: 'Miroir',
          subtitle: 'L\'affichage du miroir',
          content: 'Et c\'est là que la magie opère...'
        }
      ]
    }
  }
}
</script>
