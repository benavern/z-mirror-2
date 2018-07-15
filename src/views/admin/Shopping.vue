<template>
<div id="shopping">
  <section class="section">
    <div class="container">

      <b-table :data="list"
        striped
        narrowed
        :mobile-cards="false">

        <template slot-scope="props">
          <b-table-column field="quantity" label="Nb" numeric centered width="40">
            {{ props.row.quantity }}
          </b-table-column>

          <b-table-column field="name" label="Article">
            {{ props.row.name }}
          </b-table-column>

          <b-table-column width="85" label="Actions">
            <button class="button is-small is-primary is-outlined" @click.prevent="openModal(props.row)">
              <b-icon icon="pencil" size="is-small"></b-icon>
            </button>

            &nbsp;

            <button class="button is-small is-danger" @click.prevent="deleteItem(props.row.key)">
              <b-icon icon="delete" size="is-small"></b-icon>
            </button>
          </b-table-column>
        </template>

        <template slot="empty">
          <section class="section">
            <div class="content has-text-grey has-text-centered">
              <p>
                <b-icon
                    icon="food-fork-drink"
                    size="is-large">
                </b-icon>
              </p>

              <p>La liste est vide...</p>
              <p>... Le frigo est-il plein ?!</p>
            </div>
          </section>
        </template>
      </b-table>
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

    deleteItem (key) {
      this.$store.dispatch('shopping/remove', key)
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
