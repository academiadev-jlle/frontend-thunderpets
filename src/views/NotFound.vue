<template>
  <v-layout row wrap>
      <v-flex xs12 md6 align-self-center>
        <v-layout row wrap justify-center>
          <v-img
            :src="image404"
            max-width="400px"
          >
          </v-img>
        </v-layout>

      </v-flex>

      <v-flex xs12 md6 align-self-center>
        <v-layout align-start justify-center column>
          <p class="display-2 mx-5"> Página não encontrada </p>
          <p class="headline mx-5"> Lamentamos, mas não foi possível encontrar a página solicitada.</p>
        </v-layout>
      </v-flex>
  </v-layout>
</template>

<script>
import image404 from '@/assets/404.png';

export default {
  data() {
    return {
      image404,
    };
  },
};
</script>