<template>
  <div>
    <v-data-iterator
      :items="pets"
      :pagination.sync="pagination"
      :rows-per-page-items="rowsPerPageItems"
      @update:pagination="autoScroll"
      content-tag="v-layout"
      row
      v-if="pets.length > 0"
      wrap
    >
      <v-flex
        slot-scope="props"
        slot="item"
        xs12
        sm6
        md4
        lg3
        xl2
      >
        <pet-card :pet="props.item"/>
      </v-flex>
    </v-data-iterator>
    <v-layout
      align-center
      column
      justify-center
      v-else
    >
      <v-progress-circular color="primary" indeterminate size="60"/>
      <h1 class="display-1 mt-3">
        Buscando pets
      </h1>
    </v-layout>
  </div>
</template>

<script>
import Pets from '@/services/pets';
import PetCard from './PetCard.vue';

export default {
  name: 'PetList',
  props: {
    status: String,
  },
  components: {
    Pets,
    PetCard,
  },
  data() {
    return {
      pets: [],
      loading: false,
      currentPageSize: 8,
      currentPage: 1,
      rowsPerPageItems: [8, 16, 32],
      pagination: {
        rowsPerPage: 8,
      },
    };
  },
  created() {
    this.loading = true;
    Pets.get(this.status).then((response) => {
      this.pets = response.data.content;
      this.loading = false;
    });
  },
  methods: {
    autoScroll(pagination) {
      if (pagination.rowsPerPage === this.currentPageSize && pagination.page > this.currentPage) {
        window.scroll({
          top: 0,
          behavior: 'smooth',
        });
      }

      this.currentPage = pagination.page;
      this.currentPageSize = pagination.rowsPerPage;
    },
  },
};
</script>

