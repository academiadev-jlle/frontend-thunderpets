import { shallowMount, mount } from '@vue/test-utils';
import GenderSelection from '@/components/GenderSelection.vue';
import Vue from 'vue';
import Vuetify from 'vuetify';


describe('GenderSelection.vue', () => {
  beforeEach(() => {
    Vue.use(Vuetify);
  });

  it('is vue instance', () => {
    const wrapper = shallowMount(GenderSelection);

    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it('default value to be MACHO', () => {
    const wrapper = shallowMount(GenderSelection);

    expect(wrapper.props().value).toBe('MACHO');
  });

  it('male button selected with MACHO value', () => {
    const wrapper = shallowMount(GenderSelection, {
      propsData: {
        value: 'MACHO',
      },
    });

    const maleButton = wrapper.find('#male');
    const femaleButton = wrapper.find('#female');
    const undeterminedButton = wrapper.find('#undetermined');

    expect(maleButton.attributes().flat).toBeUndefined();
    expect(femaleButton.attributes().flat).toBeTruthy();
    expect(undeterminedButton.attributes().flat).toBeTruthy();
  });

  it('female button selected with FEMEA value', () => {
    const wrapper = shallowMount(GenderSelection, {
      propsData: {
        value: 'FEMEA',
      },
    });

    const maleButton = wrapper.find('#male');
    const femaleButton = wrapper.find('#female');
    const undeterminedButton = wrapper.find('#undetermined');

    expect(maleButton.attributes().flat).toBeTruthy();
    expect(femaleButton.attributes().flat).toBeUndefined();
    expect(undeterminedButton.attributes().flat).toBeTruthy();
  });

  it('undetermined button selected with INDETERMINADO value', () => {
    const wrapper = shallowMount(GenderSelection, {
      propsData: {
        value: 'INDETERMINADO',
      },
    });

    const maleButton = wrapper.find('#male');
    const femaleButton = wrapper.find('#female');
    const undeterminedButton = wrapper.find('#undetermined');

    expect(maleButton.attributes().flat).toBeTruthy();
    expect(femaleButton.attributes().flat).toBeTruthy();
    expect(undeterminedButton.attributes().flat).toBeUndefined();
  });

  it('buttons call method that emits value properly', () => {
    const wrapper = mount(GenderSelection);
    const spy = jest.spyOn(wrapper.vm, 'changeGender');

    wrapper.find('#female').trigger('click');
    expect(spy).toBeCalledWith('FEMEA');
    expect(wrapper.emitted('input')).toBeTruthy();
    expect(wrapper.emitted('input')[0]).toEqual(['FEMEA']);

    wrapper.find('#male').trigger('click');
    expect(spy).toBeCalledWith('MACHO');
    expect(wrapper.emitted('input')).toBeTruthy();
    expect(wrapper.emitted('input')[1]).toEqual(['MACHO']);

    wrapper.find('#undetermined').trigger('click');
    expect(spy).toBeCalledWith('INDETERMINADO');
    expect(wrapper.emitted('input')).toBeTruthy();
    expect(wrapper.emitted('input')[2]).toEqual(['INDETERMINADO']);

    spy.mockRestore();
  });
});
