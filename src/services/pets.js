import Http from './http';

const get = status => Http.get('/pet', {
  params: {
    status,
  },
});

const getById = id => Http.get(`/pet/${id}`);

const save = (pet) => {
  console.log(localStorage.getItem('token'));

  return Http.post('/pet', pet, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export default {
  get,
  getById,
  save,
};
