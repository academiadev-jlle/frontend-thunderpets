import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';
import '@mdi/font/css/materialdesignicons.css';

Vue.use(Vuetify, {
  iconfont: 'mdi',
  theme: {
    primary: '#ffc107',
    secondary: '#b0bec5',
    accent: '#8c9eff',
  },
});
