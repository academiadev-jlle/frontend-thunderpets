<template>
  <v-list>
    <v-list-tile v-for="(contact, index) in value" :key="index">
      <v-icon class="mr-3">
        {{contact.tipo | contactIcon}}
      </v-icon>
      {{contact.descricao}}
    </v-list-tile>
  </v-list>
</template>

<script>
export default {
  name: 'ContactInfo',
  props: {
    value: {
      type: Array,
    },
  },
  filters: {
    contactIcon(value) {
      if (value === 'TELEFONE') return 'mdi-phone';
      if (value === 'CELULAR') return 'mdi-cellphone';
      if (value === 'EMAIL') return 'mdi-email';
      if (value === 'REDE_SOCIAL') return 'mdi-at';

      return '';
    },
  },
};
</script>
