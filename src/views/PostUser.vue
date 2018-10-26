<template>
  <v-container id="container">
    <v-layout row wrap>
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
                label="Nome de usuário:"
                placeholder="Insira um apelido "
            ></v-text-field>

            <v-textarea
              label="Descrição"
              no-resize
              placeholder="Descreva o animal em poucas palavras para que possam reconhecê-lo"
            ></v-textarea>

          </v-card-text>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>