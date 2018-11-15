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

  it('new image button respects 10 images limit', () => {
    const wrapper = shallowMount(ImageUpload);

    const newImageButton = wrapper.find('#new-image');

    expect(newImageButton.exists()).toBeTruthy();

    wrapper.vm.images = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    expect(newImageButton.exists()).toBeFalsy();
  });

  it('removing image removes image and emits input', () => {
    const wrapper = shallowMount(ImageUpload);

    wrapper.vm.images = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    wrapper.vm.removePhoto(1);

    expect(wrapper.vm.images).toEqual(expect.not.arrayContaining([1]));
    expect(wrapper.emitted('input')).toBeTruthy();
    expect(wrapper.emitted('input')[0]).toEqual([[0, 2, 3, 4, 5, 6, 7, 8, 9]]);
  });
});
