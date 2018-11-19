import axios from 'axios';

const http = axios.create({
  baseURL: 'https://thunderpets-api.herokuapp.com',
});

export default http;
