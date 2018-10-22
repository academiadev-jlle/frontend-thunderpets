import '@babel/polyfill';
import '@mdi/font/css/materialdesignicons.css';
import * as VueGoogleMaps from 'vue2-google-maps';
import Vuetify from 'vuetify';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/vuetify';
import './registerServiceWorker';

Vue.use(Vuetify, {
  iconfont: 'mdi',
});

Vue.config.productionTip = false;

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_API_KEY,
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
