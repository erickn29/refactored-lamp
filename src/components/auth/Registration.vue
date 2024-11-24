<script>
import registrationRequest from "@/endpoints/auth/registration"

export default {
  data() {
    return {
      user: {
        email: '',
        password: ''
      },
      error: null,
      access_token: null,
      refresh_token: null
    }
  },
  methods: {
    async register() {
      const response = await registrationRequest(this.user.email, this.user.password)
      if (response === true) {
        this.$router.push('/')
      }
    },
  }
}
</script>

<template>
  <div class="container">
    <div class="form-container row p-4">
      <form @submit.prevent="register" id="myFormRegister" class="p-4 col-lg-4">
        <h4>Регистрация</h4>
        <hr>
        <div class="mb-3">
          <label for="email" class="form-label">Электронный адрес:</label>
          <input type="email" v-model.trim="user.email" id="email" class="form-control" required>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Пароль:</label>
          <input type="password" v-model.trim="user.password" id="password" class="form-control mb-4" required>
        </div>
        <button type="submit" class="btn btn-primary" style="width: 100%;">Зарегистрироваться</button>
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
