<template>
  <div>
    <v-tabs
      centered
      class="main-tabs"
      color="primary"
      grow
      slider-color="secondary"
      slot="extension"
      v-model="model"
    >
      <v-tab href="#tab-1">
        Achados
      </v-tab>
      <v-tab href="#tab-2">
        Perdidos
      </v-tab>
      <v-tab href="#tab-3">
        Adoção
      </v-tab>
    </v-tabs>
    <v-container fluid grid-list-md>
      <v-tabs-items v-model="model">
        <v-tab-item
          :key="i"
          :value="`tab-${i}`"
          v-for="i in 3"
        >
          <pet-list class="mt-5"/>
        </v-tab-item>
      </v-tabs-items>
    </v-container>
  </div>
</template>

<script>
import PetList from '../components/PetList.vue';

export default {
  name: 'Home',
  components: {
    PetList,
  },
  data() {
    return {
      model: 'tab-2',
    };
  },
};
</script>

<style lang="scss" scoped>
  .main-tabs {
    position: fixed;
    z-index: 2;
    width: 100%;
  }
</style>
