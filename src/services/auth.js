import Http from './http';

const getToken = () => Http.get('/oauth/token?grant_type=password&username=admin@mail.com&password=admin', {
  auth: {
    username: process.env.VUE_APP_CLIENT_ID,
    password: process.env.VUE_APP_SECRET_ID,
  },
});

export default {
  getToken,
};
