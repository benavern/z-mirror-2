<template>
<div id="shopping">
  <h1 class="is-size-3">Liste de courses</h1>

  <ul>
    <li v-for="item in list" :key="item.key">
      {{ item.name }} (x{{ item.quantity }})
      <button @click.prevent="updateItem(item.key)">edit</button>
      <button @click.prevent="deleteItem(item.key)">x</button>
    </li>
  </ul>

  <form @submit.prevent="addItem">
    <input type="text" v-model="newItem.name">
    <input type="number" v-model="newItem.quantity">
    <input type="submit" value="Ajouter">
  </form>
</div>
</template>

<script>
export default {
  name: 'Shopping',
  data () {
    return {
      newItem: {
        quantity: 1,
        name: ''
      }
    }
  },

  computed: {
    list () {
      return this.$store.getters['shopping/items']
    }
  },

  methods: {
    addItem () {
      let errors = []
      if (!this.newItem.name) errors.push('- Votre produit doit avoir un nom')
      if (this.newItem.quantity <= 0) errors.push('- Il faut une quantité supérieure à 0')

      if (!errors.length) {
        this.$store.dispatch('shopping/add', this.newItem).then(() => {
          this.newItem = { quantity: 1, name: '' }
        })
      } else {
        alert(`Action impossible: \n${errors.join('\n')}`)
      }
    },

    deleteItem (key) {
      this.$store.dispatch('shopping/remove', key)
    },

    updateItem (key) {
      const itemToUpdate = this.list.find(item => item.key === key)
      const newItemVal = {
        name: prompt('What is it ?', itemToUpdate.name),
        quantity: prompt('How many ?', itemToUpdate.quantity),
        key
      }
      this.$store.dispatch('shopping/change', newItemVal)
    }
  }
}
</script>
