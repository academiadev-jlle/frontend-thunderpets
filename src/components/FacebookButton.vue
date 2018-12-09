<template>
  <v-btn
    @click="submitFacebook"
    :class="{'pr-4': !isXS}"
    :loading="loading"
    block
    color="#3c66c4"
    dark
  >
    <v-icon :class="{'mr-3': !isXS}">
      mdi-facebook
    </v-icon>
    <span v-if="!isXS">
      Entrar com Facebook
    </span>
  </v-btn>
</template>

<script>
import Users from '@/services/users';
import Auth from '@/services/auth';

export default {
  name: 'FacebookButton',
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
    submitFacebook() {
      this.loading = true;
      this.error = false;

      this.$auth.authenticate('facebook').then((token) => {
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
