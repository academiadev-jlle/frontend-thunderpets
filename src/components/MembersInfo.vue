<template>
  <ul style="list-style-type:none">
    <v-layout justify-center>
      <v-flex
        xs12
        md2
        v-for="membro in membros"
        :key="membro.nome"
      >
        <a
          :href="membro.github"
          class="black--text"
          style="text-decoration: none"
        >
          {{ membro.nome }}
        </a>
      </v-flex>
    </v-layout>
  </ul>
</template>

<script>
export default {
  name: 'MembersInfo',
  data() {
    return {
      membros: [
        {
          nome: 'Adam Mews',
          github: 'https://github.com/LiserLine',
        },
        {
          nome: 'Diogo Antelo',
          github: 'https://github.com/diogoantelo',
        },
        {
          nome: 'Helena Dalmazo',
          github: 'https://github.com/nefasta',
        },
        {
          nome: 'Luiz Gustavo Eburneo',
          github: 'https://github.com/Botuca',
        },
        {
          nome: 'Ramon Artner',
          github: 'https://github.com/rartner',
        },
      ],
    };
  },
};
</script>

