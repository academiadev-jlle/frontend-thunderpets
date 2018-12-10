<template>
  <v-layout justify-center>
    <v-flex
      xs12
      md2
      v-for="(member, index) in members"
      :key="index"
    >
      <a
        :href="member.github"
        class="black--text"
        style="text-decoration: none"
      >
        {{ member.name }}
      </a>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'MembersInfo',
  data() {
    return {
      members: [
        {
          name: 'Adam Mews',
          github: 'https://github.com/LiserLine',
        },
        {
          name: 'Diogo Antelo',
          github: 'https://github.com/diogoantelo',
        },
        {
          name: 'Helena Dalmazo',
          github: 'https://github.com/nefasta',
        },
        {
          name: 'Luiz Gustavo Eburneo',
          github: 'https://github.com/Botuca',
        },
        {
          name: 'Ramon Artner',
          github: 'https://github.com/rartner',
        },
      ],
    };
  },
};
</script>

