import firebaseDb from '../../firebase'
const db = firebaseDb.ref('todo')

export default {
  namespaced: true,
  state: {
    db: {
      list: []
    },
    local: {
      filter: 'all'
    }
  },
  getters: {
    items (state) {
      return state.db.list
    },
    filteredItems (state) {
      return state.db.list.filter(item => {
        switch (state.local.filter) {
          case 'todo':
            return !item.done
          case 'done':
            return item.done
          default:
            return true
        }
      })
    },
    filter (state) {
      return state.local.filter
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
        itemToUpdate.done = changedItem.val().done
      }
    },
    filterTab (state, val) {
      state.local.filter = val
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
    },
    filterTab ({ commit }, val) {
      commit('filterTab', val)
    }
  }
}
