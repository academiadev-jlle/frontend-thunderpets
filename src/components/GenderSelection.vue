<template>
  <div>
    <v-layout row>
      <v-btn color="blue" icon round :flat="gender!==1" @click="change(1)" dark>
        <v-icon>mdi-gender-male</v-icon>
      </v-btn>
      <v-btn color="pink" icon round :flat="gender!==2" @click="change(2)" dark>
        <v-icon>mdi-gender-female</v-icon>
      </v-btn>
      <v-btn color="grey" icon round :flat="gender!==3" @click="change(3)" dark>
        <v-icon>mdi-help</v-icon>
      </v-btn>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: 'ImageUpload',
  data() {
    return {
      gender: 1,
    };
  },
  methods: {
    change(newValue) {
      this.gender = newValue;

      this.$emit('get-gender', this.gender);
    },
  },
};
</script>

<style lang="scss" scoped>
  #file {
    display: none;
  }
</style>
