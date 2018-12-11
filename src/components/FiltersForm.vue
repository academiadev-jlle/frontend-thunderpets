<template>
  <div>
    <v-text-field
      clearable
      label="Nome"
      v-model="filters.nome"
    >
    </v-text-field>
    <v-layout row>
      <v-flex xs12 md6>
        <v-select
          :items="domains.age"
          clearable
          label="Idade"
          v-model="filters.idade"
        ></v-select>
      </v-flex>
      <v-flex xs12 md6>
        <v-select
          :items="domains.size"
          clearable
          label="Porte"
          v-model="filters.porte"
        ></v-select>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 md6>
        <v-select
          :items="domains.specie"
          clearable
          label="Espécie"
          v-model="filters.especie"
        ></v-select>
      </v-flex>
      <v-flex xs12 md6>
        <label class="caption label">Sexo</label>
        <gender-selection
          clearable
          v-model="filters.sexo"
        />
      </v-flex>
    </v-layout>
    <v-switch
      color="primary"
      label="Usar localização"
      v-model="filters.useLocation"
      @change="handleLocation"
    ></v-switch>
    <v-layout row wrap>
      <v-flex xs12 sm10>
        <v-slider
          :disabled="!filters.useLocation"
          class="mb-0"
          label="Distância de você"
          v-model="filters.raioDistancia"
        ></v-slider>
      </v-flex>
      <v-flex xs12 sm2>
        <v-text-field
          :disabled="!filters.useLocation"
          class="pt-0"
          max="100"
          min="0"
          suffix="km"
          type="number"
          v-model="filters.raioDistancia"
        >
        </v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 md6>
        <v-select
          :disabled="filters.useLocation"
          :items="domains.state"
          clearable
          label="Estado"
          v-model="filters.estado"
        ></v-select>
      </v-flex>
      <v-flex xs12 md6>
        <v-text-field
          :disabled="filters.useLocation"
          clearable
          label="Cidade"
          v-model="filters.cidade"
        >
        </v-text-field>
      </v-flex>
    </v-layout>
    <v-btn block color="info" @click="search">
      <v-icon left>
        mdi-magnify
      </v-icon>
      Buscar
    </v-btn>
  </div>
</template>

<script>
import domains from '@/domains';
import GenderSelection from '@/components/GenderSelection.vue';

export default {
  name: 'FiltersForm',
  components: {
    GenderSelection,
  },
  data() {
    return {
      domains,
      filters: {
        status: 'PROCURANDO_DONO',
        raioDistancia: 1,
      },
    };
  },
  methods: {
    search() {
      this.$store.commit('updateFilters', this.filters);
      this.$router.push({ name: 'search' });
    },
    handleLocation() {
      if (this.filters.useLocation) {
        this.filters.useLocation = false;
        navigator.geolocation.getCurrentPosition((position) => {
          this.filters.latitudeUsuario = position.coords.latitude;
          this.filters.longitudeUsuario = position.coords.longitude;
          this.filters.useLocation = true;
        }, () => {
          this.$toast.error('Para utilizar a busca por distância, habilite seu GPS.');
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .label {
    color: rgba(0,0,0,0.54);
  }
</style>
