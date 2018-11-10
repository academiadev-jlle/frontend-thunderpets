import { shallowMount } from '@vue/test-utils';
import Home from '@/views/Home.vue';
import Vue from 'vue';
import Vuetify from 'vuetify';


describe('Home.vue', () => {
  beforeEach(() => {
    Vue.use(Vuetify);
  });

  it('is vue instance', () => {
    const wrapper = shallowMount(Home);

    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it('tabs load properly', () => {
    const wrapper = shallowMount(Home);

    expect(wrapper.find('#tab-1').exists()).toBeTruthy();
    expect(wrapper.find('#tab-2').exists()).toBeTruthy();
    expect(wrapper.find('#tab-3').exists()).toBeTruthy();
  });
});
