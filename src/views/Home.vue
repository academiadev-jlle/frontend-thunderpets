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
        <v-tab-item value="tab-1">
          <pet-list class="mt-5" status="PROCURANDO_DONO"/>
        </v-tab-item>
        <v-tab-item value="tab-2">
          <pet-list class="mt-5" status="PROCURANDO_PET"/>
        </v-tab-item>
        <v-tab-item value="tab-3">
          <pet-list class="mt-5" status="PARA_ADOTAR"/>
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
