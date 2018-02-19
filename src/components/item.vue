<template lang="pug">
  .table__row
    .table__item.table__item_name {{ thisItem.name }}
    .table__item.table__item_location {{ thisItem.location}}
    .table__item.table__item_id {{ thisItem.id}}
    .table__item.table__item_currency {{ thisItem.currency}}
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  props: [
    'thisItem'
  ],
  computed: {
    ...mapGetters([
      'items'
    ])
  }
}
</script>


