<template>
  <div id="todo">
    <div class="section">
      <div class="panel">
        <!-- <p class="panel-heading">
          Liste des Tâches
        </p> -->

        <p class="panel-tabs">
          <a :class="{'is-active': filter === 'all'}" @click.prevent="filterTab('all')">Tout</a>
          <a :class="{'is-active': filter === 'todo'}" @click.prevent="filterTab('todo')">A faire</a>
          <a :class="{'is-active': filter === 'done'}" @click.prevent="filterTab('done')">Terminé</a>
        </p>

        <div class="panel-block" v-for="item in list" :key="item.key">
          <b-checkbox v-model="item.done"></b-checkbox>

          <div class="expanded" v-html="item.text" />

          <button class="button is-small is-primary is-outlined" @click.prevent="openModal(item)">
            <b-icon icon="pencil" size="is-small"></b-icon>
          </button>

          <button class="button is-small is-danger is-outlined" @click.prevent="deleteItem(item)">
            <b-icon icon="delete" size="is-small"></b-icon>
          </button>
        </div>

        <div class="panel-block" v-if="!list.length">
          <div class="button is-primary expanded" @click.prevent="openModal()">Ajouter une tâche</div>
        </div>
      </div>
    </div>

    <button class="button is-primary is-outlined add-item-button corner-button" @click.prevent="openModal()">
      <b-icon icon="plus"/>
    </button>

    <b-modal :active.sync="displayModal" has-modal-card>
      <todo-modal :item="modalItem" :mode="modalMode"
        @submit-add="addItem" @submit-edit="updateItem" />
    </b-modal>

  </div>
</template>

<script>
import TodoModal from '../../components/admin/todo/todoModal'

export default {
  name: 'todo',
  components: { TodoModal },
  data () {
    return {
      modalItem: null,
      modalMode: 'add',
      displayModal: false
    }
  },
  computed: {
    list () {
      return this.$store.getters['todo/items']
    },

    filter () {
      return this.$store.getters['todo/filter']
    }
  },
  methods: {
    filterTab (val) {
      this.$store.dispatch('todo/filterTab', val)
    },

    deleteItem (item) {
      this.$store.dispatch('todo/remove', item.key)
    },

    addItem (item) {
      if (this.checkItem(item)) {
        this.$store.dispatch('todo/add', item).then(() => {
          this.displayModal = false
        })
      }
    },

    updateItem (item) {
      if (this.checkItem(item)) {
        this.$store.dispatch('todo/change', item).then(() => {
          this.displayModal = false
        })
      }
    },

    checkItem (item) {
      let errors = []
      if (!item.text) errors.push('- Vous devez entrer une description pour la tâche.')

      if (errors.length) {
        alert(`Action impossible: \n${errors.join('\n')}`)
      }
      return !errors.length
    },

    openModal (item) {
      if (!item) {
        this.modalItem = { text: '', done: false }
        this.modalMode = 'add'
      } else {
        this.modalItem = item
        this.modalMode = 'edit'
      }
      this.displayModal = true
    }
  }
}
</script>

<style lang="scss" scoped>
#todo {
  .panel-block {
    .expanded {
      flex: 1;
    }

    .button {
      margin-left: .5rem;
    }
  }
}
</style>
