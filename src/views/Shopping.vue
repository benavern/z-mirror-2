<template>
<div id="shopping">
  <h1>Liste de courses</h1>

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
      shoppingDb: this.$firebase.ref('shopping'),
      list: [],
      newItem: {
        quantity: 1,
        name: ''
      }
    }
  },
  created () {
    // Add
    this.shoppingDb.on('child_added', addedItem => {
      this.list.push({
        ...addedItem.val(),
        key: addedItem.key
      })
    })

    // Remove
    this.shoppingDb.on('child_removed', removedItem => {
      const removedItemIndex = this.list.findIndex(item => item.key === removedItem.key)
      if (removedItemIndex > -1) {
        this.list.splice(removedItemIndex, 1)
      }
    })

    // Update
    this.shoppingDb.on('child_changed', changedItem => {
      var itemToUpdate = this.list.find(item => item.key === changedItem.key)
      if (itemToUpdate) {
        itemToUpdate.quantity = changedItem.val().quantity
        itemToUpdate.name = changedItem.val().name
      }
    })
  },
  methods: {
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
    },
    deleteItem (key) {
      this.shoppingDb.child(key).remove()
    },
    updateItem (key) {
      const itemToUpdate = this.list.find(item => item.key === key)
      const newItemVal = {
        name: prompt('What is it ?', itemToUpdate.name),
        quantity: prompt('How many ?', itemToUpdate.quantity)
      }
      this.shoppingDb.child(key).update(newItemVal)
    }
  }
}
</script>
