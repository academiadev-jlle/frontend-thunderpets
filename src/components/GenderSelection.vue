<template>
  <div>
    <v-layout row>
      <v-tooltip color="blue" top>
        <v-btn
          :flat="value !== 'MACHO'"
          @click="changeGender('MACHO')"
          color="blue"
          dark
          icon
          round
          id="male"
          slot="activator"
        >
          <v-icon>mdi-gender-male</v-icon>
        </v-btn>
        <span>Macho</span>
      </v-tooltip>
      <v-tooltip color="pink" top>
        <v-btn
          :flat="value !== 'FEMEA'"
          @click="changeGender('FEMEA')"
          color="pink"
          dark
          icon
          round
          id="female"
          slot="activator"
        >
          <v-icon>mdi-gender-female</v-icon>
        </v-btn>
        <span>Fêmea</span>
      </v-tooltip>
      <v-tooltip color="grey" top>
        <v-btn
          :flat="value !== 'INDETERMINADO'"
          @click="changeGender('INDETERMINADO')"
          color="grey"
          dark
          icon
          round
          id="undetermined"
          slot="activator"
        >
          <v-icon>mdi-help</v-icon>
        </v-btn>
        <span>Indeterminado</span>
      </v-tooltip>
      <v-spacer />
      <v-tooltip color="red" top v-if="clearable">
        <v-btn
          @click="changeGender(null)"
          color="red"
          dark
          flat
          icon
          round
          slot="activator"
        >
          <v-icon>close</v-icon>
        </v-btn>
        <span>Apagar</span>
      </v-tooltip>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: 'GenderSelection',
  props: {
    value: {
      type: String,
      default: null,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    changeGender(newValue) {
      if (this.value !== newValue) {
        this.$emit('input', newValue);
        this.$emit('change');
      }
    },
  },
};
</script>
