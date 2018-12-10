<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap justify-center>
      <v-flex xs12 md6>
        <p class="display-1 text-xs-center" >
          Procurando um animalzinho?
        </p>
        <filters-form />
      </v-flex>
      <v-flex xs12 md6>
        <v-layout justify-center class="my-5">
          <v-img
            :src="logo"
            class="text-xs-center"
            height="200px"
            max-width="200px"
          >
          </v-img>
        </v-layout>
        <p class="display-1 text-xs-center">
          A sua visão além do AU-Alcance
        </p>
        <p class="headline mx-5" align="justify">
          ThunderPets é uma plataforma web para publicação e busca de animais perdidos, achados ou
          disponíveis para adoção.
        </p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import logo from '@/assets/logo.png';
import FiltersForm from '@/components/FiltersForm.vue';

export default {
  name: 'MainPage',
  components: {
    FiltersForm,
  },
  data() {
    return {
      logo,
    };
  },
};
</script>

