<template>
  <v-btn
    :class="{'pr-4': !isXS}"
    :loading="loading"
    @click="submitGoogle"
    block
    color="#cf4332"
    dark
  >
    <v-icon :class="{'mr-4': !isXS}">
      mdi-google
    </v-icon>
    <span v-if="!isXS">
      Entrar com Google
    </span>
  </v-btn>
</template>

<script>
import Users from '@/services/users';
import Auth from '@/services/auth';

export default {
  name: 'GoogleButton',
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    isXS() {
      return this.$vuetify.breakpoint.xsOnly;
    },
  },
  methods: {
    submitGoogle() {
      this.loading = true;
      this.error = false;

      this.$auth.authenticate('google').then((token) => {
        const accessToken = token.body.access_token;

        Auth.whoAmI(accessToken)
          .then(whoAmI => Users.getById(whoAmI.data.id)
            .then((me) => {
              localStorage.setItem('token', accessToken);
              this.$store.commit('login', me.data);
            }))
          .catch(() => {
            this.$emit('error');
          })
          .finally(() => {
            this.loading = false;
            this.$emit('login');
          });
      }).catch((e) => {
        this.$emit('error');
        this.$toast.error(e.body.message);
      });
    },
  },
};
</script>
