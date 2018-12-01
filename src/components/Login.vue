<template>
  <div>
    <v-menu
      max-width="200px"
      min-width="200px"
      offset-y
      open-on-hover
      v-if="loggedIn"
    >
      <div slot="activator">
        <span class="body-2 uppercase" v-if="!isXS">{{user.nome}}</span>
        <v-avatar class="ml-2" size="30">
          <v-img
            :src="defaultImage"
          >
          </v-img>
        </v-avatar>
      </div>
      <v-card>
        <v-list-tile to="/user">
          <v-icon class="mr-3">
            mdi-account
          </v-icon>
          Minha conta
        </v-list-tile>
        <v-divider />
        <v-card-actions>
          <v-btn flat color="red" block @click="logout">
            Sair
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
    <v-layout row v-else>
      <v-btn
        @click="registerDialog = true"
        exact
        flat
      >
        Cadastrar-se
      </v-btn>
      <v-btn
        @click="dialog = true"
        exact
        flat
      >
        Entrar
      </v-btn>
    </v-layout>
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
          <v-icon @click="closeLoginDialog">
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
                @keyup.enter="submitLogin"
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
                @keyup.enter="submitLogin"
                data-vv-as="senha"
                data-vv-name="password"
                label="Senha"
                type="password"
                v-model="login.password"
                v-validate="'required'"
              >
              </v-text-field>
              <v-layout row wrap>
                <v-flex xs6>
                  <v-checkbox
                    class="my-0"
                    color="primary"
                    label="Lembrar de mim"
                    v-model="login.rememberMe"
                  ></v-checkbox>
                </v-flex>
                <v-flex xs6>
                  <div class="v-label mt-2 text-xs-right">
                    <a @click="forgotPassword" class="blue--text">Esqueci minha senha</a>
                  </div>
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-card-actions>
              <v-layout column>
                <span class="mb-2">
                  Não possui conta?
                  <a class="blue--text" @click="loginToRegister">Cadastre-se</a>
                </span>
                <v-btn
                  @click="submitLogin"
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
                      <v-btn
                        :class="{'pr-4': !isXS}"
                        block
                        color="#cf4332"
                        dark
                      >
                        <v-icon :class="{'mr-4': !isXS}">
                          mdi-google
                        </v-icon>
                        <span v-if="!isXS">
                          Entrar com Google
                        </span>
                      </v-btn>
                    </v-flex>
                    <v-flex xs6>
                      <v-btn
                        :class="{'pr-4': !isXS}"
                        block
                        color="#3c66c4"
                        dark
                      >
                        <v-icon :class="{'mr-3': !isXS}">
                          mdi-facebook
                        </v-icon>
                        <span v-if="!isXS">
                          Entrar com Facebook
                        </span>
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-layout>
            </v-card-actions>
          </form>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog
      max-width="500"
      transition="scale-transition"
      v-model="registerDialog"
    >
      <v-card>
        <v-toolbar color="primary">
          <v-toolbar-title>
            Cadastrar-se
          </v-toolbar-title>
          <v-spacer />
          <v-icon @click="registerDialog = false">
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
                @keyup.enter="submitRegister"
                data-vv-as="nome"
                data-vv-name="name"
                label="Nome completo"
                v-model="register.nome"
                v-validate="'required|min:3'"
              ></v-text-field>
              <v-text-field
                :error-messages="errors.collect('register.email')"
                @keyup.enter="submitRegister"
                data-vv-as="email"
                data-vv-name="email"
                label="E-mail"
                v-model="register.email"
                v-validate="'required|email'"
              ></v-text-field>
              <v-text-field
                :error-messages="errors.collect('register.password')"
                @keyup.enter="submitRegister"
                data-vv-as="senha"
                data-vv-name="password"
                label="Senha"
                type="password"
                v-model="register.senha"
                v-validate="'required|min:8'"
              ></v-text-field>
              <v-text-field
                :error-messages="errors.collect('register.confirmPassword')"
                @keyup.enter="submitRegister"
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
                  <a class="blue--text" @click="registerToLogin">Entrar</a>
                </span>
                <v-btn
                  @click="submitRegister"
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
                      <v-btn
                        :class="{'pr-4': !isXS}"
                        block
                        color="#cf4332"
                        dark
                      >
                        <v-icon :class="{'mr-4': !isXS}">
                          mdi-google
                        </v-icon>
                        <span v-if="!isXS">
                          Entrar com Google
                        </span>
                      </v-btn>
                    </v-flex>
                    <v-flex xs6>
                      <v-btn
                        :class="{'pr-4': !isXS}"
                        block
                        color="#3c66c4"
                        dark
                      >
                        <v-icon :class="{'mr-3': !isXS}">
                          mdi-facebook
                        </v-icon>
                        <span v-if="!isXS">
                          Entrar com Facebook
                        </span>
                      </v-btn>
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
import defaultImage from '@/assets/defaultImage.jpeg';
import Users from '@/services/users';
import Auth from '@/services/auth';

export default {
  name: 'Login',
  data() {
    return {
      defaultImage,
      dialog: false,
      registerDialog: false,
      error: false,
      loading: false,
      token: null,
      login: {
        email: null,
        password: null,
        rememberMe: false,
      },
      register: {
        email: null,
        senha: null,
        confirmaSenha: null,
        nome: null,
        contatos: [],
      },
    };
  },
  created() {
    if (localStorage.getItem('token')) {
      Auth.whoAmI(localStorage.getItem('token'))
        .then(whoAmIResponse => Users.getById(whoAmIResponse.data.id))
        .then((getUserResponse) => {
          this.$store.commit('login', getUserResponse.data);
        });
    }
  },
  computed: {
    isXS() {
      return this.$vuetify.breakpoint.xsOnly;
    },
    loggedIn() {
      return this.$store.state.loggedIn;
    },
    user() {
      return this.$store.state.loggedUser;
    },
  },
  methods: {
    submitLogin() {
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
    closeLoginDialog() {
      this.dialog = false;
      this.error = false;
      this.$validator.reset();
    },
    closeRegisterDialog() {
      this.registerDialog = false;
      this.error = false;
      this.$validator.reset();
    },
    loginToRegister() {
      this.closeLoginDialog();
      this.registerDialog = true;
    },
    registerToLogin() {
      this.closeRegisterDialog();
      this.dialog = true;
    },
    forgotPassword() {
      console.log('Esqueci Senha');
    },
    submitRegister() {
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
              this.registerDialog = false;
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
    logout() {
      localStorage.removeItem('token');
      this.$store.commit('logout');
    },
  },
  watch: {
    dialog(value) {
      if (!value) {
        this.closeLoginDialog();
      }
    },
  },
};
</script>

