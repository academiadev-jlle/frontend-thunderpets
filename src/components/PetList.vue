<template>
  <v-data-iterator
    :items="computedPets"
    :rows-per-page-items="rowsPerPageItems"
    :pagination.sync="pagination"
    rows-per-page-text="Itens por página"
    content-tag="v-layout"
    row
    wrap
  >
    <v-flex
      slot="item"
      slot-scope="props"
      xs12
      sm6
      md4
      lg3
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
      rowsPerPageItems: [6, 12, 18],
      pagination: {
        rowsPerPage: 6,
      },
      petPhotos: [
        'https://abrilsuperinteressante.files.wordpress.com/2016/03/cachorro.png',
        'https://parade.com/wp-content/uploads/2014/02/labrador-america-top-dog-breed-ftr.jpg',
        'https://images.theconversation.com/files/205966/original/file-20180212-58348-7huv6f.jpeg?ixlib=rb-1.1.0&q=45&auto=format&w=926&fit=clip',
        'https://dynaimage.cdn.cnn.com/cnn/w_768,h_1024,c_scale/https%3A%2F%2Fdynaimage.cdn.cnn.com%2Fcnn%2Fx_1229%2Cy_0%2Cw_2712%2Ch_3616%2Cc_crop%2Fhttps%253A%252F%252Fstamp.static.cnn.io%252F5b7ac48b4db3d70020c01c13%252Fshutterstock_1081879181.jpg',
        'https://image.shutterstock.com/image-photo/stray-dog-alone-life-waiting-260nw-570595141.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc7Sxa15Wae16XTuCwF5i7mgzCuXrwMedYgmTskbgbEUUKSq__',
        'https://www.ynetnews.com/PicServer5/2018/01/04/8260052/826003601001195640360no.jpg',
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
    computedPets() {
      return [...Array(200).keys()].map(number => ({
        nome: `Pet ${number}`,
        sexo: this.petSexes[Math.floor(Math.random() * this.petSexes.length)],
        porte: this.petSizes[Math.floor(Math.random() * this.petSizes.length)],
        foto: this.petPhotos[Math.floor(Math.random() * this.petPhotos.length)],
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nec ligula eget mauris ultricies elementum nec consectetur libero. Donec condimentum.',
        distancia: number,
      }));
    },
  },
};
</script>

