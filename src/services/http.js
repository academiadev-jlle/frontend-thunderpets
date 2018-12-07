import axios from 'axios';
import Vue from 'vue';
import VueAuthenticate from 'vue-authenticate';

Vue.use(VueAuthenticate, {
  baseUrl: 'https://thunderpets-api.herokuapp.com',

  providers: {
    facebook: {
      clientId: '1136188899888117',
      redirectUri: 'https://thunderpets-api.herokuapp.com/oauth/facebook/login',
      scope: ['email', 'public_profile'],
    },
  },
  bindRequestInterceptor() {},
  bindResponseInterceptor() {},
});

const http = axios.create({
  baseURL: 'https://thunderpets-api.herokuapp.com',
});

export default http;
