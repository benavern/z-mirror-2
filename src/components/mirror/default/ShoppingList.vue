<template>
  <div id="shopping-list" v-if="shoppingList && shoppingList.length">
    <div class="title has-text-white">
      Liste de courses
    </div>

    <div class="shopping-item is-size-7" v-for="shoppingItem in shoppingList" :key="shoppingItem.key">
      <span class="shopping-item-col item-name">
        {{ shoppingItem.name }}
      </span>

      <small class="shopping-item-col item-quantity" v-if="shoppingItem.quantity > 1">
        (x{{ shoppingItem.quantity }})
      </small>

      <b-icon icon="menu-left" size="is-small" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'defaultShoppingList',
  props: ['shopping-list']
}
</script>
