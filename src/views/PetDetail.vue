<template>
  <v-container fluid grid-list-md v-if="this.pet">
    <v-layout row wrap justify-center>
      <v-flex xs12 md6>
        <v-card >
          <v-carousel class="black test" interval="6000" :height="carouselHeight">
            <v-carousel-item
              :key="index"
              v-for="(photo, index) in pet.fotos"
            >
            <v-layout fill-height>
              <v-img
                :alt="`${pet.nome} - ${index}`"
                :src="photo"
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
            <v-dialog v-model="contactDialog" width="400">
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
                  <contact-info v-model="pet.usuario.contatos"/>
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
        <v-card class="map-card">
          <v-layout align-center justify-center>
            <v-chip
              class="elevation-2 floating-location-chip"
              color="red ligthen-1"
              text-color="white"
            >
              <v-icon class="mr-2">
                mdi-map-marker-outline
              </v-icon>
              <span class="subheading">
                Rua Paraná, 272 - Anita Garibaldi, Joinville - SC
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
              :title="`Thunderpets - ${pet.nome}`"
              language="pt-BR"
              shortname="thunderpets"
            />
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ContactInfo from '@/components/ContactInfo.vue';
import GoogleMap from '@/components/GoogleMap.vue';
import GenderChip from '@/components/GenderChip.vue';
import SizeChip from '@/components/SizeChip.vue';
import Pets from '@/services/pets';

export default {
  name: 'Post',
  components: {
    ContactInfo,
    GoogleMap,
    GenderChip,
    SizeChip,
  },
  data() {
    return {
      contactDialog: false,
      datePicker: false,
      loading: false,
      pet: null,
      pseudoPet: {
        ativo: true,
        dataAchado: '2010-10-10',
        dataRegistro: '2010-10-10',
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras efficitur ullamcorper ipsum in viverra. Fusce vel rhoncus ipsum, et vulputate ex. Sed egestas lectus vitae accumsan tincidunt. Sed ullamcorper dui urna, aliquam fringilla leo hendrerit vitae. Cras malesuada, nisi non semper posuere, magna felis sagittis felis, ut tempus diam magna in mi. Quisque eu turpis ut lectus eleifend elementum a sed eros. Phasellus feugiat ex eu velit aliquam aliquam. Ut scelerisque tempor enim, sit amet sceler',
        fotos: [
          'http://deceth.com/wp-content/uploads/2015/07/weird-chihuahua-face.jpg',
          'https://i.imgur.com/rx1vQpQ.jpg',
          'https://static1.fjcdn.com/comments/I+couldnt+find+a+reaction+image+to+describe+my+reaction+_131a3f01cd9911c5ae7421bc945d0ef3.jpg',
          'https://upload.wikimedia.org/wikipedia/commons/f/fc/Do_not_take_his_bone.jpg',
          'https://img.buzzfeed.com/buzzfeed-static/static/2017-01/3/11/campaign_images/buzzfeed-prod-fastlane-01/youre-wrong-if-you-dont-think-chihuahuas-are-the--2-14193-1483460117-0_dblbig.jpg',
          'http://www.rantpets.com/wp-content/uploads/2015/10/chihuahua-7.jpg',
          'https://i.imgflip.com/1ihajv.jpg',
          'http://images2.fanpop.com/image/photos/8600000/Chihuahua-joined-the-Beetles-funny-chihuahuas-8686589-350-450.jpg',
          'https://i.ytimg.com/vi/o0LTdDZcrrQ/maxresdefault.jpg',
          'https://i.ytimg.com/vi/efcLsg8QPjc/maxresdefault.jpg',
        ],
        idade: 'ADULTO',
        localizacao: {
          cidade: 'Joinville',
          estado: 'SC',
          latitude: -26.31341,
          longitude: -48.84802,
        },
        usuario: {
          contatos: [
            {
              tipo: 'TELEFONE',
              descricao: '(47) 3422-2222',
            },
            {
              tipo: 'CELULAR',
              descricao: '(47) 98407-6666',
            },
            {
              tipo: 'EMAIL',
              descricao: 'baldinhomeme@gmail.com',
            },
            {
              tipo: 'REDE_SOCIAL',
              descricao: '@baldinho',
            },
          ],
        },
      },
    };
  },
  beforeRouteEnter(to, from, next) {
    Pets.getById(to.params.id).then((response) => {
      next((vm) => {
        vm.setPet(response.data);
      });
    });
  },
  filters: {
    petGender(value) {
      if (!value) return '';

      return value === 'FEMEA' ? 'fêmea' : value.toLowerCase();
    },
    petSize(value) {
      if (!value) return '';

      return value === 'MEDIO' ? 'médio' : value.toLowerCase();
    },
    capitalize(value) {
      if (!value) return '';

      return value.charAt(0).toUpperCase() + value.slice(1, value.length).toLowerCase();
    },
  },
  computed: {
    carouselHeight() {
      return this.$vuetify.breakpoint.smAndDown ? (10 * window.innerWidth) / 16 : 500;
    },
  },
  methods: {
    setPet(pet) {
      this.pet = pet;
      /* For the sake of tests and having something to show, some values are set by hand.
      This may be removed when some problems with the api are fixed */
      this.pet.descricao = this.pseudoPet.descricao;
      this.pet.fotos = this.pseudoPet.fotos;
      this.pet.localizacao = this.pseudoPet.localizacao;
      this.pet.usuario = this.pseudoPet.usuario;
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

  /deep/ .test .v-carousel__controls .v-item-group{
    display: flex;
    flex-direction: row;
    flex: 1;
    justify-content: space-around;
    button {
      margin: 0 !important;
    }
  }
</style>
