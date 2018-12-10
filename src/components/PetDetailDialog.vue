<template>
  <v-dialog
    v-model="dialog"
    :fullscreen="isXS"
    transition="scale-transition"
    v-if="pet"
  >
    <v-card>
      <v-toolbar color="primary">
        <v-btn flat icon @click="dialog = false" v-if="isXS">
          <v-icon>
            mdi-arrow-left
          </v-icon>
        </v-btn>
        <v-toolbar-title>
          {{pet.nome}}
        </v-toolbar-title>
        <v-spacer />
        <v-btn flat icon @click="dialog = false" v-if="!isXS">
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
      </v-toolbar>
      <pet-detail-component v-if="pet && dialog" :pet="pet" />
    </v-card>
  </v-dialog>
</template>

<script>
import PetDetailComponent from '@/components/PetDetailComponent.vue';

export default {
  components: {
    PetDetailComponent,
  },
  data() {
    return {
      dialog: false,
      pet: null,
    };
  },
  computed: {
    isXS() {
      return this.$vuetify.breakpoint.xsOnly;
    },
  },
  methods: {
    openDialog(pet) {
      this.pet = pet;
      this.dialog = true;
    },
  },
};
</script>
