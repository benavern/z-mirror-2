export default function (firebase) {
  return store => {
    // added
    firebase.ref('big-message').on('child_added', addedItem => {
      store.commit('bigMessage/added', addedItem)
    })

    // Removed
    firebase.ref('big-message').on('child_removed', removedItem => {
      store.commit('bigMessage/removed', removedItem)
    })

    // Updated
    firebase.ref('big-message').on('child_changed', changedItem => {
      store.commit('bigMessage/changed', changedItem)
    })
  }
}
