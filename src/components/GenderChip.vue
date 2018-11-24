<template>
  <v-chip class="body-1" color="pink" text-color="white" v-if="value=='FEMEA'">
    <v-avatar color="pink darken-3">
      <v-icon>mdi-gender-female</v-icon>
    </v-avatar>
    {{value | petGender | capitalize}}
  </v-chip>
  <v-chip class="body-1" color="blue" text-color="white" v-else-if="value=='MACHO'">
    <v-avatar color="blue darken-3">
      <v-icon>mdi-gender-male</v-icon>
    </v-avatar>
    {{value | petGender | capitalize}}
  </v-chip>
  <v-chip class="body-1" color="grey" text-color="white" v-else>
    <v-avatar color="grey darken-3">
      <v-icon>mdi-help</v-icon>
    </v-avatar>
    {{value | petGender | capitalize}}
  </v-chip>
</template>

<script>
export default {
  name: 'GenderChip',
  props: {
    value: String,
  },
  filters: {
    petGender(value) {
      if (!value) return '';

      return value === 'FEMEA' ? 'fêmea' : value.toLowerCase();
    },
    capitalize(value) {
      if (!value) return '';

      return value.charAt(0).toUpperCase() + value.slice(1, value.length).toLowerCase();
    },
  },
};
</script>

