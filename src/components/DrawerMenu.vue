<template>
  <v-list class="pt-0">
    <v-list-tile class="primary">
      <v-list-tile-action>
        <v-btn icon @click="$emit('close-drawer')">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title class="headline" style="height: initial">
          <router-link to="/" class="black--text" style="text-decoration: none;">
            <v-avatar size="30" tile class="mr-2">
              <v-img :src="logo">
              </v-img>
            </v-avatar>
            ThunderPets
          </router-link>
        </v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile class="primary">
      <entrance drawer-styled/>
    </v-list-tile>
    <v-list-tile to='/user' v-if="loggedIn">
      <v-list-tile-avatar>
        <v-icon>
          mdi-account
        </v-icon>
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title>MINHA CONTA</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-divider v-if="loggedIn"/>
    <v-list-tile to='/search'>
      <v-list-tile-avatar>
        <v-icon>
          mdi-magnify
        </v-icon>
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title>BUSCAR</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-divider />
    <v-list-tile to='/post'>
      <v-list-tile-avatar>
        <v-icon>
          mdi-plus
        </v-icon>
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title>CADASTRAR PET</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-divider />
    <v-list-tile v-if="loggedIn">
      <v-btn block class="error" @click="logout">
        Sair
      </v-btn>
    </v-list-tile>
  </v-list>
</template>

<script>
import logo from '@/assets/logo.png';
import Entrance from '@/components/Entrance.vue';

export default {
  name: 'DrawerMenu',
  components: {
    Entrance,
  },
  data() {
    return {
      logo,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.loggedIn;
    },
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$store.commit('logout');
    },
  },
};
</script>

