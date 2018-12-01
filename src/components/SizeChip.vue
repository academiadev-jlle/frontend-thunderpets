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
};
</script>

