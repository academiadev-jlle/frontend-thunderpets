import axios from 'axios';

const getToken = () => axios.request({
  url: '/oauth/token?grant_type=password&username=admin@mail.com&password=admin',
  method: 'GET',
  baseURL: 'https://thunderpets-api.herokuapp.com/',
  auth: {
    username: process.env.VUE_APP_CLIENT_ID,
    password: process.env.VUE_APP_SECRET_ID,
  },
});

export default {
  getToken,
};
