<template>
  <pet-detail-component v-if="pet" :pet="pet" />
</template>

<script>
import PetDetailComponent from '@/components/PetDetailComponent.vue';
import Pets from '@/services/pets';

export default {
  name: 'PetDetail',
  components: {
    PetDetailComponent,
  },
  data() {
    return {
      pet: null,
    };
  },
  beforeRouteEnter(to, from, next) {
    Pets.getById(to.params.id)
      .then((response) => {
        next((vm) => {
          vm.setPet(response.data);
        });
      }).catch((error) => {
        if (error.response.status === 404) {
          // eslint-disable-next-line no-restricted-globals
          history.back();
        }
      });
  },
  // created() {
  //   if (!this.pet) {
  //     console.log('Meu deus', this.$route.params.id);
  //     Pets.getById(this.$route.params.id)
  //       .then((response) => {
  //         console.log('AHHHHHHHHHHHHH', response);
  //         this.pet = response.data;
  //       })
  //       .catch((error) => {
  //         if (error.response.status === 404) {
  //         // eslint-disable-next-line no-restricted-globals
  //           history.back();
  //         }
  //       });
  //   }
  // },
  methods: {
    setPet(pet) {
      this.pet = pet;
    },
  },
};
</script>
