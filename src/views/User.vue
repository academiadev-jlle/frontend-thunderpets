<template>
  <v-container fluid grid-list-md v-if="user">
    <v-layout row>
      <v-flex xs12>
        <v-card>
          <v-layout class="ma-0" row>
            <v-flex>
              <v-avatar tile size="100">
                <v-img aspect-ratio="1" :src="user.foto | preventNoImage" />
              </v-avatar>
            </v-flex>
            <v-flex xs12>
              <v-layout row align-center>
                <h2 class="display-1">
                  {{user.nome}}
                </h2>
                <v-layout
                  :class="{'ml-0': true, 'mr-3': isXS}"
                  :column="isXS"
                  :row="!isXS"
                  justify-space-between
                >
                  <v-tooltip top color="brown" class="ml-3">
                    <v-icon slot="activator" @click="edit">
                      mdi-pencil
                    </v-icon>
                    Editar
                  </v-tooltip>
                  <v-tooltip top color="blue">
                    <v-btn
                      :icon="isXS"
                      @click="contactDialog = true"
                      color="blue"
                      slot="activator"
                    >
                      <v-icon :left="!isXS" dark>mdi-phone</v-icon>
                      <span v-if="!isXS">
                        Contatos
                      </span>
                    </v-btn>
                    Contatos
                  </v-tooltip>
                </v-layout>
              </v-layout>
              <a class="blue--text">
                {{user.email}}
              </a>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <v-card class="py-1">
          <div v-if="loading" class="text-xs-center my-3">
            <v-progress-circular color="primary" indeterminate size="60"/>
            <h1 class="display-1 mt-3">
              Buscando pets
            </h1>
          </div>
          <div v-else>
            <v-list class="py-0" two-line v-if="pets && pets.length > 0">
              <v-list-tile v-for="(pet, index) in pets" :key="index" @click="tileClick(pet.id)">
                <v-layout align-center row>
                  <v-list-tile-avatar tile size="70" class="mr-4">
                    <v-img :src="pet.fotos[0] | preventNoPhoto">
                    </v-img>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ pet.nome }} -
                      <span class="caption">{{pet.status | statusText}}</span>
                    </v-list-tile-title>
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
                  <v-btn color="info" :icon="isSmAndDown" @click.stop="editPet(pet.id)">
                    <v-icon :left="!isSmAndDown" dark>mdi-pencil</v-icon>
                    <span v-if="!isSmAndDown">
                      Editar
                    </span>
                  </v-btn>
                  <v-btn color="error" :icon="isSmAndDown" @click.stop="removePet(pet.id, index)">
                    <v-icon :left="!isSmAndDown" dark>mdi-trash-can</v-icon>
                    <span v-if="!isSmAndDown">
                      Apagar
                    </span>
                  </v-btn>
                </v-layout>
              </v-list-tile>
            </v-list>
            <v-card-text class="text-xs-center headline grey--text" v-else>
              Nenhum pet cadastrado
            </v-card-text>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
    <v-dialog v-model="contactDialog" width="400">
      <v-card>
        <v-toolbar color="primary">
          <v-toolbar-title>
            Contatos
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
import noPhoto from '@/assets/noPhoto.jpg';
import ContactInfo from '@/components/ContactInfo.vue';
import Users from '@/services/users';
import Auth from '@/services/auth';
import Pets from '@/services/pets';

export default {
  name: 'User',
  components: {
    ContactInfo,
  },
  data() {
    return {
      contactDialog: false,
      defaultImage,
      loading: true,
      foto: null,
      pets: null,
    };
  },
  created() {
    Auth.whoAmI(localStorage.getItem('token'))
      .then(response => Users.getPetsById(response.data.id))
      .then((response) => {
        this.pets = response.data;
        this.loading = false;
      }).catch(() => {
        this.$router.push({ name: 'search' });
        this.$toast.error('Você precisa estar logado para acessar essa página');
        localStorage.removeItem('token');
        this.$store.commit('logout');
      });
  },
  computed: {
    isSmAndDown() {
      return this.$vuetify.breakpoint.smAndDown;
    },
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
  filters: {
    preventNoPhoto(value) {
      if (!value) {
        return noPhoto;
      }

      return `data:image/png;base64,${value}`;
    },
    preventNoImage(value) {
      if (!value) {
        return defaultImage;
      }

      return `data:image/png;base64,${value}`;
    },
  },
  watch: {
    loggedIn(value) {
      if (!value) {
        this.$router.push({ name: 'search' });
      }
    },
  },
  methods: {
    removePet(petId, index) {
      Pets.remove(petId).then(() => {
        this.$toast.success('Pet apagado com sucesso.');
        this.pets.splice(index, 1);
      }).catch(() => {
        this.$toast.error('Um erro de comunicação com o servidor ocorreu. Tente novamente mais tarde.');
      });
    },
    editPet(petId) {
      this.$router.push({
        name: 'post',
        params: {
          id: petId,
        },
      });
    },
    tileClick(petId) {
      this.$router.push({
        name: 'petDetail',
        params: {
          id: petId,
        },
      });
    },
    edit() {
      this.$router.push({ name: 'edit' });
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
