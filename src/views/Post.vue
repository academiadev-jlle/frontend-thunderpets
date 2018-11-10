<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap justify-center>
      <v-flex xs12 md6>
        <v-card>
          <v-form refs="form">
            <v-card-text>
              <p class="display-1">
                Dados do animal
              </p>
              <v-select
                :error-messages="errors.collect('category')"
                :items="domains.category"
                data-vv-as="categoria"
                data-vv-name="category"
                label="Categoria"
                placeholder="Selecione a categoria do pet"
                v-model="pet.categoria"
                v-validate="'required'"
              ></v-select>
              <v-layout row wrap>
                <v-flex xs12 sm6>
                  <v-select
                    :error-messages="errors.collect('specie')"
                    :items="domains.specie"
                    data-vv-as="espécie"
                    data-vv-name="specie"
                    label="Espécie"
                    placeholder="Selecione a espécie de animal"
                    v-model="pet.especie"
                    v-validate="'required'"
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-select
                    :error-messages="errors.collect('size')"
                    :items="domains.size"
                    data-vv-as="porte"
                    data-vv-name="size"
                    label="Porte"
                    placeholder="Selecione o porte do animal"
                    v-model="pet.porte"
                    v-validate="'required'"
                  ></v-select>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 sm6>
                  <v-select
                    :error-messages="errors.collect('age')"
                    :items="domains.age"
                    data-vv-as="idade"
                    data-vv-name="age"
                    label="Idade"
                    placeholder="Selecione a idade do animal"
                    v-model="pet.idade"
                    v-validate="'required'"
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6>
                  <div>
                    <label class="caption label">Sexo</label>
                    <gender-selection v-model="pet.sexo"/>
                  </div>
                </v-flex>
              </v-layout>
              <v-layout row v-if="pet.categoria != 'ADOCAO'" wrap>
                <v-flex xs12 sm6>
                  <v-text-field
                    :counter="20"
                    :error-messages="errors.collect('name')"
                    data-vv-as="nome"
                    data-vv-name="name"
                    label="Nome"
                    placeholder="Nome do animal"
                    v-model="pet.nome"
                    v-validate="'required|max:20'"
                    id="name"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-menu
                    :close-on-content-click="false"
                    :nudge-right="40"
                    full-width
                    lazy
                    min-width="290px"
                    offset-y
                    transition="scale-transition"
                    v-model="datePicker"
                  >
                    <v-text-field
                      :error-messages="errors.collect('date')"
                      data-vv-as="data"
                      data-vv-name="date"
                      label="Data"
                      placeholder="Informe a data"
                      prepend-icon="event"
                      readonly
                      slot="activator"
                      v-model="computedDateFormatted"
                      v-validate="'required'"
                    ></v-text-field>
                    <v-date-picker
                      @input="datePicker = false"
                      locale="pt-br"
                      v-model="pet.data"
                    ></v-date-picker>
                  </v-menu>
                </v-flex>
              </v-layout>
              <v-textarea
                :counter="500"
                :error-messages="errors.collect('description')"
                data-vv-as="descrição"
                data-vv-name="description"
                label="Descrição"
                no-resize
                placeholder="Descreva o animal em poucas palavras para que possam reconhecê-lo"
                v-model="pet.descricao"
                v-validate="'required|max:500'"
              ></v-textarea>
              <div class="mt-1">
                <label class="caption label">Fotos</label>
                <image-upload
                  v-model="pet.fotos"
                />
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn color="info" @click="submit">
                Confirmar
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-flex>
      <v-flex xs12 md6 v-if="pet.categoria != 'ADOCAO'">
        <v-card>
          <v-card-text>
            <p class="display-1">
              Localização
            </p>
            <google-map v-model="pet.localizacao"/>
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
import domains from '../domains';

const USUARIO = 1;

export default {
  name: 'Post',
  components: {
    GenderSelection,
    GoogleMap,
    ImageUpload,
  },
  data() {
    return {
      domains,
      datePicker: false,
      pet: {
        categoria: null,
        data: null,
        descricao: null,
        especie: null,
        fotos: null,
        idade: null,
        localizacao: null,
        nome: null,
        porte: null,
        sexo: 'MACHO',
        usuario: USUARIO,
      },
    };
  },
  computed: {
    computedDateFormatted() {
      if (!this.pet.data) return null;

      const [year, month, day] = this.pet.data.split('-');

      return `${day}/${month}/${year}`;
    },
  },
  methods: {
    submit() {
      this.$validator.validateAll();
    },
  },
};
</script>

<style lang="scss" scoped>
  .label {
    color: rgba(0,0,0,0.54);
  }
</style>
