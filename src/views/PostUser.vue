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
                data-vv-as="nome completo"
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
          <user-contacts/>
        </v-flex>
      </v-layout>
      <v-card-actions>
        <v-btn
          @click="submit"
          block
          color="info"
        >
          Criar conta
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import UserContacts from '@/components/UserContacts.vue';

export default {
  name: 'PostUser',
  components: {
    UserContacts,
  },

  data() {
    return {
      confirmPassword: null,
      email: null,
      name: null,
      password: null,
      contactType: null,
      contactDescription: null,
      contacts: [],
      types: ['Email', 'Telefone'],
    };
  },
  methods: {
    submit() {
      this.$validator.validateAll();
    },
    addRow() {
      if (this.contacts.length < 5) {
        this.$validator.validateAll('contact').then((result) => {
          if (result) {
            this.contacts.push({
              description: this.contactDescription,
              type: this.contactType,
            });
            this.contactDescription = null;
            this.$validator.reset('contact');
          }
        });
      }
    },
    deleteRow() {
      this.contacts.splice(this.index, 1);
    },
  },
  computed: {
    sizeType() {
      if (this.contactType === 'Telefone') {
        return 15;
      }

      return null;
    },
    maskType() {
      if (this.contactType === 'Telefone') {
        return '(##)# ####-####';
      }

      return '';
    },
  },
};
</script>
