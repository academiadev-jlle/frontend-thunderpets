<template>
  <div v-infinite-scroll="loadMore" infinite-scroll-distance="1000">
    <div v-if="pets && !loading">
      <v-data-iterator
        :items="pets"
        content-tag="v-layout"
        align-center
        justify-center
        hide-actions
        row
        v-if="pets"
        wrap
      >
        <v-flex
          slot-scope="props"
          slot="item"
          class="ma-2"
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
        class="mt-5 mb-4 text-xs-center"
        column
        v-if="busy || empty"
      >
        <v-progress-circular
          color="primary"
          indeterminate
          size="60"
          v-if="busy"
        />
        <span v-if="empty">Felizmente, não possuímos mais pets precisando de ajuda.</span>
      </v-layout>
    </div>
    <v-layout
      align-center
      column
      justify-center
      v-else
    >
      <div v-if="loading" class="text-xs-center mt-5">
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
    status: {
      type: String,
    },
  },
  components: {
    PetCard,
  },
  data() {
    return {
      busy: false,
      filters: {
        paginaAtual: 0,
      },
      empty: false,
      pets: null,
      loading: true,
    };
  },
  methods: {
    loadMore() {
      if (this.pets && !this.busy && !this.empty && !this.loading) {
        this.busy = true;
        Pets.get(this.filters).then((response) => {
          if (response.data.empty) {
            this.empty = true;
          } else {
            this.pets = this.pets.concat(response.data.content);
            this.filters.paginaAtual += 1;
          }
        }).finally(() => {
          this.busy = false;
        });
      }
    },
    filter(filters) {
      this.filters = filters;
      this.filters.paginaAtual = 0;
      this.loading = true;
      this.empty = false;
      this.busy = true;

      Pets.get(this.filters).then((response) => {
        this.pets = response.data.content;
        this.filters.paginaAtual = 1;
      }).finally(() => {
        this.loading = false;
        this.busy = false;
      });
    },
  },
};
</script>

