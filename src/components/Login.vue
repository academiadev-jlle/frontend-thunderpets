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
                  <a class="blue--text" @click="toRegister">Cadastre-se</a>
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
                        @click="submitFacebook"
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
import Users from '@/services/users';
import Auth from '@/services/auth';

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
    FacebookFrame,
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
      facebookUri: null,
    };
  },
  computed: {
    isXS() {
      return this.$vuetify.breakpoint.xsOnly;
    },
  },
  created() {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId      : '1136188899888117',
        cookie     : true,
        xfbml      : true,
        version    : 'v3.2',
      });
      FB.AppEvents.logPageView();
    }
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
      console.log('Esqueci Senha');
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
    submitFacebook() {
      this.$auth.authenticate('facebook').then((r) => {
        this.$toast.success("foi");
        console.log(r);
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
