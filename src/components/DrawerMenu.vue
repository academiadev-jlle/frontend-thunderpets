<template>
  <v-list class="pt-0">
    <v-list-tile class="primary drawer-header">
      <v-list-tile-action>
        <v-btn icon @click="$emit('close-drawer')">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title class="headline drawer-title">
          ThunderPets
        </v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
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
};
</script>

<style lang="scss" scoped>
  .drawer-header {
    height: 50px;
  }

  .drawer-title {
    align-items: center;
    display: flex;
    height: 50px;
  }
</style>

