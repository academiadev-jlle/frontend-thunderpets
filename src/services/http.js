import axios from 'axios';
import Vue from 'vue';
import VueAuthenticate from 'vue-authenticate';

Vue.use(VueAuthenticate, {
  baseUrl: process.env.BASE_URL,

  providers: {
    facebook: {
      login: process.env.FACEBOOK_LOGIN_URL,
      clientId: process.env.FACEBOOK_CLIENT_ID,
      authorizationEndpoint: process.env.FACEBOOK_AUTH_ENDPOINT,
      optionalUrlParameters: [],
      url: process.env.FACEBOOK_URL,
      redirectUri: process.env.FACEBOOK_REDIRECT_URI,
      scope: ['email', 'public_profile'],
    },
    google: {
      login: process.env.GOOGLE_LOGIN_URL,
      clientId: process.env.GOOGLE_CLIENT_ID,
      url: process.env.GOOGLE_URL,
      redirectUri: process.env.GOOGLE_REDIRECT_URI,
      scopeDelimiter: ' ',
      scope: ['profile', 'email'],
    },
  },
  bindRequestInterceptor() {},
  bindResponseInterceptor() {},
});

const http = axios.create({
  baseURL: process.env.BASE_URL,
});

export default http;
