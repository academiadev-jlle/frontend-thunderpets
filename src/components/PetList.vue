<template>
  <v-data-iterator
    :items="pets"
    :pagination.sync="pagination"
    :rows-per-page-items="rowsPerPageItems"
    @update:pagination="autoScroll"
    content-tag="v-layout"
    row
    wrap
  >
    <v-flex
      slot-scope="props"
      slot="item"
      xs12
      sm6
      md4
      lg3
      xl2
    >
      <pet-card :pet="props.item"/>
    </v-flex>
  </v-data-iterator>
</template>

<script>
import PetCard from './PetCard.vue';

export default {
  name: 'PetList',
  components: {
    PetCard,
  },
  data() {
    return {
      currentPageSize: 8,
      rowsPerPageItems: [8, 16, 32],
      pagination: {
        rowsPerPage: 8,
      },
      petPhotos: [
        'https://abrilsuperinteressante.files.wordpress.com/2016/03/cachorro.png',
        'https://parade.com/wp-content/uploads/2014/02/labrador-america-top-dog-breed-ftr.jpg',
        'https://images.theconversation.com/files/205966/original/file-20180212-58348-7huv6f.jpeg?ixlib=rb-1.1.0&q=45&auto=format&w=926&fit=clip',
        'https://i.ytimg.com/vi/nsqsMFuo6P0/hqdefault.jpg',
        'https://image.shutterstock.com/image-photo/stray-dog-alone-life-waiting-260nw-570595141.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc7Sxa15Wae16XTuCwF5i7mgzCuXrwMedYgmTskbgbEUUKSq__',
        'https://www.ynetnews.com/PicServer5/2018/01/04/8260052/826003601001195640360no.jpg',
        'https://qph.fs.quoracdn.net/main-qimg-8695a74a1cde13ad7f62d05ee246e83b-c',
      ],
      petSexes: [
        'MACHO',
        'FEMEA',
        'INDETERMINADO',
      ],
      petSizes: [
        'PEQUENO',
        'MEDIO',
        'GRANDE',
      ],
    };
  },
  computed: {
    pets() {
      return [...Array(50).keys()].map(number => ({
        nome: `Pet ${number}`,
        sexo: this.petSexes[Math.floor(Math.random() * this.petSexes.length)],
        porte: this.petSizes[Math.floor(Math.random() * this.petSizes.length)],
        foto: this.petPhotos[Math.floor(Math.random() * this.petPhotos.length)],
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nec ligula eget mauris ultricies elementum nec consectetur libero. Donec condimentum.',
        distancia: number,
      }));
    },
  },
  methods: {
    autoScroll(pagination) {
      if (pagination.rowsPerPage === this.currentPageSize) {
        window.scroll({
          top: 0,
          behavior: 'smooth',
        });
      }

      this.currentPageSize = pagination.rowsPerPage;
    },
  },
};
</script>

