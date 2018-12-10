<template>
  <v-list v-if="value && value.length > 0">
    <v-list-tile v-for="(contact, index) in value" :key="index">
      <v-icon class="mr-3">
        {{contact.tipo | contactIcon}}
      </v-icon>
      {{contact.descricao}}
    </v-list-tile>
  </v-list>
  <div class="text-xs-center headline grey--text " v-else>
    Nenhum contato cadastrado
  </div>
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
      if (value === 'TELEFONE') {
        return 'mdi-phone';
      } else if (value === 'CELULAR') {
        return 'mdi-cellphone';
      } else if (value === 'EMAIL') {
        return 'mdi-email';
      } else if (value === 'REDE_SOCIAL') {
        return 'mdi-at';
      }

      return '';
    },
  },
};
</script>
