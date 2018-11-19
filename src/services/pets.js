import Http from './http';

const get = status => Http.get('/pet/filtro', {
  params: {
    status,
    tamanho: 1000,
  },
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
