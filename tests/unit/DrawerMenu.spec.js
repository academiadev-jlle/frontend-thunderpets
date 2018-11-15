import { shallowMount } from '@vue/test-utils';
import DrawerMenu from '@/components/DrawerMenu.vue';
import Vue from 'vue';
import Vuetify from 'vuetify';


describe('DrawerMenu.vue', () => {
  beforeEach(() => {
    Vue.use(Vuetify);
  });

  it('is vue instance', () => {
    const wrapper = shallowMount(DrawerMenu);

    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
