import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/src/stylus/app.styl';
import '@mdi/font/css/materialdesignicons.css';

Vue.use(Vuetify, {
  iconfont: 'mdi',
  theme: {
    primary: '#ffc107',
    secondary: '#754c24',
    accent: '#8c9eff',
  },
});
