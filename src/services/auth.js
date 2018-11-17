import axios from 'axios';

const getToken = () => axios.request({
  url: '/oauth/token?grant_type=password&username=admin@mail.com&password=admin',
  method: 'GET',
  baseURL: 'https://thunderpets-api.herokuapp.com/',
  auth: {
    username: 'client-id',
    password: 'secret-id',
  },
});

export default {
  getToken,
};
