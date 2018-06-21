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
            <button class="button is-small is-info" @click.prevent="updateItem(props.row.key)">
              <b-icon icon="pencil" size="is-small"></b-icon>
            </button>

            &nbsp;

            <button class="button is-small is-danger" @click.prevent="deleteItem(props.row.key)">
              <b-icon icon="delete" size="is-small"></b-icon>
            </button>
          </b-table-column>
        </template>

        <template slot="detail" slot-scope="props">
          <article class="media">
            <div class="media-content">
              <pre>{{props.row}}</pre>
            </div>
          </article>
        </template>
      </b-table>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <form @submit.prevent="addItem" class="add-item">
        <b-field>
          <b-select placeholder="Nombre" v-model="newItem.quantity">
            <option v-for="val in createArray(10)"
              :key="val"
              :value="val">
              {{ val }}
            </option>
          </b-select>

          <b-input placeholder="Article"
            v-model="newItem.name"
            expanded>
          </b-input>
        </b-field>

        <input class="button is-fullwidth" type="submit" value="Ajouter">
      </form>
    </div>
  </section>
</div>
</template>

<script>
export default {
  name: 'Shopping',
  data () {
    return {
      newItem: {
        quantity: 1,
        name: ''
      }
    }
  },

  computed: {
    list () {
      return this.$store.getters['shopping/items']
    }
  },

  methods: {
    addItem () {
      let errors = []
      if (!this.newItem.name) errors.push('- Votre produit doit avoir un nom')
      if (this.newItem.quantity <= 0) errors.push('- Il faut une quantité supérieure à 0')

      if (!errors.length) {
        this.$store.dispatch('shopping/add', this.newItem).then(() => {
          this.newItem = { quantity: 1, name: '' }
        })
      } else {
        alert(`Action impossible: \n${errors.join('\n')}`)
      }
    },

    deleteItem (key) {
      this.$store.dispatch('shopping/remove', key)
    },

    updateItem (key) {
      const itemToUpdate = this.list.find(item => item.key === key)
      const newItemVal = {
        name: prompt('What is it ?', itemToUpdate.name),
        quantity: prompt('How many ?', itemToUpdate.quantity),
        key
      }
      this.$store.dispatch('shopping/change', newItemVal)
    },
    createArray (nb = 0) {
      return Array.apply(null, {length: nb}).map((val, i) => i + 1)
    }
  }
}
</script>

<style lang="scss" scoped>
#shopping {
  /deep/ .add-item {
    .select{
      width: 70px;
    }
  }
}
</style>
