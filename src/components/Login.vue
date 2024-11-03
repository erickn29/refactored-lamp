<script>
import loginRequest from "@/endpoints/auth/login"

export default {
  data() {
    return {
      user: {
        email: '',
        password: ''
      },
    }
  },
  methods: {
    async loginUser() {
      const response = await loginRequest(this.user.email, this.user.password)
      if (response.status === 200) {
        this.$router.push('/interview')
      } else {
        this.error = response.data.message
      }
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="form-container row p-4">
      <form @submit.prevent="loginUser" id="myFormLogin" class="p-4 col-lg-4">
        <h4>Вход</h4>
        <hr>
        <div class="mb-3">
          <label for="email" class="form-label">Электронный почта:</label>
          <input type="email" v-model.trim="user.email" id="email" class="form-control" required>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Пароль:</label>
          <input type="password" v-model.trim="user.password" id="password" class="form-control mb-4" required>
        </div>
        <button type="submit" class="btn btn-primary" style="width: 100%;">Войти</button>
      </form>
    </div>
  </div>

</template>

<style scoped>
.container {
  height: 93vh
}

.form-container {
  display: flex;
  justify-content: center;
  /* flex-direction: column;
  align-content: center;
  flex-wrap: wrap;
  min-height: 95vh; */
}

label {
  display: block;
  margin-bottom: 10px;
  font-size: .9rem;
}

form {
  background-color: #1a1a1a;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #333;
}
</style>