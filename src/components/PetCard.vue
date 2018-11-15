<template>
  <v-card hover v-if="pet">
    <v-responsive>
      <v-img :src="pet.foto" aspect-ratio="1.5" id="photo">
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
              v-if="pet.distancia !== null"
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
                <v-icon dark id="small" v-if="pet.porte === 'PEQUENO'">mdi-alpha-p</v-icon>
                <v-icon dark id="medium" v-else-if="pet.porte === 'MEDIO'">mdi-alpha-m</v-icon>
                <v-icon dark id="large" v-else>mdi-alpha-g</v-icon>
              </v-avatar>
              <span id="size-text">Porte {{formatSize}}</span>
            </v-tooltip>
            <v-tooltip :color="sexoColor" top>
              <v-avatar
                :color="sexoColor"
                class="elevation-2 ma-1"
                size="36"
                slot="activator"
              >
                <v-icon dark id="male" v-if="pet.sexo === 'MACHO'">mdi-gender-male</v-icon>
                <v-icon dark id="female" v-else-if="pet.sexo === 'FEMEA'">mdi-gender-female</v-icon>
                <v-icon dark id="undetermined" v-else>mdi-help</v-icon>
              </v-avatar>
              <span class="text-capitalize" id="sex-text">{{formatSex}}</span>
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
export default {
  name: 'PetCard',
  props: [
    'pet',
  ],
  computed: {
    sexoColor() {
      if (this.pet.sexo === 'MACHO') {
        return 'blue';
      } else if (this.pet.sexo === 'FEMEA') {
        return 'pink';
      }

      return 'grey';
    },
    formatSize() {
      return this.pet.porte === 'MEDIO' ? 'médio' : this.pet.porte.toLowerCase();
    },
    formatSex() {
      return this.pet.sexo === 'FEMEA' ? 'fêmea' : this.pet.sexo.toLowerCase();
    },
  },
};
</script>

