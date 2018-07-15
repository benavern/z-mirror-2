<template>
  <div id="todo-list" v-if="todoList && todoList.length">
    <h1 class="title has-text-white">Liste de tâches</h1>

    <div class="todo-list-item is-size-7" v-for="item in todoList" :key="item.key">
      <b-icon :icon="item.done ? 'checkbox-marked-outline' : 'checkbox-blank-outline'" size="is-small" />

      {{ item.text }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'defaultTodoList',
  props: ['todoList']
}
</script>
