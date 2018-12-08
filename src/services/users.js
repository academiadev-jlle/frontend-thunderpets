import Http from './http';

const getById = id => Http.get(`/usuario/${id}`);

const getPhotoById = id => Http.get(`/usuario/${id}/foto`);

const getPetsById = id => Http.get(`/usuario/${id}/pets`);


const get = () => Http.get('/usuario', {
  params: {
    tamanho: 20,
  },
});

const save = user => Http.post('/usuario', user);

export default {
  getPhotoById,
  getPetsById,
  getById,
  save,
  get,
};
