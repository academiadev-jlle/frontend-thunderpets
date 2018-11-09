import { shallowMount } from '@vue/test-utils';
import ImageUpload from '@/components/ImageUpload.vue';
import Vue from 'vue';
import Vuetify from 'vuetify';


describe('ImageUpload.vue', () => {
  beforeEach(() => {
    Vue.use(Vuetify);
  });

  it('is vue instance', () => {
    const wrapper = shallowMount(ImageUpload);

    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
