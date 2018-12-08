<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap justify-center>
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
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Elit ullamcorper dignissim cras tincidunt. Bibendum enim facilisis gravida neque.
          Sagittis eu volutpat odio facilisis mauris sit amet massa. Auctor augue mauris
          augue neque gravida in fermentum. Blandit massa enim nec dui nunc mattis.
        </p>
      </v-flex>
      <v-flex xs12 md6>
        <p class="display-1">
          Procurando um animalzinho?
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

