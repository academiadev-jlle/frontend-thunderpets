import { shallowMount } from '@vue/test-utils';
import PetList from '@/components/PetList.vue';
import Vue from 'vue';
import Vuetify from 'vuetify';


describe('PetList.vue', () => {
  beforeEach(() => {
    Vue.use(Vuetify);
  });

  it('is vue instance', () => {
    const wrapper = shallowMount(PetList);

    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it('list has 50 random pets', () => {
    const wrapper = shallowMount(PetList);

    expect(wrapper.vm.pets.length).toEqual(50);
  });
});
