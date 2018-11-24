<template>
  <v-chip
    class="body-1"
    color="green darken-1"
    dark
    text-color="white"
  >
    <v-avatar color="green darken-3">
      <v-icon size="40">{{value | sizeIcon}}</v-icon>
    </v-avatar>
    Porte {{value | sizeText}}
  </v-chip>
</template>

<script>
export default {
  name: 'GenderChip',
  props: {
    value: String,
  },
  filters: {
    sizeText(value) {
      if (!value) return '';

      return value === 'MEDIO' ? 'médio' : value.toLowerCase();
    },
    capitalize(value) {
      if (!value) return '';

      return value.charAt(0).toUpperCase() + value.slice(1, value.length).toLowerCase();
    },
    sizeIcon(value) {
      if (value === 'PEQUENO') return 'mdi-alpha-p';
      else if (value === 'MEDIO') return 'mdi-alpha-m';

      return 'mdi-alpha-g';
    },
  },
};
</script>

