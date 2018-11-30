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
    <v-btn
      @click="dialog = true"
      exact
      flat
      v-else
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
          <v-icon @click="dialog = false">
            mdi-close
          </v-icon>
        </v-toolbar>
        <v-alert v-model="error" type="error" class="my-0">
          Email e/ou senha inválido(s), por favor revise suas informações.
        </v-alert>
        <div class="pa-1">
          <v-card-text>
            <v-text-field
              :error-messages="errors.collect('email')"
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
              :error-messages="errors.collect('password')"
              @keyup.enter="submit"
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
                <a class="blue--text" @click="register">Cadastre-se</a>
              </span>
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
      error: false,
      loading: false,
      login: {
        email: null,
        password: null,
        rememberMe: false,
      },
    };
  },
  created() {
    if (localStorage.getItem('token')) {
      Auth.whoAmI(localStorage.getItem('token')).then((whoAmIResponse) => {
        Users.getById(whoAmIResponse.data.id).then((getUserResponse) => {
          this.$store.commit('login', getUserResponse.data);
        });
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
    submit() {
      this.$validator.validate().then((result) => {
        if (result) {
          this.loading = true;
          this.error = false;
          Auth.getToken(this.login).then((response) => {
            Auth.whoAmI(response.data.access_token).then((response2) => {
              Users.getById(response2.data.id).then((response3) => {
                localStorage.setItem('token', response.data.access_token);
                this.$store.commit('login', response3.data);
                this.dialog = false;
                this.loading = false;
              });
            });
          }).catch(() => {
            this.error = true;
            this.loading = false;
          });
        }
      });
    },
    closeDialog() {
      this.dialog = false;
      this.error = false;
      this.$validator.reset();
    },
    forgotPassword() {
      console.log('Esqueci Senha');
    },
    register() {
      Users.save({
        ativo: true,
        contatos: [{
          tipo: 'TELEFONE',
          descricao: '(47) 3422-2222',
        }],
        email: 'adam@adam.com',
        foto: null,
        nome: 'Adam',
        senha: 'adam@meme',
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
        this.closeDialog();
      }
    },
  },
};
</script>

