import Http from './http';

const forgotPassword = email => Http.get('/usuario/esqueci-minha-senha', {
  params: {
    email,
  },
});

const getById = id => Http.get(`/usuario/${id}`);

const getPhotoById = id => Http.get(`/usuario/${id}/foto`);

const getPetsById = id => Http.get(`/usuario/${id}/pets`);

const recoverPassword = (id, password) => Http.get('/usuario/redefinir-senha', {
  params: {
    token: id,
    senha: password,
  },
});

const get = () => Http.get('/usuario', {
  params: {
    tamanho: 20,
  },
});

const save = user => Http.post('/usuario', user);

const edit = user => Http.post('/usuario', user, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export default {
  edit,
  forgotPassword,
  get,
  getById,
  getPetsById,
  getPhotoById,
  recoverPassword,
  save,
};
