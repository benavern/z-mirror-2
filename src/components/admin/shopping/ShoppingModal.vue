
<template>
  <form class="add-item-modal" @submit.prevent="submit">
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
            <p class="modal-card-title">
              {{ addOrEditWord }} un article
            </p>
        </header>

        <section class="modal-card-body">
          <b-field>
            <b-select placeholder="Nombre" v-model="editedItem.quantity">
              <option v-for="val in createArray(10)"
                :key="val"
                :value="val">
                {{ val }}
              </option>
            </b-select>

            <b-input placeholder="Article"
              v-model="editedItem.name"
              expanded>
            </b-input>
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
    createArray (nb = 0) {
      return Array.apply(null, { length: nb }).map((val, i) => i + 1)
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

<style lang="scss" scoped>
.add-item-modal /deep/ .select{
  width: 70px;
}
</style>
