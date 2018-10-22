import '@babel/polyfill';
import * as VueGoogleMaps from 'vue2-google-maps';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/vuetify';
import './registerServiceWorker';

Vue.config.productionTip = false;

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCXQGmnU8M13qkKEpfqgPvcnJEZtq0i5bA',
    language: 'pt-BR',
    region: 'BR',
    libraries: 'places',
  },
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
