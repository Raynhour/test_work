import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
    items: [],
    selectedItems: []
  },
  getters: {
    items(state) {
      return state.items;
    },
    selectedItems(state) {
      return state.selectedItems;
    }
  },
  mutations: {
    itemsLoad(state, data) {
      state.items = data;
    },
    selectItem(state, item) {
      state.selectedItems = item;
    },
    mountItems(state) {
      state.selectedItems = state.items;
    }
  },
  actions: {
    itemsLoad(store) {
      axios.get(`http://localhost:8080/test.json`)
      .then(response => {
        store.commit('itemsLoad', response.data);
      })
    },
    mountItems(store) {
      setTimeout(() => {
        store.commit('mountItems');
      },500)
      
    }
  },
	strict: true
});