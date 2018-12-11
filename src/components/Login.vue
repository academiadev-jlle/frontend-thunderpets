<template>
  <div>
    <v-btn
      @click="dialog = true"
      exact
      flat
    >
      Entrar
    </v-btn>
    <v-dialog
      max-width="500"
      transition="scale-transition"
      v-model="dialog"
    >
      <v-card>
        <v-toolbar color="primary">
          <v-toolbar-title>
            Entrar
          </v-toolbar-title>
          <v-spacer />
          <v-icon @click="closeDialog">
            mdi-close
          </v-icon>
        </v-toolbar>
        <v-alert v-model="error" type="error" class="my-0">
          Email e/ou senha inválido(s), por favor revise suas informações.
        </v-alert>
        <div class="pa-1">
          <form data-vv-scope="login">
            <v-card-text>
              <v-text-field
                :error-messages="errors.collect('login.email')"
                @keyup.enter="submit"
                class="required"
                data-vv-as="email"
                data-vv-name="email"
                label="Email"
                v-model="login.email"
                v-validate="'required|email'"
              >
              </v-text-field>
              <v-text-field
                :error-messages="errors.collect('login.password')"
                @keyup.enter="submit"
                data-vv-as="senha"
                data-vv-name="password"
                label="Senha"
                type="password"
                v-model="login.password"
                v-validate="'required'"
              >
              </v-text-field>
              <v-layout row wrap justify-end>

              </v-layout>
            </v-card-text>
            <v-card-actions>
              <v-layout column>
                <v-layout row class="mb-2">
                  <v-flex xs6>
                    <span >
                      Não possui conta?
                      <a class="blue--text" @click="toRegister">Cadastre-se</a>
                    </span>
                  </v-flex>
                  <v-flex xs6>
                    <div class="text-xs-right">
                      <a @click="forgotPassword" class="blue--text">Esqueci minha senha</a>
                    </div>
                  </v-flex>
                </v-layout>
                <v-btn
                  @click="submit"
                  block
                  color="primary"
                  :loading="loading"
                >
                  Entrar
                </v-btn>
                <v-divider class="my-3" />
                <v-container class="pa-0" fluid grid-list-md>
                  <v-layout row>
                    <v-flex xs6>
                      <google-button
                        @error="error = true"
                        @login="dialog = false"
                      ></google-button>
                    </v-flex>
                    <v-flex xs6>
                      <facebook-button
                        @error="error = true"
                        @login="dialog = false"
                      ></facebook-button>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-layout>
            </v-card-actions>
          </form>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Users from '@/services/users';
import Auth from '@/services/auth';
import FacebookButton from './FacebookButton.vue';
import GoogleButton from './GoogleButton.vue';

export default {
  name: 'Login',
  props: {
    openRegister: {
      type: Function,
      required: true,
    },
    drawerStyled: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    FacebookButton,
    GoogleButton,
  },
  data() {
    return {
      dialog: false,
      error: false,
      loading: false,
      login: {
        email: null,
        password: null,
        rememberMe: false,
      },
    };
  },
  computed: {
    isXS() {
      return this.$vuetify.breakpoint.xsOnly;
    },
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
      this.error = false;
      this.$validator.reset('login');
    },
    forgotPassword() {
      this.$validator.validate('login.email').then((valid) => {
        if (valid) {
          Users.forgotPassword(this.login.email)
            .then(() => this.$toast.success('Enviado e-mail com instruções para recuperação de senha'))
            .catch(() => this.$toast.error('Erro ao enviar e-mail de recuperação'))
            .finally(() => {
              this.loading = false;
            });
        } else {
          this.$toast.error('Por favor, insira o e-mail para recuperação');
        }
      });
    },
    toRegister() {
      this.closeDialog();
      this.openRegister();
    },
    submit() {
      let token = null;

      this.$validator.validateAll('login').then((result) => {
        if (result) {
          this.loading = true;
          this.error = false;
          Auth.getToken(this.login)
            .then((tokenResponse) => {
              token = tokenResponse.data.access_token;

              return Auth.whoAmI(token);
            })
            .then(whoAmIResponse => Users.getById(whoAmIResponse.data.id))
            .then((getUserResponse) => {
              localStorage.setItem('token', token);
              this.$store.commit('login', getUserResponse.data);
              this.dialog = false;
            })
            .catch(() => {
              this.error = true;
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
    },
  },
  watch: {
    dialog(value) {
      if (!value) {
        this.closeDialog();
      }
    },
  },
};
</script>
