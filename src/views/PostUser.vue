<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap justify-center>
      <v-flex xs12 md6>
        <v-card>
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
            <v-card-actions>
              <v-btn 
                color="info" 
                @click="submit"
                block
              >
                Criar conta
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
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
    };
  },
  methods: {
    submit() {
      this.$validator.validateAll();
    },
  },
};

</script>
