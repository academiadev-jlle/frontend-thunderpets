<template>
  <div>
    <v-menu
      max-width="200px"
      min-width="200px"
      offset-y
      v-if="loggedIn"
      open-on-hover
    >
      <div slot="activator" >
        <span class="body-2 uppercase" v-if="!isXS">Stan Lee</span>
        <v-avatar class="ml-2" size="30">
          <v-img
            :src="defaultImage"
          >
          </v-img>
        </v-avatar>
      </div>
      <v-card>
        <v-list-tile>
          <v-icon class="mr-3">
            mdi-account
          </v-icon>
          Minha conta
        </v-list-tile>
        <v-divider class="" />
        <v-card-actions>
          <v-btn flat color="red" block @click="loggedIn = false">
            Sair
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
    <v-btn
      @click="dialog = true"
      exact
      flat
      id="login-button"
      v-else
    >
      Entrar
    </v-btn>
    <v-dialog
      max-width="500"
      transition="scale-transition"
      v-model="dialog"
    >
      <v-card class="pa-1">
        <v-card-title class="headline">
          Entrar
          <v-spacer />
          <v-icon size="40" @click="closeDialog">
            mdi-close
          </v-icon>
        </v-card-title>
        <v-card-text>
          <v-text-field
            :error-messages="errors.collect('email')"
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
              <div class="v-label theme--light underline mt-2 text-xs-right blue--text">
                <a @click="forgotPassword" class="blue--text">Esqueci minha senha</a>
              </div>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-layout column>
            <span class="mb-2">Não possui conta? <a class="blue--text" @click="register">Cadastre-se</a></span>
            <v-btn
              @click="submit"
              block
              color="primary"
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
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import defaultImage from '@/assets/defaultImage.jpeg';
import Users from '@/services/users';

export default {
  name: 'Login',
  data() {
    return {
      defaultImage,
      dialog: true,
      loggedIn: false,
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
    submit() {
      this.$validator.validate().then((result) => {
        if (result) {
          this.loggedIn = true;
          this.dialog = false;
        }
      });
    },
    closeDialog() {
      this.dialog = false;
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
        senha: 'adam@adam',
      });
    },
  },
};
</script>

