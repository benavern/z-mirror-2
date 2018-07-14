<template>
  <div id="shopping-list" v-if="shoppingList && shoppingList.length">
    <div class="shopping-list-title">
      Liste de courses
    </div>
    <div class="shopping-item" v-for="shoppingItem in shoppingList" :key="shoppingItem.key">
      <div class="shopping-item-col item-name">
        {{ shoppingItem.name }}
      </div>

      <div class="shopping-item-col item-quantity" v-if="shoppingItem.quantity > 1">
        (x{{ shoppingItem.quantity }})
      </div>

      <div class="shopping-item-col">
        &#9667;
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'defaultShoppingList',
  props: ['shopping-list']
}
</script>

<style lang="scss" scoped>
#shopping-list {
  font-size: .75rem;

  .shopping-list-title {
    font-size: 3em;
    margin-bottom: 1rem
  }

  .shopping-item {
    .shopping-item-col {
      display: inline-block;
      margin-left: .5rem;

      &.item-quantity {
        font-size: .75em;
      }
    }
  }
}
</style>
