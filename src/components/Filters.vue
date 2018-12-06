<template>
  <div>
    <v-navigation-drawer
      app
      clipped
      mobile-break-point="960"
      right
      v-model="drawer"
    >
      <v-list class="py-0">
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
      <div class="px-3" id="drawer-body">
        <v-select
          :items="domains.status"
          @change="updateFilters"
          clearable
          label="Categoria"
          v-model="filters.status"
        ></v-select>
        <v-text-field
          clearable
          label="Nome"
          v-debounce:1s="updateFilters"
          v-model="filters.nome"
        >
        </v-text-field>
        <v-select
          :items="domains.age"
          @change="updateFilters"
          clearable
          label="Idade"
          v-model="filters.idade"
        ></v-select>
        <v-select
          :items="domains.size"
          @change="updateFilters"
          clearable
          label="Porte"
          v-model="filters.porte"
        ></v-select>
        <v-select
          :items="domains.specie"
          @change="updateFilters"
          clearable
          label="Espécie"
          v-model="filters.especie"
        ></v-select>
        <label class="caption label">Sexo</label>
        <gender-selection
          @change="updateFilters"
          clearable
          v-model="filters.sexo"
        />
        <v-switch
          label="Usar localização"
          v-model="filters.useLocation"
          color="primary"
          @change="handleLocation"
        ></v-switch>
        <v-slider
          label="Distância de você"
          v-model="filters.raioDistancia"
          @change="updateFilters"
          :disabled="!filters.useLocation"
          class="mb-0"
        ></v-slider>
        <v-text-field
        class="pt-0"
          type="number"
          max="100"
          min="0"
          v-model="filters.raioDistancia"
          :disabled="!filters.useLocation"
          suffix="km"
        >
        </v-text-field>
        <v-select
          :disabled="filters.useLocation"
          :items="domains.state"
          @change="updateFilters"
          clearable
          label="Estado"
          v-model="filters.estado"
        ></v-select>
        <v-text-field
          :disabled="filters.useLocation"
          clearable
          label="Cidade"
          v-debounce:1s="updateFilters"
          v-model="filters.cidade"
        >
        </v-text-field>
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
      location: null,
      filters: null,
    };
  },
  created() {
    this.filters = this.value;
  },
  computed: {
    isSmAndDown() {
      return this.$vuetify.breakpoint.smAndDown;
    },
  },
  methods: {
    updateFilters() {
      const filters = {
        cidade: this.filters.useLocation ? null : this.filters.cidade,
        estado: this.filters.useLocation ? null : this.filters.estado,
        especie: this.filters.especie,
        porte: this.filters.porte,
        sexo: this.filters.sexo,
        nome: this.filters.nome,
        status: this.filters.status,
        idade: this.filters.idade,
        latitudeUsuario: this.filters.useLocation ? this.filters.latitudeUsuario : null,
        longitudeUsuario: this.filters.useLocation ? this.filters.longitudeUsuario : null,
        raioDistancia: this.filters.useLocation ? this.filters.raioDistancia : NaN,
        useLocation: this.filters.useLocation,
      };

      this.$emit('input', filters);
      this.$emit('change');
    },
    handleLocation() {
      if (this.filters.useLocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.filters.latitudeUsuario = position.coords.latitude;
          this.filters.longitudeUsuario = position.coords.longitude;

          this.updateFilters();
        });
      } else {
        this.updateFilters();
      }
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

  .v-navigation-drawer {
    overflow-y: hidden;

    #drawer-body {
      overflow-y: scroll;
      height: 91.6%;
    }
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
</style>

