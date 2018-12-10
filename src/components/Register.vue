<template>
  <div>
    <v-btn
      @click="dialog = true"
      exact
      flat
    >
      Cadastrar-se
    </v-btn>
    <v-dialog
      max-width="500"
      transition="scale-transition"
      v-model="dialog"
    >
      <v-card>
        <v-toolbar color="primary">
          <v-toolbar-title>
            Cadastrar-se
          </v-toolbar-title>
          <v-spacer />
          <v-icon @click="closeDialog">
            mdi-close
          </v-icon>
        </v-toolbar>
        <v-alert v-model="error" type="error" class="my-0">
          Outro usuário já existe com esse email.
        </v-alert>
        <div class="pa-1">
          <form data-vv-scope="register">
            <v-card-text>
              <v-text-field
                :error-messages="errors.collect('register.name')"
                @keyup.enter="submit"
                data-vv-as="nome"
                data-vv-name="name"
                label="Nome completo"
                v-model="register.nome"
                v-validate="'required|min:3'"
              ></v-text-field>
              <v-text-field
                :error-messages="errors.collect('register.email')"
                @keyup.enter="submit"
                data-vv-as="email"
                data-vv-name="email"
                label="E-mail"
                v-model="register.email"
                v-validate="'required|email'"
              ></v-text-field>
              <v-text-field
                :error-messages="errors.collect('register.password')"
                @keyup.enter="submit"
                data-vv-as="senha"
                data-vv-name="password"
                label="Senha"
                type="password"
                v-model="register.senha"
                v-validate="'required|min:8'"
              ></v-text-field>
              <v-text-field
                :error-messages="errors.collect('register.confirmPassword')"
                @keyup.enter="submit"
                data-vv-as="confirmação de senha"
                data-vv-name="confirmPassword"
                label="Confirmação de senha"
                type="password"
                v-model="register.confirmaSenha"
                v-validate="{ is: register.senha, required: true }"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-layout column>
                <span class="mb-2">
                  Já possui conta?
                  <a class="blue--text" @click="toLogin">Entrar</a>
                </span>
                <v-btn
                  @click="submit"
                  block
                  color="primary"
                  :loading="loading"
                >
                  Cadastrar
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
  name: 'Register',
  props: {
    openLogin: {
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
      register: {
        nome: null,
        email: null,
        senha: null,
        confirmaSenha: null,
        contatos: [],
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
      this.$validator.reset('register');
    },
    toLogin() {
      this.closeDialog();
      this.openLogin();
    },
    submit() {
      let token = null;

      this.$validator.validateAll('register').then((result) => {
        if (result) {
          this.loading = true;
          this.error = false;
          Users.save(this.register)
            .then(() => Auth.getToken({
              email: this.register.email,
              password: this.register.senha,
            }))
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
