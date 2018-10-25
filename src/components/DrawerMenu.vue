<template>
  <v-list class="pt-0">
    <v-list-tile to='/'>
      <v-list-tile-content>
        <v-list-tile-title>PRINCIPAL</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-divider />
    <v-list-tile to='/post'>
      <v-list-tile-content>
        <v-list-tile-title>CADASTRAR</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-divider />
  </v-list>
</template>

<script>
export default {
  name: 'DrawerMenu',
  data() {
    return {
      items: [
        {
          title: 'PRINCIPAL',
          route: '/',
        }, {
          title: 'CADASTRAR',
          route: '/post',
        },
      ],
    };
  },
};
</script>

