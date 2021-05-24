<template>
  <div id="features">
    <div class="feature-item" v-if="shoppingList">
      <b-icon icon="cart" size="is-large" />
      <div :class="[
        'badge',
        { 'list-ok': shoppingNbArticles === 0 }
      ]">
        {{ shoppingNbArticles }}
      </div>
    </div>

    <div class="feature-item" v-if="todoList">
      <b-icon icon="format-list-checks" size="is-large" />
      <div :class="[
        'badge',
        { 'list-ok': todoNbItems === 0}
      ]">
        {{ todoNbItems }}
      </div>
    </div>


  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Features',

  props: ['shoppingList'],

  computed: {
    ...mapGetters({
      todoList: 'todo/items'
    }),
    shoppingNbArticles() {
      return this.shoppingList.reduce((acc, curr) => acc + curr.quantity, 0)
    },
    todoNbItems() {
      return this.todoList.length
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'bulma/sass/utilities/initial-variables';
@import 'bulma/sass/utilities/derived-variables';

#features {
  .feature-item {
    position: relative;
    display: inline-block;
    background: rgba($white, .1);
    padding: 1rem;
    border-radius: 1rem;
    border: 2px solid rgba($white, .5);

    & + .feature-item {
      margin-left: 2rem;
    }

    .badge {
      position: absolute;
      top: -1rem;
      right: -1rem;
      height: 2.5rem;
      line-height: 2.5rem;
      padding: 0 .8rem;
      border-radius: 1.25rem;
      background: $danger;
      font-size: 1.5rem;

      &.list-ok {
        background: $success;
      }
    }
  }
}
</style>
