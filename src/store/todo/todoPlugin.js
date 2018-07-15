export default function (firebase) {
  return store => {
    // added
    firebase.ref('todo').on('child_added', addedItem => {
      store.commit('todo/added', addedItem)
    })

    // Removed
    firebase.ref('todo').on('child_removed', removedItem => {
      store.commit('todo/removed', removedItem)
    })

    // Updated
    firebase.ref('todo').on('child_changed', changedItem => {
      store.commit('todo/changed', changedItem)
    })
  }
}
