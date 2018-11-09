<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap justify-center>
      <v-flex xs12 md5>
        <v-card>
          <v-form refs="form">
            <v-card-text>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                  <p><span class="headline">Cadastro de Usuário</span></p>
                </v-flex>
              </v-layout>
              <v-text-field
                  label="Nome completo:"
                  placeholder="Digite seu nome completo"
              ></v-text-field>
              <v-text-field
                  label="E-mail:"
                  placeholder="Digite seu e-mail"
              ></v-text-field>
              <v-text-field
                  label="Senha:"
                  placeholder="Digite sua senha"
              ></v-text-field>
              <v-text-field
                  label="Confirmação de senha:"
                  placeholder="Digite sua senha novamente"
              ></v-text-field>
            </v-card-text>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
