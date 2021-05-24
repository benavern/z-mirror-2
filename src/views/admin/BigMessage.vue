<template>
  <div id="big-message">
    <div class="section">
      <div class="panel">

        <div class="panel-block" v-for="item in list" :key="item.key">

          <div class="expanded">
            <div class="time-interval">
              [{{ item.start | time }} - {{ item.end | time }}] &nbsp;
            </div>

            <div v-html="item.text" />

          </div>

          <button class="button is-small is-primary is-outlined" @click.prevent="openModal(item)">
            <b-icon icon="pencil" size="is-small"></b-icon>
          </button>

          <button class="button is-small is-danger is-outlined" @click.prevent="deleteItem(item)">
            <b-icon icon="delete" size="is-small"></b-icon>
          </button>
        </div>

        <div class="panel-block" v-if="!list.length">
          <div class="button is-primary expanded" @click.prevent="openModal()">Ajouter un message</div>
        </div>
      </div>
    </div>

    <button class="button is-primary is-outlined add-item-button corner-button" @click.prevent="openModal()">
      <b-icon icon="plus"/>
    </button>

    <b-modal :active.sync="displayModal" has-modal-card>
      <big-message-modal :item="modalItem" :mode="modalMode"
        @submit-add="addItem" @submit-edit="updateItem" />
    </b-modal>

  </div>
</template>

<script>
import moment from 'moment'
import BigMessageModal from '@/components/admin/bigMessage/bigMessageModal.vue'

export default {
  name: 'big-message',
  components: { BigMessageModal },
  data () {
    return {
      modalItem: null,
      modalMode: 'add',
      displayModal: false
    }
  },
  computed: {
    list () {
      return this.$store.getters['bigMessage/items']
    }
  },
  methods: {
    deleteItem (item) {
      this.$store.dispatch('bigMessage/remove', item.key)
    },

    addItem (item) {
      if (this.checkItem(item)) {
        this.$store.dispatch('bigMessage/add', item).then(() => {
          this.displayModal = false
        })
      }
    },

    updateItem (item) {
      if (this.checkItem(item)) {
        this.$store.dispatch('bigMessage/change', item).then(() => {
          this.displayModal = false
        })
      }
    },

    checkItem (item) {
      let errors = []
      if (!item.text) errors.push('- Vous devez entrer un message à afficher.')
      if (!item.start) errors.push('- Vous devez entrer une heure de début pour l\'affichage de votre message.')
      if (!item.end) errors.push('- Vous devez entrer une heure de fin pour l\'affichage de votre message.')

      if (errors.length) {
        alert(`Action impossible: \n${errors.join('\n')}`)
      }
      return !errors.length
    },

    openModal (item) {
      if (!item) {
        this.modalItem = { text: '', start: new Date(), end: new Date() }
        this.modalMode = 'add'
      } else {
        this.modalItem = item
        this.modalMode = 'edit'
      }
      this.displayModal = true
    }
  },
  filters: {
    time (val) {
      if (!val) return 'ERROR!!!'
      return moment(val).format('HH:mm')
    }
  }
}
</script>

<style lang="scss" scoped>
#big-message {
  .panel-block {
    .time-interval {
      font-weight: bold;
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
