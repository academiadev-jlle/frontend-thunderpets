<template>
  <v-container fluid grid-list-md>
    <v-layout align-center justify-center row wrap>
      <v-card width="400">
        <v-toolbar color="primary">
          <v-toolbar-title>Recuperação de senha</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <form data-vv-scope="recovery">
            <v-text-field
              :error-messages="errors.collect('recovery.newPassword')"
              @keyup.enter="submit"
              data-vv-as="nova senha"
              data-vv-name="newPassword"
              label="Nova senha"
              type="password"
              v-model="recovery.novaSenha"
              v-validate="'required|min:8'"
            ></v-text-field>
            <v-text-field
              :error-messages="errors.collect('recovery.confirmPassword')"
              @keyup.enter="submit"
              data-vv-as="confirmação de senha"
              data-vv-name="confirmPassword"
              label="Confirmação de senha"
              type="password"
              v-model="recovery.confirmaSenha"
              v-validate="{ is: recovery.novaSenha, required: true }"
            ></v-text-field>
          </form>
        </v-card-text>
        <v-card-actions>
          <v-btn
            :loading="loading"
            @click="submit"
            block color="primary">Redefinir senha</v-btn>
        </v-card-actions>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import Users from '@/services/users';

export default {
  name: 'PasswordRecovery',
  data() {
    return {
      id: null,
      recovery: {
        novaSenha: null,
        confirmaSenha: null,
      },
      loading: false,
    };
  },
  created() {
    this.id = this.$route.params.id;
  },
  methods: {
    submit() {
      this.$validator.validateAll('recovery').then((valid) => {
        if (valid) {
          this.loading = true;

          Users.recoverPassword(this.id, this.recovery.novaSenha)
            .then(() => {
              this.$toast.success('Senha alterada com sucesso');

              this.$router.push({ name: 'search' });
            })
            .catch(({ ...erro }) => this.$toast.error(erro.response.data.message))
            .finally(() => {
              this.loading = false;
            });
        }
      });
    },
  },
};
</script>
