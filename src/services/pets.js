import Http from './http';

const get = status => Http.get('/pet', {
  params: {
    status,
  },
});

const getById = id => Http.get(`/pet/${id}`);

const save = pet => Http.post('/pet', pet, {
  headers: {
    Authorization: 'Bearer 7418258f-232a-4331-a5d2-1fd64206e6c8',
  },
});


export default {
  get,
  getById,
  save,
};
