<template>
  <div>
    <v-container fluid grid-list-md>
      <pet-list/>
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
      tab: 'tab-2',
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
