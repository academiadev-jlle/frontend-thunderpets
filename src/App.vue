<template>
  <v-app>
    <v-toolbar
      app
      class="elevation-0"
      clipped-left
      clipped-right
      color="primary"
      height="50px"
    >
      <v-toolbar-side-icon v-if="isSmAndDown" @click="drawer = true">
      </v-toolbar-side-icon>
      <v-toolbar-title class="headline mr-4 ml-0">
        <router-link to="/" class="black--text" style="text-decoration: none;">
          <v-avatar size="30" tile class="mr-2">
            <v-img :src="logo">
            </v-img>
          </v-avatar>
          ThunderPets
        </router-link>
      </v-toolbar-title>
      <v-toolbar-items v-if="!isSmAndDown">
        <v-btn flat to="/search" exact>
          <v-icon left>
            mdi-magnify
          </v-icon>
          Buscar
        </v-btn>
        <v-btn flat to="/post" exact>
          <v-icon left>
            mdi-plus
          </v-icon>
          Cadastrar Pet
        </v-btn>
      </v-toolbar-items>
      <v-spacer />
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
    <footer-app />
  </v-app>
</template>

<script>
import logo from '@/assets/logo.png';
import DrawerMenu from './components/DrawerMenu.vue';
import Entrance from './components/Entrance.vue';
import FooterApp from './components/FooterApp.vue';

export default {
  name: 'App',
  components: {
    DrawerMenu,
    Entrance,
    FooterApp,
  },
  data() {
    return {
      logo,
      drawer: false,
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
