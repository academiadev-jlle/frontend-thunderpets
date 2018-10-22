import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    location: null,
  },
  mutations: {
    updateLocation(state, newLocation) {
      // eslint-disable-next-line
      state.location = newLocation;
      console.log('Mudou');
    },
  },
  actions: {

  },
});
