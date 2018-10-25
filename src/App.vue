<template>
  <v-app>
    <v-toolbar app class="elevation-0" color="primary" height="50px" clipped-left>
      <v-toolbar-side-icon v-if="breakpoint === 'xs'" @click="drawer = true">
      </v-toolbar-side-icon>
      <v-toolbar-title class="headline" id="toolbar-title">
        <span>ThunderPets</span>
      </v-toolbar-title>
      <v-toolbar-items v-if="breakpoint !== 'xs'">
        <v-btn flat to="/" exact>
          Inicial
        </v-btn>
        <v-btn flat to="/post" exact>
          Cadastrar
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-navigation-drawer
      v-model="drawer"
      v-if="breakpoint === 'xs'"
      app
      absolute
      clipped
    >
      <drawer-menu />
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
    breakpoint() {
      return this.$vuetify.breakpoint.name;
    },
  },
};
</script>

<style lang="scss" scoped>
  #toolbar-title {
    margin-right: 20px;
  }
</style>

