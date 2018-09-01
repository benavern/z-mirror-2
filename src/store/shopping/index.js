import { firebaseDb } from '../../firebase'
const db = firebaseDb.ref('shopping')

export default {
  namespaced: true,
  state: {
    db: {
      list: []
    },
    local: {}
  },
  getters: {
    items (state) {
      return state.db.list
    },
    nbItems (state) {
      return state.db.list.reduce((acc, val) => acc + Number(val.quantity), 0)
    }
  },
  mutations: {
    added (state, newItem) {
      state.db.list.push(newItem)
    },
    removed (state, removedItem) {
      const removedItemIndex = state.db.list.findIndex(item => item.key === removedItem.key)
      if (removedItemIndex > -1) {
        state.db.list.splice(removedItemIndex, 1)
      }
    },
    changed (state, changedItem) {
      let itemToUpdate = state.db.list.find(item => item.key === changedItem.key)
      if (itemToUpdate) {
        itemToUpdate.quantity = changedItem.val().quantity
        itemToUpdate.name = changedItem.val().name
      }
    }
  },
  actions: {
    add (context, newItem) {
      return db.push(newItem)
    },
    remove (context, key) {
      return db.child(key).remove()
    },
    change (context, {key, ...newItemVal}) {
      return db.child(key).update(newItemVal)
    }
  }
}
