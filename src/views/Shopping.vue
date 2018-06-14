<template>
<div id="shopping">
  <h1>Liste de courses</h1>

  <ul>
    <li v-for="(item, index) in list" :key="item.key">
      {{ item.name }} (x{{ item.quantity }})
      <button @click.prevent="deleteItem(index)">x</button>
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
      shoppingDb: this.$firebase.ref('shopping'),
      list: [],
      newItem: {
        quantity: 1,
        name: ''
      }
    }
  },
  created () {
    this.shoppingDb.on('child_added', itemToAdd => {
      this.list.push({
        ...itemToAdd.val(),
        key: itemToAdd.key
      })
    })

    this.shoppingDb.on('child_removed', itemToRemove => {
      const removedItemIndex = this.list.findIndex(item => item.key === itemToRemove.key)
      if (removedItemIndex > -1) {
        this.list.splice(removedItemIndex, 1)
      }
    })
  },
  methods: {
    deleteItem (index) {
      if (this.list[index]) {
        this.shoppingDb.child(this.list[index].key).remove()
      }
    },
    addItem () {
      let errors = []
      if (!this.newItem.name) errors.push('- Votre produit doit avoir un nom')
      if (this.newItem.quantity <= 0) errors.push('- Il faut une quantité supérieure à 0')

      if (!errors.length) {
        this.shoppingDb.push(this.newItem).then(() => {
          this.newItem = {
            quantity: 1,
            name: ''
          }
        })
      } else {
        alert(`Action impossible: \n${errors.join('\n')}`)
      }
    }
  }
}
</script>
