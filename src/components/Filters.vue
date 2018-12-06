<template>
  <div>
    <v-navigation-drawer
      right
      clipped
      app
      v-model="drawer"
      mobile-break-point="960"
    >
      <v-list class="pt-0">
        <v-list-tile class="primary drawer-title">
          <v-list-tile-content>
            <v-list-tile-title class="headline">
              Filtros
            </v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn icon @click="drawer = false">
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <div class="mx-3">
        <v-select
          :items="domains.status"
          label="Categoria"
          v-model="value.status"
          @change="updateFilters"
          clearable
        ></v-select>
        <v-text-field
          label="Nome"
          v-model="value.nome"
          v-debounce:1s="updateFilters"
          clearable
        >
        </v-text-field>
        <v-select
          :items="domains.age"
          @change="updateFilters"
          clearable
          v-model="value.idade"
          label="Idade"
        ></v-select>
        <v-select
          @change="updateFilters"
          clearable
          :items="domains.size"
          v-model="value.porte"
          label="Porte"
        ></v-select>
        <v-select
          @change="updateFilters"
          clearable
          :items="domains.specie"
          v-model="value.especie"
          label="Espécie"
        ></v-select>
        <label class="caption label">Sexo</label>
        <gender-selection 
          @change="updateFilters"
          v-model="value.sexo"
        />
      </div>
    </v-navigation-drawer>
    <v-btn @click="drawer = !drawer">
      <v-icon left>
        mdi-filter
      </v-icon>
      Filtros
    </v-btn>
  </div>
</template>

<script>
import domains from '@/domains';
import GenderSelection from '@/components/GenderSelection.vue';

export default {
  name: 'Filters',
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  components: {
    GenderSelection,
  },
  data() {
    return {
      domains,
      drawer: false,
      inputDelay: false,
    };
  },
  computed: {
    isSmAndDown() {
      return this.$vuetify.breakpoint.smAndDown;
    },
  },
  methods: {
    updateFilters() {
      this.$emit('change');
    },
  },
};
</script>

<style lang="scss" scoped>
  .drawer-title {
    height: 50px;

    .v-list__tile__title {
      display: flex;
      align-items: center;
    }
  }

  .label {
    color: rgba(0,0,0,0.54);
  }
</style>

