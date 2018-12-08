<template>
  <v-footer
    height="auto"
    color="primary"
  >
    <v-layout
      justify-center
      row
      wrap
    >
      <v-flex
        primary
        py-3
        text-xs-center
        xs12
      >
        <members-info />
      </v-flex>
    </v-layout>
  </v-footer>
</template>

<script>
import MembersInfo from '@/components/MembersInfo.vue';

export default {
  name: 'FooterApp',
  components: {
    MembersInfo,
  },
  data() {

  },
};
</script>
