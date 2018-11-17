import Http from './http';

const getById = id => Http.get(`/usuario/${id}`);

const save = user => Http.post('/usuario', user);

export default {
  getById,
  save,
};
