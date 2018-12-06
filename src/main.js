import 'izitoast/dist/css/iziToast.min.css';
import '@babel/polyfill';
import * as VueGoogleMaps from 'vue2-google-maps';
import VueDisqus from 'vue-disqus';
import InfiniteScroll from 'vue-infinite-scroll';
import VeeValidate, { Validator } from 'vee-validate';
import VueResource from 'vue-resource';
import pt from 'vee-validate/dist/locale/pt_BR';
import VueIziToast from 'vue-izitoast';
import VueDebounce from 'vue-debounce'
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/vuetify';
import './registerServiceWorker';
import './filters';

Vue.prototype.$smAndDown = Vue.prototype.$vuetify.breakpoint.smAndDown;

Vue.config.productionTip = false;

Vue.use(VueDebounce)
Vue.use(InfiniteScroll);
Vue.use(VueIziToast); 

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_API_KEY,
    language: 'pt-BR',
    region: 'BR',
    libraries: 'places',
  },
});

Vue.use(VueDisqus);

Validator.localize('pt_BR', pt);
Vue.use(VeeValidate, { locale: pt });

Vue.use(VueResource);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
