<template>
  <v-container fluid grid-list-md v-if="!preLoad">
    <v-card>
      <v-layout row wrap justify-center>
        <v-flex xs12 md6>
          <v-form refs="form">
            <v-card-text>
              <p class="display-1">Dados</p>
              <v-text-field
                :error-messages="errors.collect('name')"
                data-vv-as="nome"
                data-vv-name="name"
                label="Nome"
                placeholder="Digite seu nome completo"
                v-model="user.nome"
                v-validate="'required|min:3'"
              ></v-text-field>
              <v-text-field
                label="E-mail"
                placeholder="Digite seu e-mail"
                v-model="user.email"
                readonly
              ></v-text-field>
              <v-text-field
                :error-messages="errors.collect('password')"
                data-vv-as="senha"
                data-vv-name="password"
                label="Senha"
                placeholder="Digite sua senha"
                type="password"
                v-model="user.senha"
                v-validate="'min:8'"
                hint="Matenha o campo vazio para manter sua senha inalterada"
                persistent-hint
              ></v-text-field>
              <v-text-field
                :error-messages="errors.collect('confirmPassword')"
                data-vv-as="confirmação de senha"
                data-vv-name="confirmPassword"
                label="Confirmação de senha"
                placeholder="Digite sua senha novamente"
                type="password"
                v-model="user.confirmPassword"
                v-validate="{ is: user.senha }"
              ></v-text-field>
              <div class="mt-1">
                <label class="caption label">Fotos</label>
                <image-upload v-model="user.foto" :max="1"/>
              </div>
            </v-card-text>
          </v-form>
        </v-flex>
        <v-flex xs12 md6>
          <v-card-text>
          <form data-vv-scope="contact">
            <p class="display-1">Contatos</p>
              <v-layout row wrap>
                <v-flex xs12 sm5>
                  <v-select
                    :error-messages="errors.collect('contact.contactType')"
                    :items="domains.contacts"
                    data-vv-as="tipo de contato"
                    data-vv-name="contactType"
                    label="Tipo de contato"
                    clearable
                    placeholder="Selecione o tipo de contato"
                    type="type"
                    v-model="contactType"
                    v-validate="'required'"
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm4>
                  <v-text-field
                    :error-messages="errors.collect('contact.contactDescription')"
                    :mask="maskType"
                    data-vv-as="contato"
                    data-vv-name="contactDescription"
                    label="Contato"
                    placeholder="Digite aqui seu contato"
                    return-masked-value
                    type="contactDescription"
                    v-model="contactDescription"
                    v-validate="{ required: true, email: (contactType === 'Email'), min: sizeType}"
                  ></v-text-field>
                </v-flex>
                <v-btn
                  color="success"
                  @click="addRow"
                  block
                >
                  <v-icon left>
                    mdi-plus
                  </v-icon>
                  Adicionar
                </v-btn>
              </v-layout>
            <v-layout row justify-center>
              <v-flex xs12>
                <v-card>
                  <v-toolbar color="primary">
                    <v-toolbar-title>
                      Contatos
                    </v-toolbar-title>
                    <v-spacer />
                    <v-toolbar-title>
                      (máx 5)
                    </v-toolbar-title>
                  </v-toolbar>
                  <v-card-text>
                    <v-list two-line v-if="user.contatos && user.contatos.length > 0">
                      <template v-for="contact in user.contatos">
                        <v-list-tile :key="contact.name">
                          <v-list-tile-content>
                            <v-list-tile-title>
                              {{ contact.tipo }}
                            </v-list-tile-title>
                            <v-list-tile-sub-title
                              class="text--primary"
                            >
                              {{ contact.descricao }}
                            </v-list-tile-sub-title>
                          </v-list-tile-content>
                          <v-btn
                            @click="deleteRow"
                            flat
                            icon color="red lighten-2"
                          >
                            <v-icon>delete</v-icon>
                          </v-btn>
                        </v-list-tile>
                      </template>
                    </v-list>
                    <div v-else class="text-xs-center headline grey--text ">
                      Nenhum contato cadastrado
                    </div>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </form>
          </v-card-text>
        </v-flex>
      </v-layout>
      <v-card-actions>
        <v-btn
          @click="submit"
          block
          color="info"
        >
          Salvar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import UserContacts from '@/components/UserContacts.vue';
import ImageUpload from '@/components/ImageUpload.vue';
import domains from '@/domains';
import Users from '@/services/users';
import Auth from '@/services/auth';

export default {
  name: 'PostUser',
  components: {
    UserContacts,
    ImageUpload,
  },
  data() {
    return {
      domains,
      confirmPassword: null,
      contactType: null,
      contactDescription: null,
      preLoad: true,
      user: {
        confirmPassword: null,
        contatos: [],
        email: null,
        foto: [],
        id: null,
        nome: null,
        senha: null,
      },
    };
  },
  created() {
    Auth.whoAmI(localStorage.getItem('token'))
      .then(response => Users.getById(response.data.id))
      .then((response) => {
        this.user = {
          confirmPassword: null,
          contatos: response.data.contatos,
          email: response.data.email,
          foto: response.data.foto ? [response.data.foto] : [],
          id: response.data.id,
          nome: response.data.nome,
          senha: null,
        };
        this.preLoad = false;
      }).catch(() => {
        this.$router.push({ name: 'search' });
        this.$toast.error('Você precisa estar logado para acessar essa página');
        localStorage.removeItem('token');
        this.$store.commit('logout');
      });
  },
  computed: {
    loggedIn() {
      return this.$store.state.loggedIn;
    },
    sizeType() {
      if (this.contactType === 'TELEFONE') {
        return 14;
      } else if (this.contactType === 'CELULAR') {
        return 15;
      }

      return null;
    },
    maskType() {
      if (this.contactType === 'CELULAR') {
        return '(##)# ####-####';
      } else if (this.contactType === 'TELEFONE') {
        return '(##) ####-####';
      }

      return '';
    },
  },
  methods: {
    setUser(user) {
      this.user = user;
    },
    submit() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          Users.edit({
            contatos: this.user.contatos,
            email: this.user.email,
            id: this.user.id,
            foto: this.user.foto.length > 0 ? this.user.foto[0] : null,
            nome: this.user.nome,
            senha: this.user.senha,
          }).then((response) => {
            this.$toast.success('Suas informações foram alteradas com sucesso!');
            this.$store.commit('login', response.data);
            this.$router.push({ name: 'User' });
          }).catch(() => {
            this.$toast.error('Um erro de comunicação com o servidor ocorreu. Tente novamente mais tarde.');
          });
        }
      });
    },
    addRow() {
      if (this.user.contatos.length < 5) {
        this.$validator.validateAll('contact').then((result) => {
          if (result) {
            this.user.contatos.push({
              descricao: this.contactDescription,
              tipo: this.contactType,
            });
            this.contactDescription = null;
            this.$validator.reset('contact');
          }
        });
      }
    },
    deleteRow() {
      this.user.contatos.splice(this.index, 1);
    },
  },
  watch: {
    loggedIn(value) {
      if (!value) {
        this.$router.push({ name: 'home' });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .label {
    color: rgba(0,0,0,0.54);
  }
</style>
