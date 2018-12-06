<template>
  <div>
    <filters v-model="filters" @filter="filter($event)"/>
    <v-container fluid grid-list-md class="pt-0" >
      <pet-list ref="petList"/>
    </v-container>
  </div>
</template>

<script>
import Filters from '../components/Filters.vue';
import PetList from '../components/PetList.vue';

export default {
  name: 'Search',
  components: {
    Filters,
    PetList,
  },
  data() {
    return {
      filters: {
        especie: null,
        idade: null,
        nome: null,
        porte: null,
        sexo: null,
        status: null,
      },
    };
  },
  methods: {
    filter(values) {
      console.log(values);
      this.$refs.petList.filter(values);
    },
  },
};
</script>
