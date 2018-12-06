<template>
  <div>
    <filters v-model="filters" @change="filter"/>
    <v-container fluid grid-list-md>
      <pet-list ref="petList"/>
    </v-container>
  </div>
</template>

<script>
import PetList from '../components/PetList.vue';
import Filters from '../components/Filters.vue';

export default {
  name: 'Search',
  components: {
    PetList,
    Filters,
  },
  data() {
    return {
      filters: {
        status: null,
        nome: null,
        sexo: null,
        porte: null,
        idade: null,
        especie: null,
      },
    };
  },
  methods: {
    filter() {
      this.$refs.petList.filter(this.filters);
    },
  },
};
</script>
