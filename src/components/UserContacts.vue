<template>
  <v-card-text>
    <form data-vv-scope="contact">
    <p class="display-1">Contatos do Usuário</p>
      <v-layout row wrap>
        <v-flex xs12 md4>
          <v-select
            :error-messages="errors.collect('contact.contactType')"
            data-vv-as="tipo de contato"
            data-vv-name="contactType"
            :items="types"
            label="Tipo de contato"
            placeholder="Selecione o tipo de contato"
            type="type"
            v-model="contactType"
            v-validate="{ required: true }"
          ></v-select>
        </v-flex>
        <v-flex xs12 md4>
          <v-text-field
            :error-messages="errors.collect('contact.contactDescription')"
            data-vv-as="contato"
            data-vv-name="contactDescription"
            label="Contato"
            placeholder="Digite aqui seu contato"
            type="contactDescription"
            v-model="contactDescription"
            return-masked-value
            :mask="maskType"
            v-validate="{ required: true, email: (contactType === 'Email'), min: sizeType}"
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
              <v-toolbar-title>Seus contatos (máx: 5)</v-toolbar-title>
            </v-toolbar>
            <v-list two-line>
              <template v-for="contact in contacts">
                <v-list-tile :key="contact.name">
                  <v-list-tile-content>
                    <v-list-tile-title>
                      {{ contact.type }}
                    </v-list-tile-title>
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
    </form>
  </v-card-text>
</template>

<script>
export default {
  name: 'UserContacts',
  data() {
    return {
      contactType: null,
      contactDescription: null,
      contacts: [],
      types: ['Email', 'Telefone'],
    };
  },
  methods: {
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

