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
      <v-toolbar-title class="headline" id="toolbar-title">
        <span>ThunderPets</span>
      </v-toolbar-title>
      <v-toolbar-items v-if="!isXS">
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

export default {
  name: 'App',
  components: {
    DrawerMenu,
  },
  data() {
    return {
      drawer: false,
    };
  },
  computed: {
    isXS() {
      return this.$vuetify.breakpoint.name === 'xs';
    },
  },
};
</script>

<style lang="scss" scoped>
  #toolbar-title {
    margin-right: 20px;
  }
</style>

