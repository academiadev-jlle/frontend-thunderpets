<template>
  <v-chip class="body-1" :color="genderColor" text-color="white">
    <v-avatar :color="`${genderColor} darken-3`">
      <v-icon>{{value | genderIcon}}</v-icon>
    </v-avatar>
    {{value | genderText | capitalize}}
  </v-chip>
</template>

<script>
export default {
  name: 'GenderChip',
  props: {
    value: String,
  },
  computed: {
    genderColor() {
      if (this.value === 'FEMEA') return 'pink';
      else if (this.value === 'MACHO') return 'blue';

      return 'grey';
    },
  },
};
</script>

