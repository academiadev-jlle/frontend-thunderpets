<template>
  <v-container fluid grid-list-md v-if="pet">
    <v-layout row wrap justify-center>
      <v-flex xs12 md6>
        <v-card>
          <v-carousel
            :height="carouselHeight"
            :hide-controls="pet.fotos.length <= 1"
            :hide-delimiters="pet.fotos.length <= 1"
            class="black"
            interval="6000"
          >
            <v-carousel-item
              :key="index"
              v-for="(photo, index) in pet.fotos"
            >
              <v-layout fill-height>
                <v-img
                  :alt="`${pet.nome} - ${index}`"
                  :src="`data:image/png;base64,${photo}`"
                  aspect-ratio="1"
                  class="black"
                  contain
                >
                </v-img>
              </v-layout>
            </v-carousel-item>
          </v-carousel>
        </v-card>
      </v-flex>
      <v-flex xs12 md6>
        <v-card>
          <v-card-text class="text-xs-justify">
            <v-layout row>
            <p class="display-1 ma-0">
              {{pet.nome}}
            </p>
            <v-spacer />
            {{pet.usuario}}
            <v-dialog v-model="contactDialog" width="400" v-if="contatos.length > 0">
              <v-btn color="blue" dark slot="activator">
                Entrar em contato
              </v-btn>
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
                  <contact-info v-model="contatos"/>
                </v-card-text>
              </v-card>
            </v-dialog>
            </v-layout>
            <v-layout row wrap class="mb-1">
              <v-chip class="body-1" color="grey" text-color="black" >
                {{pet.especie | capitalize}}
              </v-chip>
              <gender-chip v-model="pet.sexo" />
              <size-chip v-model="pet.porte" />
              <v-chip class="body-1 lower" color="blue darken-3" text-color="white" >
                {{pet.idade | capitalize}}
              </v-chip>
            </v-layout>
            <span>
              {{pet.descricao}}
            </span>
          </v-card-text>
        </v-card>
        <v-card class="map-card" v-if="pet.localizacao">
          <v-layout align-center justify-center>
            <v-chip
              class="elevation-2 floating-location-chip"
              color="red ligthen-1"
              text-color="white"
              v-if="pet.localizacao.descricao"
            >
              <v-icon class="mr-2">
                mdi-map-marker-outline
              </v-icon>
              <span class="subheading">
                {{pet.localizacao.descricao}}
              </span>
            </v-chip>
          </v-layout>
          <google-map
            :height="331"
            read-only
            v-if="pet.localizacao"
            v-model="pet.localizacao"
          />
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-center>
      <v-flex xs12>
        <v-card>
          <v-card-text>
            <vue-disqus
              :identifier="pet.id"
              :shortname="disqusShortname"
              :title="`Thunderpets - ${pet.nome}`"
              language="pt-BR"
            />
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ContactInfo from '@/components/ContactInfo.vue';
import GenderChip from '@/components/GenderChip.vue';
import GoogleMap from '@/components/GoogleMap.vue';
import SizeChip from '@/components/SizeChip.vue';
import Users from '@/services/users';

export default {
  name: 'PetDetailComponent',
  props: {
    pet: {
      type: Object,
      required: true,
    },
  },
  components: {
    ContactInfo,
    GenderChip,
    GoogleMap,
    SizeChip,
  },
  data() {
    return {
      contactDialog: false,
      disqusShortname: process.env.VUE_APP_DISQUS_SHORTNAME,
      loading: false,
      contatos: [],
    };
  },
  created() {
    Users.getById(this.pet.usuarioId).then((response) => {
      this.contatos = response.data.contatos;
    });
  },
  computed: {
    carouselHeight() {
      return this.$vuetify.breakpoint.smAndDown ? (10 * window.innerWidth) / 16 : 500;
    },
  },
};
</script>

<style lang="scss" scoped>
  /deep/ .floating-location-chip {
    max-width: 100%;
    position: absolute;
    top: -20px;
    z-index: 1;

    .v-chip__content {
      height: fit-content;

      span {
        white-space: normal;
      }
    }
  }

  .map-card {
    margin-top: 30px !important;
  }

  /deep/ .v-carousel__controls .v-item-group{
    display: flex;
    flex-direction: row;
    flex: 1;
    justify-content: space-around;
    button {
      margin: 0 !important;
    }
  }
</style>
