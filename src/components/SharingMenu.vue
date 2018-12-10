<template>
  <v-layout>
    <social-sharing
      :quote='`Ajude a salvar ${prefixo} ${pet.nome}!`'
      :title='`Ajude a salvar ${prefixo} ${pet.nome}!`'
      :url='`https://thunderpets.herokuapp.com/pet/${pet.id}`'
      inline-template
    >
      <div>
        <network network="facebook">
          <v-btn flat color="#3c66c4" icon outline>
            <v-icon>
              mdi-facebook
            </v-icon>
          </v-btn>
        </network>
        <network network="twitter">
          <v-btn flat color="#00aced" icon outline>
            <v-icon>
              mdi-twitter
            </v-icon>
          </v-btn>
        </network>
        <network network="whatsapp">
          <v-btn flat color="#25D366" icon outline>
            <v-icon>
              mdi-whatsapp
            </v-icon>
          </v-btn>
        </network>
      </div>
    </social-sharing>
    <span>
      <v-btn flat color="grey" icon outline @click="share">
        <v-icon>
          mdi-link-variant
        </v-icon>
      </v-btn>
    </span>
  </v-layout>
</template>

<script>
import SocialSharing from 'vue-social-sharing';

export default {
  name: 'SharingMenu',
  props: {
    pet: {
      type: Object,
      required: true,
    },
  },
  components: {
    SocialSharing,
  },
  computed: {
    prefixo() {
      if (this.pet.sexo === 'FEMEA') {
        return 'a';
      }

      return 'o';
    },
  },
  methods: {
    share() {
      const auxElement = document.createElement('textarea');

      auxElement.value = `${window.location.origin}/pet/${this.pet.id}`;
      document.body.appendChild(auxElement);
      auxElement.select();
      document.execCommand('copy');
      document.body.removeChild(auxElement);

      this.$toast.success('Link copiado para área de transferência!');
    },
  },
};
</script>
