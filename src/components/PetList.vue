<template>
  <div>
    <v-data-iterator
      :items="pets"
      content-tag="v-layout"
      row
      v-if="pets"
      wrap
      :total-items="1000"
      hide-actions
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
      <div v-if="loading" class="text-xs-center">
        <v-progress-circular color="primary" indeterminate size="60"/>
        <h1 class="display-1 mt-3">
          Buscando pets
        </h1>
      </div>
      <div v-else class="text-xs-center headline">
        Não foi possível se conectar com o servidor.
      </div>
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
      pets: null,
      loading: true,
      currentPageSize: 8,
      currentPage: 1,
      rowsPerPageItems: [8, 16, 32],
      pagination: {
        rowsPerPage: 8,
      },
    };
  },
  created() {
    Pets.get(this.status).then((response) => {
      this.pets = response.data.content;
      this.loading = false;
    }).catch((error) => {
      console.log(error);
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

