<template>
  <v-app>
    <v-toolbar app color="#764737" dark>
      <v-toolbar-side-icon>
      </v-toolbar-side-icon>
      <v-toolbar-title class="headline" style="margin-right: 20px">
        <span>ThunderPets</span>
      </v-toolbar-title>
      <v-toolbar-items>
        <v-btn flat to="/" exact>
          Inicial
        </v-btn>
        <v-btn flat to="/post" exact>
          Cadastrar
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
