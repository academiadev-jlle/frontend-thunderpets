<template>
  <v-app>
    <v-toolbar
      app
      class="elevation-0"
      clipped-left
      color="primary"
      height="50px"
    >
      <v-toolbar-side-icon v-if="isSM" @click="drawer = true">
      </v-toolbar-side-icon>
      <v-toolbar-title class="headline mr-4">
        <span>ThunderPets</span>
      </v-toolbar-title>
      <v-toolbar-items v-if="!isSM">
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
      <login />
    </v-toolbar>
    <v-navigation-drawer
      app
      clipped
      v-if="isSM"
      v-model="drawer"
    >
      <drawer-menu @close-drawer="drawer = false"/>
    </v-navigation-drawer>
    <v-content>
      <!-- <v-fade-transition> -->
        <router-view class="view"></router-view>
      <!-- </v-fade-transition> -->
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
    isSM() {
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
