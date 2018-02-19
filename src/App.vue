<template lang="pug">
  main.main
    .search
      input(
        type='text' 
        placeholder="Срабатывает при 2 или больше символах, так же работает энтер" 
        v-model='value' 
        @click='searchNow = true'
        @keyup.enter="startSearch"
      ).search__area
      .search__box(v-if='searchValue != 0 && value.length > 1 && searchNow')
        p.search__single(
          v-for='single in searchValue'
          @click='select(single)'
          ) {{ single.name}}
    h2.price Total price - {{ price }}
    .table
      each title in ['name', 'location', 'id', 'price']
        div.table__title= title
      app-item(
        v-for='item in selectedItems' 
        :key='item.id' 
        :thisItem='item'
      )
</template>

<script>
import AppItem from './components/item.vue';

import {store, mapGetters} from 'vuex';


export default {
  name: 'app',
  data() {
    return {
      value: '',
      search: [],
      searchNow: false
    }
  },
  components: {
    AppItem
  },
  computed: {
    ...mapGetters([
      'selectedItems'
    ]),
    selectSearch: function () {
      return this.search
    },
    searchValue: function () {
      return  this.$store.getters.items.filter( (el) => {
        return el.name.indexOf(this.value.replace(/\b\w/g, l => l.toUpperCase())) == 0 ? true : false; 
      });
    },
    price: function () {
      if(this.selectedItems.length != 0) {
        return this.selectedItems.map( (cur) => cur.currency).reduce( (prev, cur) => prev + cur);
      }
    }
  },
  methods: {
    select(item) {
      this.searchNow = false;
      this.selectSearch.pop();
      this.selectSearch.push(item);
      this.$store.commit('selectItem', this.selectSearch);
    },
    startSearch() {
      this.$store.commit('selectItem', this.searchValue);
    }
  },
  created() {
    this.$store.dispatch('itemsLoad');
    this.$store.dispatch('mountItems');
  },

}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed');

* {
  font-family: 'Roboto Condensed', sans-serif;
}
body {
  margin: 0;
}

.price {
  text-align: center;
}

.search {
  display: table;
  width: 500px;
  position: relative;
  margin:0 auto;
  margin-top: 10px;
  &__area {
    width: 500px;
  }
  &__box {
    background: #ccc;
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
  }
  &__single {
    cursor: pointer;
    margin: 0;
    padding: 10px;
    &:hover {
      background-color: #81cd50;
    }
  }
}

.table {
  display: table;
  width: 100%;
  &__title {
    display: table-cell;
    text-transform: capitalize;
  }
  &__row {
    display: table-row;
    border-top: 1px solid #ccc;
  }
  &__item {
    display: table-cell;
    border-top: 1px solid #ccc;
  }
}



</style>
