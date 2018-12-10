<template>
  <div>
    <v-card hover v-if="pet" @click.native="clickCard()" class="truncate">
      <v-responsive>
        <v-img :src="pet.fotos[0] | preventNoPhoto" aspect-ratio="1.5" id="photo">
          <div :class="statusClasses">
            {{pet.status | statusText}}
          </div>
          <v-layout
            align-center
            fill-height
            justify-center
            v-if="loading"
            class="primary display-3 loading white--text ma-0 pa-0"
          >
            <v-progress-circular indeterminate size="75">
            </v-progress-circular>
          </v-layout>
          <v-layout
            align-end
            class="mx-1 my-0"
            fill-height
            row
          >
            <v-tooltip color="primary" top>
              <v-chip
                class="elevation-2 ma-0 subheading"
                color="primary"
                slot="activator"
                text-color="white"
                v-if="pet.distancia"
              >
                <v-avatar class="mr-0">
                  <v-icon>mdi-map-marker</v-icon>
                </v-avatar>
                <span id="distance-text">
                  {{pet.distancia}} km
                </span>
              </v-chip>
              <span>Distância</span>
            </v-tooltip>
            <v-spacer />
            <v-layout row align-center justify-end class="pb-1">
              <v-tooltip color="green" top>
                <v-avatar
                  class="elevation-2"
                  color="green"
                  size="24"
                  slot="activator"
                  @click.stop=""
                >
                  <v-icon dark id="small" >{{pet.porte | sizeIcon}}</v-icon>
                </v-avatar>
                <span id="size-text">Porte {{pet.porte | sizeText}}</span>
              </v-tooltip>
              <v-tooltip :color="genderColor" top>
                <v-avatar
                  :color="genderColor"
                  class="elevation-2 ma-1"
                  size="36"
                  slot="activator"
                  @click.stop=""
                >
                  <v-icon dark>{{pet.sexo | genderIcon}}</v-icon>
                </v-avatar>
                <span id="sex-text">{{pet.sexo | genderText | capitalize}}</span>
              </v-tooltip>
            </v-layout>
          </v-layout>
        </v-img>
      </v-responsive>
      <v-card-title class="headline pa-2 pb-0" id="name">
        {{pet.nome}}
      </v-card-title>
      <v-card-text class="body-1 px-2 pt-0 text-xs-justify" id="description">
        {{pet.descricao | max100}}
      </v-card-text>
    </v-card>
    <pet-detail-dialog ref="dialog" />
  </div>
</template>

<script>
import PetDetailDialog from '@/components/PetDetailDialog.vue';
import noPhoto from '@/assets/noPhoto.jpg';
import Pets from '@/services/pets';

export default {
  name: 'PetCard',
  props: {
    pet: {
      type: Object,
      required: true,
    },
  },
  components: {
    PetDetailDialog,
  },
  data() {
    return {
      loading: false,
    };
  },
  filters: {
    preventNoPhoto(value) {
      if (!value) {
        return noPhoto;
      }

      return `data:image/png;base64,${value}`;
    },
    max100(value) {
      if (!value) {
        return noPhoto;
      }

      return value.length > 100 ? `${value.slice(0, 100)}...` : value;
    },
  },
  computed: {
    genderColor() {
      if (this.pet.sexo === 'MACHO') {
        return 'blue';
      } else if (this.pet.sexo === 'FEMEA') {
        return 'pink';
      }

      return 'grey';
    },
    statusClasses() {
      return {
        'elevation-1': true,
        'pet-status': true,
        'red lighten-1': this.pet.status === 'PROCURANDO_PET',
        green: this.pet.status === 'PROCURANDO_DONO',
        blue: this.pet.status === 'PARA_ADOTAR',
      };
    },
  },
  methods: {
    clickCard() {
      this.loading = true;
      Pets.getById(this.pet.id).then((response) => {
        this.$refs.dialog.openDialog(response.data);
      }).catch(() => {
        this.$toast.error('Algum problema ocorreu, tente novamente');
      }).finally(() => {
        this.loading = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.loading {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .8;
  position: absolute;
  width: 100%;
  z-index: 1;
}

  .pet-status {
    position: absolute;
    right: -37px;
    text-align: center;
    top: -18px;
    transform-origin: 0;
    transform: rotateZ(45deg);
    width: 100px;
    z-index: 1;
    opacity: .7;
  }
</style>

