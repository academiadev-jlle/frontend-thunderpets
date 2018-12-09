import Http from './http';

const get = options => Http.get('/pet', {
  params: options,
});

const getById = id => Http.get(`/pet/${id}`);

const save = pet => Http.post('/pet', pet, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export default {
  get,
  getById,
  save,
};
