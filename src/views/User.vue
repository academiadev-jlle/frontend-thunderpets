<template>
  <v-container fluid grid-list-md v-if="user">
    <v-layout row>
      <v-flex xs12>
        <v-card>
          <v-layout class="ma-0" row>
            <v-flex >
              <v-avatar tile size="100">
                <v-img aspect-ratio="1" :src="defaultImage" />
              </v-avatar>
            </v-flex>
            <v-flex xs12>
              <h2 class="display-1">{{user.nome}}</h2>
              <a class="blue--text">
                {{user.email}}
              </a>
            </v-flex>
            <v-btn color="blue" dark slot="activator" @click="contactDialog = true">
              Contatos
            </v-btn>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <v-card style="padding: 2px 0">
          <v-list class="py-0" two-line v-if="pets.length > 0">
            <v-list-tile v-for="(pet, index) in pets" :key="index">
              <v-layout row align-center>
                <v-list-tile-avatar tile>
                  <!-- <v-img :src="defaultImage"/> -->
                  <v-icon size="40">mdi-dog</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>{{ pet.nome }}</v-list-tile-title>
                  <v-list-tile-sub-title>
                    {{pet.especie | capitalize}} -
                    {{pet.sexo | genderText | capitalize}} -
                    Porte {{pet.porte | sizeText}} -
                    {{pet.idade | capitalize}}
                  </v-list-tile-sub-title>
                  <v-list-tile-sub-title class="caption">
                    {{pet.descricao}}
                  </v-list-tile-sub-title>
                </v-list-tile-content>
                <v-spacer />
                <v-btn color="info" :icon="isSM">
                  <v-icon :left="!isSM" dark>mdi-pencil</v-icon>
                  <span v-if="!isSM">
                    Editar
                  </span>
                </v-btn>
                <v-btn color="error" :icon="isSM" @click="inactivatePet(pet.id, index)">
                  <v-icon :left="!isSM" dark>mdi-trash-can</v-icon>
                  <span v-if="!isSM">
                    Apagar
                  </span>
                </v-btn>
              </v-layout>
            </v-list-tile>
          </v-list>
          <v-card-text class="text-xs-center headline grey--text" v-else>
            Nenhum pet cadastrado
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-dialog v-model="contactDialog" width="400">
      <v-card>
        <v-toolbar color="primary">
          <v-toolbar-title>
            Contatos
            <v-tooltip top color="brown">
              <v-icon slot="activator" @click="editContacts">
                mdi-pencil
              </v-icon>
              Editar
            </v-tooltip>
          </v-toolbar-title>
          <v-spacer />
          <v-icon @click="contactDialog = false">
            mdi-close
          </v-icon>
        </v-toolbar>
        <v-card-text>
          <contact-info v-model="user.contatos"/>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import defaultImage from '@/assets/defaultImage.jpeg';
import ContactInfo from '@/components/ContactInfo.vue';

export default {
  name: 'User',
  components: {
    ContactInfo,
  },
  data() {
    return {
      contactDialog: false,
      defaultImage,
      foto: null,
      pets: [
        {
          descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras gravida neque leo. Cras fermentum tortor magna, a molestie enim bibendum non. Praesent viverra mi in lacus sagittis, in venenatis nulla tempus. Mauris lorem leo, sodales sit amet lorem vitae, porttitor laoreet odio. Sed lectus justo, eleifend sit amet viverra eget, varius ut ligula. Suspendisse feugiat, sapien vel pretium fringilla, enim sem volutpat magna, nec auctor ligula orci et urna  volutpat magna, nec auctor ligula orci et urna.',
          especie: 'CACHORRO',
          id: '1',
          idade: 'ADULTO',
          nome: 'Pet 1',
          porte: 'MEDIO',
          sexo: 'MACHO',
        }, {
          descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras gravida neque leo. Cras fermentum tortor magna, a molestie enim bibendum non. Praesent viverra mi in lacus sagittis, in venenatis nulla tempus. Mauris lorem leo, sodales sit amet lorem vitae, porttitor laoreet odio. Sed lectus justo, eleifend sit amet viverra eget, varius ut ligula. Suspendisse feugiat, sapien vel pretium fringilla, enim sem volutpat magna, nec auctor ligula orci et urna  volutpat magna, nec auctor ligula orci et urna.',
          especie: 'CACHORRO',
          id: '2',
          idade: 'ADULTO',
          nome: 'Pet 2',
          porte: 'MEDIO',
          sexo: 'MACHO',
        }, {
          descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras gravida neque leo. Cras fermentum tortor magna, a molestie enim bibendum non. Praesent viverra mi in lacus sagittis, in venenatis nulla tempus. Mauris lorem leo, sodales sit amet lorem vitae, porttitor laoreet odio. Sed lectus justo, eleifend sit amet viverra eget, varius ut ligula. Suspendisse feugiat, sapien vel pretium fringilla, enim sem volutpat magna, nec auctor ligula orci et urna  volutpat magna, nec auctor ligula orci et urna.',
          especie: 'CACHORRO',
          id: '3',
          idade: 'ADULTO',
          nome: 'Pet 3',
          porte: 'MEDIO',
          sexo: 'MACHO',
        },
      ],
    };
  },
  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem('token')) {
      next();
    } else {
      // eslint-disable-next-line no-restricted-globals
      history.back();
    }
  },
  created() {
  },
  computed: {
    isSM() {
      return this.$vuetify.breakpoint.smAndDown;
    },
    loggedIn() {
      return this.$store.state.loggedIn;
    },
    user() {
      return this.$store.state.loggedUser;
    },
  },
  watch: {
    loggedIn(value) {
      if (!value) {
        this.$router.push({ name: 'home' });
      }
    },
  },
  methods: {
    editContacts() {
      console.log('Editar contatos');
    },
    inactivatePet(petId, index) {
      this.pets.splice(index, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
  /deep/ .v-list__tile {
    margin: 2px 0px;
    padding: 0 12px;
  }
</style>
