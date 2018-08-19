
<template>
  <form class="add-item-modal" @submit.prevent="submit">
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
            <p class="modal-card-title">
              {{ addOrEditWord }} un message
            </p>
        </header>

        <section class="modal-card-body">
          <b-field label="Message">
            <b-input v-model="editedItem.text" type="textarea"></b-input>
          </b-field>

          <b-field label="Début">
            <b-timepicker v-model="editedItem.start" mobile-native @input="refreshInputs" inline></b-timepicker>
          </b-field>

          <b-field label="Fin">
            <b-timepicker v-model="editedItem.end" mobile-native :min-time="editedItem.start" inline></b-timepicker>
          </b-field>
        </section>

        <footer class="modal-card-foot">
            <button class="button" type="button" @click.prevent="$parent.close()">Annuler</button>
            <input class="button is-primary" type="submit" :value="addOrEditWord">
        </footer>
      </div>
  </form>
</template>

<script>
export default {
  name: 'shoppingModal',
  props: {
    item: Object,
    mode: {
      type: String,
      validator (mode) {
        return ['edit', 'add'].includes(mode)
      }
    }
  },
  data () {
    return {
      editedItem: null
    }
  },
  created () {
    this.editedItem = Object.assign({}, this.item)
  },
  methods: {
    refreshInputs () {
      if (this.editedItem.end && this.editedItem.end < this.editedItem.start) {
        this.editedItem.end = this.editedItem.start
      }
    },
    submit () {
      this.$emit(`submit-${this.mode}`, this.editedItem)
    }
  },
  computed: {
    addOrEditWord () {
      return this.mode === 'add' ? 'Ajouter' : 'Modifier'
    }
  }
}
</script>
