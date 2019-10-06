import { firebaseDb } from '../../firebase'
const db = firebaseDb.ref('big-message')

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
      return state.db.list.map(item => {
        item.start = new Date(item.start)
        item.end = new Date(item.end)
        return item
      })
    }
  },
  mutations: {
    added (state, newItem) {
      state.db.list.push({ ...newItem.val(), key: newItem.key })
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
        itemToUpdate.text = changedItem.val().text
        itemToUpdate.start = changedItem.val().start
        itemToUpdate.end = changedItem.val().end
      }
    }
  },
  actions: {
    add (context, newItem) {
      newItem.start = newItem.start.getTime()
      newItem.end = newItem.end.getTime()
      return db.push(newItem)
    },
    remove (context, key) {
      return db.child(key).remove()
    },
    change (context, { key, ...newItemVal }) {
      newItemVal.start = newItemVal.start.getTime()
      newItemVal.end = newItemVal.end.getTime()
      return db.child(key).update(newItemVal)
    }
  }
}
