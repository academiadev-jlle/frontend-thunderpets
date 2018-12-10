import axios from 'axios';
import Vue from 'vue';
import VueAuthenticate from 'vue-authenticate';

Vue.use(VueAuthenticate, {
  baseUrl: process.env.VUE_APP_API_URL,

  providers: {
    facebook: {
      login: process.env.VUE_APP_FACEBOOK_LOGIN_URL,
      clientId: process.env.VUE_APP_FACEBOOK_CLIENT_ID,
      authorizationEndpoint: process.env.VUE_APP_FACEBOOK_AUTH_ENDPOINT,
      optionalUrlParameters: [],
      url: process.env.VUE_APP_FACEBOOK_URL,
      redirectUri: process.env.VUE_APP_FACEBOOK_REDIRECT_URI,
      scope: ['email', 'public_profile'],
    },
    google: {
      login: process.env.VUE_APP_GOOGLE_LOGIN_URL,
      clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID,
      url: process.env.VUE_APP_GOOGLE_URL,
      redirectUri: process.env.VUE_APP_GOOGLE_REDIRECT_URI,
      scopeDelimiter: ' ',
      scope: ['profile', 'email'],
    },
  },
  bindRequestInterceptor() {},
  bindResponseInterceptor() {},
});

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

export default http;
