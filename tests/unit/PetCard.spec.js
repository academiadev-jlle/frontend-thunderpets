import { shallowMount, mount } from '@vue/test-utils';
import PetCard from '@/components/PetCard.vue';
import Vue from 'vue';
import Vuetify from 'vuetify';


describe('PetCard.vue', () => {
  beforeEach(() => {
    Vue.use(Vuetify);
  });

  it('is vue instance', () => {
    const wrapper = shallowMount(PetCard);

    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it('displays pet data correctly', () => {
    const pet = {
      nome: 'Pet 0',
      sexo: 'MACHO',
      porte: 'MEDIO',
      foto: 'https://qph.fs.quoracdn.net/main-qimg-8695a74a1cde13ad7f62d05ee246e83b-c',
      descricao: 'description 0',
      distancia: 0,
    };
    const wrapper = mount(PetCard, {
      propsData: {
        pet,
      },
    });

    expect(wrapper.find('#distance-text').text()).toEqual('0 km');
    expect(wrapper.find('#medium').exists()).toBeTruthy();
    expect(wrapper.find('#size-text').text()).toEqual('Porte médio');
    expect(wrapper.find('#male').exists()).toBeTruthy();
    expect(wrapper.find('#sex-text').text()).toEqual('macho');
    expect(wrapper.find('#name').text()).toEqual(pet.nome);
    expect(wrapper.find('#description').text()).toEqual(pet.descricao);
    expect(wrapper.find('#photo').props('src')).toEqual(pet.foto);
  });
});
