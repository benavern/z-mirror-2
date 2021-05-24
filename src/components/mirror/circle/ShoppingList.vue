<template>
  <div id="shopping-list" v-if="shoppingList && shoppingList.length">
    <div class="shopping-list-content">
      <div class="shopping-title">
        Les courses
      </div>

      <div class="shopping-list-items">
        <div class="shopping-list-item" v-for="shoppingItem in shoppingList" :key="shoppingItem.key">
          <b-icon icon="menu-right" class="shopping-list-item-icon" size="is-small" />

          <span class="shopping-list-item-col item-name">
            [x{{ shoppingItem.quantity }}] - {{ shoppingItem.name }}
          </span>
        </div>
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
    display: relative;

    .shopping-list-content {
      width: 100%;
    }

    .shopping-title {
      font-weight: bold;
      font-size: 1.5rem;
      margin-top: 2rem;
    }

    .shopping-list-items {
      text-align: left;
      width: 12rem;
      max-height: 12rem;
      margin: 0 auto;
      overflow: hidden;

      .shopping-list-item {
        line-height: 1rem;

        ::v-deep .shopping-list-item-icon {
          color: var(--primary-color);
        }
      }
    }
  }
</style>
