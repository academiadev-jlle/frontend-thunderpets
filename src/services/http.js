import axios from 'axios';
import Vue from 'vue';
import VueAuthenticate from 'vue-authenticate';

Vue.use(VueAuthenticate, {
  baseUrl: 'https://thunderpets-api.herokuapp.com',

  providers: {
    facebook: {
      login: '/oauth/facebook/login',
      clientId: process.env.VUE_APP_FACEBOOK_CLIENT,
      authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
      optionalUrlParameters: [],
      url: 'https://thunderpets-api.herokuapp.com/oauth/facebook/login',
      redirectUri: 'https://thunderpets-test.netlify.com/',
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
