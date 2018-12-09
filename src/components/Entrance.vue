<template>
  <v-menu
    max-width="200px"
    min-width="200px"
    offset-y
    open-on-hover
    v-if="loggedIn"
  >
    <v-layout align-center slot="activator" >
      <v-avatar class="mr-2" size="30">
        <v-img :src="userPhoto"></v-img>
      </v-avatar>
      <span class="subheading uppercase" v-if="!isXS || drawerStyled">
        Olá, <span class="font-weight-bold">{{user.nome}}</span>
      </span>
    </v-layout>
    <v-card v-if="!drawerStyled">
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
  <v-layout
    :justify-center="drawerStyled"
    :justify-end="!drawerStyled"
    row
    v-else
  >
    <login :drawer-styled="drawerStyled" :open-register="openRegister" ref="login"/>
    <register
      :drawer-styled="drawerStyled"
      :open-login="openLogin"
      ref="register"
      v-show="!isXS || drawerStyled"
    />
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
  props: {
    drawerStyled: {
      type: Boolean,
      default: false,
    },
  },
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
    userPhoto() {
      return this.user.foto ? `data:image/png;base64,${this.user.foto}` : this.defaultImage;
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
