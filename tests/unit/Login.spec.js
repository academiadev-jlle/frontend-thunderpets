import { shallowMount } from '@vue/test-utils';
import Login from '@/components/Login.vue';
import Vue from 'vue';
import Vuetify from 'vuetify';
import VeeValidate, { Validator } from 'vee-validate';
import pt from 'vee-validate/dist/locale/pt_BR';

describe('Login.vue', () => {
  beforeEach(() => {
    Vue.use(Vuetify);
    Validator.localize('pt_BR', pt);
    Vue.use(VeeValidate, { locale: pt });
  });

  it('is vue instance', () => {
    const wrapper = shallowMount(Login);

    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it('login works', () => {
    const wrapper = shallowMount(Login);
    const loginButton = wrapper.find('#login-button');

    wrapper.vm.loggedIn = false;
    expect(loginButton.exists()).toBeTruthy();

    wrapper.vm.loggedIn = true;
    expect(loginButton.exists()).toBeFalsy();
  });
});
