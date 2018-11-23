<template>
  <v-container fluid grid-list-md>
    <v-layout row>
      <v-flex xs12>
        <v-card>
          <v-layout align-center class="ma-0" row>
            <v-flex>
              <v-avatar tile size="100">
                <v-img aspect-ratio="1" :src="defaultImage" />
              </v-avatar>
            </v-flex>
            <v-flex xs12>
              <h2 class="display-1">Adam Mews dos Santos</h2>
              <a class="blue--text">
                baldinhomeme@gmail.com
              </a>
              <v-dialog v-model="contactDialog" width="400">
                <v-btn color="blue" dark slot="activator">
                  Contatos
                </v-btn>
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
                    Substituir pelo componente de contatos desenvolvido na branch feature/17
                  </v-card-text>
                </v-card>
              </v-dialog>
            </v-flex>
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
                    {{pet.sexo | petGender | capitalize}} -
                    Porte {{pet.porte | petSize}} -
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
          <v-card-text class="text-xs-center headline grey--text text--darken-2" v-else>
            Nenhum pet cadastrado
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import defaultImage from '@/assets/defaultImage.jpeg';

export default {
  data() {
    return {
      contactDialog: false,
      defaultImage,
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
    if (localStorage.getItem('user')) {
      next();
    } else {
      // eslint-disable-next-line no-restricted-globals
      history.back();
    }
  },
  filters: {
    petSize(value) {
      return value === 'MEDIO' ? 'médio' : value.toLowerCase();
    },
    petGender(value) {
      return value === 'FEMEA' ? 'fêmea' : value.toLowerCase();
    },
    capitalize(value) {
      if (!value) return '';

      return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    },
  },
  computed: {
    isSM() {
      return this.$vuetify.breakpoint.smAndDown;
    },
    loggedIn() {
      return this.$store.state.loggedIn;
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
