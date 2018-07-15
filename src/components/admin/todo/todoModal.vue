
<template>
  <form class="add-item-modal" @submit.prevent="submit">
      <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">
              {{ addOrEditWord }} un article
            </p>
        </header>

        <section class="modal-card-body">
          <b-field>
            <b-input v-model="editedItem.text" type="textarea"></b-input>
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
  name: 'todoModal',
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
