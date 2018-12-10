<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap justify-center>
      <v-flex xs12 md6>
        <p class="display-1">
          Procurando um animalzinho?
        </p>
      </v-flex>
      <v-flex xs12 md6>
        <v-layout justify-center>
          <v-img
            :src="logo"
            class="text-xs-center"
            height="200px"
            max-width="200px"
          >
          </v-img>
        </v-layout>
        <p class="display-1 text-xs-center font-weight-bold">
          A sua visão além do AU-Alcance
        </p>
        <p class="headline" align="justify">
          ThunderPets é uma plataforma web para publicação e busca de animais perdidos, achados ou
          disponíveis para adoção.
        </p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import logo from '@/assets/logo.png';

export default {
  name: 'MainPage',
  data() {
    return {
      logo,
    };
  },
};
</script>

