<template>
  <v-app>
    <v-toolbar app color="#ffc107">
      <v-toolbar-title class="headline" id="toolbar-title">
        <span>ThunderPets</span>
      </v-toolbar-title>
      <v-toolbar-items>
        <v-btn flat to="/" exact>
          Inicial
        </v-btn>
        <v-btn flat to="/post" exact>
          Cadastrar Pet
        </v-btn>
        <v-btn flat to="/postUser" exact>
          Cadastrar Usuário
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
};
</script>

<style lang="scss" scoped>
  #toolbar-title {
    margin-right: 20px;
  }
</style>

