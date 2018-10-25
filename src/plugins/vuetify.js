import Vue from 'vue';
import Vuetify from 'vuetify';
import pt from 'vuetify/src/locale/pt.ts';
import 'vuetify/src/stylus/app.styl';
import '@mdi/font/css/materialdesignicons.css';

Vue.use(Vuetify, {
  iconfont: 'mdi',
  lang: {
    locales: { pt },
    current: 'pt',
  },
  theme: {
    primary: '#ffd044',
    secondary: '#754c24',
    accent: '#8c9eff',
  },
});
