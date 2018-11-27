<template>
  <v-card hover v-if="pet" @click.native="clickCard()">
    <v-responsive>
      <v-img :src="pet.foto | preventNoPhoto" aspect-ratio="1.5" id="photo">
        <v-layout
          align-end
          class="mx-1"
          fill-height
          row
        >
          <v-tooltip color="primary" top>
            <v-chip
              class="elevation-2 ma-0 subheading"
              color="primary"
              slot="activator"
              text-color="white"
              v-if="pet.distancia"
            >
              <v-avatar class="mr-0">
                <v-icon>mdi-map-marker</v-icon>
              </v-avatar>
              <span id="distance-text">
                {{pet.distancia}} km
              </span>
            </v-chip>
            <span>Distância</span>
          </v-tooltip>
          <v-spacer />
          <v-layout row align-center justify-end>
            <v-tooltip color="green" top>
              <v-avatar
                class="elevation-2"
                color="green"
                size="24"
                slot="activator"
              >
                <v-icon dark id="small" >{{pet.porte | sizeIcon}}</v-icon>
              </v-avatar>
              <span id="size-text">Porte {{pet.porte | sizeText}}</span>
            </v-tooltip>
            <v-tooltip :color="genderColor" top>
              <v-avatar
                :color="genderColor"
                class="elevation-2 ma-1"
                size="36"
                slot="activator"
              >
                <v-icon dark>{{pet.sexo | genderIcon}}</v-icon>
              </v-avatar>
              <span id="sex-text">{{pet.sexo | genderText | capitalize}}</span>
            </v-tooltip>
          </v-layout>
        </v-layout>
      </v-img>
    </v-responsive>
    <v-card-title class="headline pa-2 pb-0" id="name">
      {{pet.nome}}
    </v-card-title>
    <v-card-text class="body-1 px-2 pt-0 text-xs-justify" id="description">
      {{pet.descricao}}
    </v-card-text>
  </v-card>
</template>

<script>
import noPhoto from '@/assets/noPhoto.jpg';

export default {
  name: 'PetCard',
  props: [
    'pet',
  ],
  filters: {
    preventNoPhoto(value) {
      if (!value) {
        return noPhoto;
      }

      return value;
    },
    formatSize(value) {
      return value === 'MEDIO' ? 'médio' : value.toLowerCase();
    },
    formatGender(value) {
      return value === 'FEMEA' ? 'fêmea' : value.toLowerCase();
    },
    capitalize(value) {
      if (!value) return '';

      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
  computed: {
    genderColor() {
      if (this.pet.sexo === 'MACHO') {
        return 'blue';
      } else if (this.pet.sexo === 'FEMEA') {
        return 'pink';
      }

      return 'grey';
    },
  },
  methods: {
    clickCard() {
      this.$router.push({ name: 'petDetail', params: { id: this.pet.id } });
    },
  },
};
</script>

