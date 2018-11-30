/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedIn: false,
    loggedUser: null,
  },
  mutations: {
    login(state, user) {
      state.loggedIn = true;
      state.loggedUser = user;
    },
    logout(state) {
      state.loggedIn = false;
      state.loggedUser = null;
    },
  },
  actions: {

  },
});
