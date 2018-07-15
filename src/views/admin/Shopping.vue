<template>
<div id="shopping">
  <section class="section">
    <div class="panel">
      <div class="panel-block" v-for="item in list" :key="item.key">
        <div class="item-quantity is-grey">
          <b>{{ item.quantity }}</b>
        </div>

        <div class="item-name expanded">
          {{ item.name }}
        </div>

        <button class="button is-small is-primary is-outlined" @click.prevent="openModal(item)">
          <b-icon icon="pencil" size="is-small"></b-icon>
        </button>

        <button class="button is-small is-danger is-outlined" @click.prevent="deleteItem(item)">
          <b-icon icon="delete" size="is-small"></b-icon>
        </button>
      </div>

      <div class="panel-block" v-if="!list.length">
        <div class="button is-primary expanded" @click.prevent="openModal()">Ajouter un article</div>
      </div>
    </div>
  </section>

  <button class="button is-primary is-outlined add-item-button corner-button" @click.prevent="openModal()">
    <b-icon icon="plus"/>
  </button>

  <b-modal :active.sync="displayModal" has-modal-card>
    <shopping-modal :item="modalItem" :mode="modalMode"
      @submit-add="addItem" @submit-edit="updateItem" />
  </b-modal>
</div>
</template>

<script>
import shoppingModal from '../../components/admin/shopping/ShoppingModal'

export default {
  name: 'Shopping',
  components: { shoppingModal },
  data () {
    return {
      modalItem: null,
      modalMode: 'add',
      displayModal: false
    }
  },

  computed: {
    list () {
      return this.$store.getters['shopping/items']
    }
  },

  methods: {
    addItem (item) {
      if (this.checkItem(item)) {
        this.$store.dispatch('shopping/add', item).then(() => {
          this.displayModal = false
        })
      }
    },

    deleteItem (item) {
      this.$store.dispatch('shopping/remove', item.key)
    },

    updateItem (item) {
      if (this.checkItem(item)) {
        this.$store.dispatch('shopping/change', item).then(() => {
          this.displayModal = false
        })
      }
    },

    checkItem (item) {
      let errors = []
      if (!item.name) errors.push('- Votre produit doit avoir un nom.')
      // if (item.quantity <= 0) errors.push('- Il faut une quantité supérieure à 0')

      if (errors.length) {
        alert(`Action impossible: \n${errors.join('\n')}`)
      }
      return !errors.length
    },

    openModal (item) {
      if (!item) {
        this.modalItem = { quantity: 1, name: '' }
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
#shopping {
  .panel-block {
    .item-quantity {
      margin-right: .5rem;
    }

    .expanded {
      flex: 1;
    }

    .button {
      margin-left: .5rem;
    }
  }
}
</style>
