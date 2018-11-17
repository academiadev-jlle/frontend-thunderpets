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
      <login />
    </v-toolbar>
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
import Login from './components/Login.vue';

export default {
  name: 'App',
  components: {
    DrawerMenu,
    Login,
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
