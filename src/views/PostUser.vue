<template>
  <v-container fluid grid-list-md>
    <v-card>
      <v-layout row wrap justify-center>
        <v-flex xs12 md6>
          <v-form refs="form">
            <v-card-text>
              <p class="display-1">Cadastro de Usuário</p>
              <v-text-field
                :error-messages="errors.collect('name')"
                data-vv-as="nome"
                data-vv-name="name"
                label="Nome completo"
                placeholder="Digite seu nome completo"
                v-model="name"
                v-validate="'required|min:3'"
              ></v-text-field>
              <v-text-field
                :error-messages="errors.collect('email')"
                data-vv-as="email"
                data-vv-name="email"
                label="E-mail"
                placeholder="Digite seu e-mail"
                v-model="email"
                v-validate="'required|email'"
              ></v-text-field>
              <v-text-field
                :error-messages="errors.collect('password')"
                data-vv-as="senha"
                data-vv-name="password"
                label="Senha"
                placeholder="Digite sua senha"
                type="password"
                v-model="password"
                v-validate="'required|min:8'"
              ></v-text-field>
              <v-text-field
                :error-messages="errors.collect('confirmPassword')"
                data-vv-as="confirmação de senha"
                data-vv-name="confirmPassword"
                label="Confirmação de senha"
                placeholder="Digite sua senha novamente"
                type="password"
                v-model="confirmPassword"
                v-validate="{ is: password, required: true }"
              ></v-text-field>
            </v-card-text>
          </v-form>
        </v-flex>
        <v-flex xs12 md6>
          <v-card-text>
            <p class="display-1">Contatos do Usuário</p>
            <v-layout row wrap>
              <v-flex xs12 md4>
                <v-select
                  :items="types"
                  label="Tipo de Contato"
                  placeholder="Selecione o tipo de contato"
                  v-model="contacts.type"
                ></v-select>
              </v-flex>
              <v-flex xs12 md4>
                <v-text-field
                  label="Contato"
                  placeholder="Digite aqui seu contato"
                  v-model="contacts.description"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md4>
                <v-btn
                  color="success"
                  @click="addRow"
                >
                  Adicionar
                </v-btn>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3>
                <v-card>
                  <v-toolbar color="primary">
                    <v-toolbar-title>Seus contatos</v-toolbar-title>
                    <v-spacer></v-spacer>
                  </v-toolbar>
                  <v-list two-line>
                    <template v-for="contact in contacts">
                      <v-list-tile
                        :key="contact.name"
                      >
                        <v-list-tile-content>
                          <v-list-tile-title default>
                            {{ contact.type }}</v-list-tile-title>
                          <v-list-tile-sub-title
                            class="text--primary"
                          >
                            {{ contact.description }}
                          </v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-btn
                          flat
                          icon color="red lighten-2"
                          @click="deleteRow"
                        >
                          <v-icon>delete</v-icon>
                        </v-btn>
                      </v-list-tile>
                    </template>
                  </v-list>
                </v-card>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-flex>
      </v-layout>
      <v-card-actions>
        <v-btn
          color="info"
          @click="submit"
          block
        >
          Criar conta
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'PostUser',
  data() {
    return {
      confirmPassword: null,
      email: null,
      name: null,
      password: null,
      contacts: [],
      types: ['Email', 'Telefone'],
    };
  },
  methods: {
    submit() {
      this.$validator.validateAll();
    },
    addRow() {
      this.contacts.push({
        description: this.contacts.description,
        type: this.contacts.type,
      });
      this.contacts.description= "";
    },
    deleteRow() {
      this.contacts.splice(this.index, 1);
    },
  },
};
</script>
