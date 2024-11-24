<script>
import verifyEmail from '@/endpoints/user/verifyEmail';
export default {
  data() {
    return {
      token: this.$route.params.token
    }
  },
  methods: {
    async sendToken() {
      const response = await verifyEmail(this.token)
      if (response) {
        if (
          response.status >= 200 && response.status < 300
        ) {
          this.$router.push('/interview');
        } else {
          this.error = response.data.message;
        }
      }
    }
  },
  async mounted() {
    this.sendToken();
  }
}
</script>

<template>
  
</template>