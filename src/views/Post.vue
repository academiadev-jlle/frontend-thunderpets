<template>
  <v-container id="container">
    <v-layout row wrap>
      <v-flex xs12 md5>
        <v-card>
          <v-form refs="form">
          <v-card-text>
            <p class="display-1">
              Perdi meu pet
            </p>
            <v-select
              :items="petTypes"
              label="Tipo"
              placeholder="Selecione o tipo de animal"
            ></v-select>
            <v-select
              :items="petPort"
              label="Porte"
              placeholder="Selecione o porte do animal"
            ></v-select>
            <div>
              <v-label>Sexo</v-label>
              <gender-selection v-on:get-gender="getGender"/>
            </div>
            <v-textarea
              label="Descrição"
              no-resize
              placeholder="Descreva o animal em poucas palavras para que possam reconhecê-lo"
            ></v-textarea>
            <v-text-field
              label="Contato"
              mask="(##) #####-####"
              placeholder="Forneça um telefone/celular para entrarem em contato"
            ></v-text-field>
            <image-upload ref="images" v-on:get-images="getImages"/>
          </v-card-text>
          <v-card-actions>
            <v-btn color="success">
              Confirmar
            </v-btn>
            <v-btn color="error">
              Cancelar
            </v-btn>
          </v-card-actions>
          </v-form>
        </v-card>
      </v-flex>
      <v-flex xs12 md6 offset-md1>
        <v-card>
          <v-card-text>
            <p class="display-1">
              Selecione onde perdeu seu pet
            </p>
            <google-map/>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import GenderSelection from '../components/GenderSelection.vue';
import GoogleMap from '../components/GoogleMap.vue';
import ImageUpload from '../components/ImageUpload.vue';
import store from '../store';

export default {
  name: 'Post',
  components: {
    GenderSelection,
    GoogleMap,
    ImageUpload,
  },
  data() {
    return {
      email: '',
      images: null,
      gender: 1,
      name: '',
      petTypes: [
        'Bovino',
        'Cão',
        'Equino',
        'Galináceo',
        'Gato',
        'Pássaro',
        'Roedor',
      ],
      petPort: [
        'Pequeno',
        'Médio',
        'Grande',
      ],
    };
  },
  computed: {
    petLocation() {
      return store.state.location;
    },
  },
  methods: {
    getImages(images) {
      this.images = images;
    },
    getGender(gender) {
      this.gender = gender;
    },
  },
};
</script>

<style lang="scss" scoped>
  #container {
    max-width: 100%;
  }
</style>
