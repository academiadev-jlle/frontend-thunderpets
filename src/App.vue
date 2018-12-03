<template>
  <v-app>
    <v-toolbar
      app
      class="elevation-0"
      clipped-left
      color="primary"
      height="50px"
    >
      <v-toolbar-side-icon v-if="isSmAndDown" @click="drawer = true">
      </v-toolbar-side-icon>
      <v-toolbar-title class="headline mr-4">
        <span>ThunderPets</span>
      </v-toolbar-title>
      <v-toolbar-items v-if="!isSmAndDown">
        <v-btn flat to="/" exact>
          Inicial
        </v-btn>
        <v-btn flat to="/post" exact>
          Cadastrar Pet
        </v-btn>
        <v-btn flat to="/postUser" exact>
          Cadastrar Usuário
        </v-btn>
      </v-toolbar-items>
      <v-spacer />
      <!-- <login /> -->
      <!-- <register /> -->
      <entrance />
    </v-toolbar>
    <v-navigation-drawer
      app
      clipped
      v-if="isSmAndDown"
      v-model="drawer"
    >
      <drawer-menu @close-drawer="drawer = false"/>
    </v-navigation-drawer>
    <v-content>
      <v-fade-transition>
        <router-view class="router-view"></router-view>
      </v-fade-transition>
    </v-content>
  </v-app>
</template>

<script>
import DrawerMenu from './components/DrawerMenu.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Entrance from './components/Entrance.vue';

export default {
  name: 'App',
  components: {
    DrawerMenu,
    Entrance,
    Login,
    Register,
  },
  data() {
    return {
      drawer: false,
      dialog: false,
      login: {
        email: null,
        password: null,
        rememberMe: false,
      },
    };
  },
  computed: {
    isSmAndDown() {
      return this.$vuetify.breakpoint.smAndDown;
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
  .router-view {
    height: 100%;
  }
</style>
