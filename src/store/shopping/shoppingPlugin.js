export default function (firebase) {
  return store => {
    // added
    firebase.ref('shopping').on('child_added', addedItem => {
      store.commit('shopping/added', { ...addedItem.val(), key: addedItem.key })
    })

    // Removed
    firebase.ref('shopping').on('child_removed', removedItem => {
      store.commit('shopping/removed', removedItem)
    })

    // Updated
    firebase.ref('shopping').on('child_changed', changedItem => {
      store.commit('shopping/changed', changedItem)
    })
  }
}
