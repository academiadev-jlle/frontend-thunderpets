<template>
  <v-menu
    max-width="200px"
    min-width="200px"
    offset-y
    open-on-hover
    v-if="loggedIn"
  >
    <div slot="activator">
      <span class="body-2 uppercase" v-if="!isXS">{{user.nome}}</span>
      <v-avatar class="ml-2" size="30">
        <v-img
          :src="defaultImage"
        >
        </v-img>
      </v-avatar>
    </div>
    <v-card>
      <v-list-tile to="/user">
        <v-icon class="mr-3">
          mdi-account
        </v-icon>
        Minha conta
      </v-list-tile>
      <v-divider />
      <v-card-actions>
        <v-btn flat color="red" block @click="logout">
          Sair
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
  <v-layout v-else row justify-end>
    <login ref="login" :open-register="openRegister"/>
    <register ref="register" :open-login="openLogin"/>
  </v-layout>
</template>

<script>
import defaultImage from '@/assets/defaultImage.jpeg';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import Users from '@/services/users';
import Auth from '@/services/auth';

export default {
  name: 'Entrance',
  components: {
    Login,
    Register,
  },
  data() {
    return {
      defaultImage,
    };
  },
  created() {
    if (localStorage.getItem('token')) {
      Auth.whoAmI(localStorage.getItem('token'))
        .then(whoAmIResponse => Users.getById(whoAmIResponse.data.id))
        .then((getUserResponse) => {
          this.$store.commit('login', getUserResponse.data);
        });
    }
  },
  computed: {
    isXS() {
      return this.$vuetify.breakpoint.xsOnly;
    },
    loggedIn() {
      return this.$store.state.loggedIn;
    },
    user() {
      return this.$store.state.loggedUser;
    },
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$store.commit('logout');
    },
    openLogin() {
      this.$refs.login.openDialog();
    },
    openRegister() {
      this.$refs.register.openDialog();
    },
  },
};
</script>
