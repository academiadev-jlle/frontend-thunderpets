<template>
  <v-app>
    <v-toolbar
      app
      class="elevation-0"
      clipped-left
      color="primary"
      height="50px"
    >
      <v-toolbar-side-icon v-if="isXS" @click="drawer = true">
      </v-toolbar-side-icon>
      <v-toolbar-title class="headline mr-4">
        <span>ThunderPets</span>
      </v-toolbar-title>
      <v-toolbar-items v-if="!isXS">
        <v-btn flat to="/" exact>
          Inicial
        </v-btn>
        <v-btn flat to="/post" exact>
          Cadastrar
        </v-btn>
      </v-toolbar-items>
      <v-spacer />
      <v-btn flat exact @click="dialog = true">
        Entrar
      </v-btn>
    </v-toolbar>
    <v-dialog
      v-model="dialog"
      max-width="500"
      transition="scale-transition"
    >
      <v-card class="pa-1">
        <v-card-title class="headline">
          Entrar
          <v-spacer />
          <v-icon size="40" @click="dialog = false">
            mdi-close
          </v-icon>
        </v-card-title>
        <v-card-text>
          <v-text-field
            label="Email"
            v-validate="'required|email'"
            :error-messages="errors.collect('email')"
            data-vv-as="email"
            data-vv-name="email"
            v-model="login.email"
            class="required"
          >
          </v-text-field>
          <v-text-field
            label="Senha"
            type="password"
            v-validate="'required'"
            :error-messages="errors.collect('password')"
            data-vv-as="senha"
            data-vv-name="password"
            v-model="login.password"
          >
          </v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-layout column>
            <v-btn
              color="primary"
              block
              @click="submit"
            >
              Entrar
            </v-btn>
            <v-divider class="my-3"></v-divider>
            <v-container fluid grid-list-md class="pa-0">
              <v-layout row>
                <v-flex xs6>
                  <v-btn
                    color="#cf4332"
                    block
                    dark
                    @click="dialog = false"
                    :class="{'pr-4': !isXS}"
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
                    color="#3c66c4"
                    block
                    dark
                    @click="dialog = false"
                    :class="{'pr-4': !isXS}"
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
    <v-navigation-drawer
      app
      clipped
      v-if="isXS"
      v-model="drawer"
    >
      <drawer-menu @close-drawer="drawer = false"/>
    </v-navigation-drawer>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import DrawerMenu from './components/DrawerMenu.vue';

export default {
  name: 'App',
  components: {
    DrawerMenu,
  },
  data() {
    return {
      drawer: false,
      dialog: false,
      login: {
        email: null,
        password: null,
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
      this.$validator.validateAll();
    },
  },
};
</script>

<style lang="scss" scoped>
  .v-dialog__content {
    align-items: center;
    justify-content: center;
  }
</style>
