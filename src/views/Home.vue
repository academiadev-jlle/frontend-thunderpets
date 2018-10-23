<template>
  <v-container>
    <v-layout text-xs-center>
      <v-flex xs12>
        <v-img
          class="my-3"
          contain
          height="200"
          :src="require('../assets/logo.png')"
        ></v-img>
        <p class="display-2">ThunderPets</p>
        <p class="headline">
          Porque quando perdemos um animalzinho, perdemos um pedaço de nós mesmos.
        </p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

export default {
  name: 'Home',
};
</script>
