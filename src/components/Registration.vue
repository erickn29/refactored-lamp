<template>
  <div class="container">
    <h2>Регистрация</h2>
    <form @submit.prevent="register" id="myFormRegister">
      <div class="mb-3">
        <label for="email" class="form-label">Электронный адрес:</label>
        <input type="email" v-model.trim="user.email" id="email" class="form-control" required>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Пароль:</label>
        <input type="password" v-model.trim="user.password" id="password" class="form-control" required>
      </div>
      <button type="submit" class="btn btn-primary">Зарегистрироваться</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

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
    async login() {
      try {
        const response = await axios.post(
          'http://localhost:8000/api/v1/auth/login/',
          { email: this.user.email, password: this.user.password },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        if (
          response.status === 200 &&
          response.data.access_token !== null &&
          response.data.refresh_token !== null
        ) {
          this.access_token = response.data.access_token;
          this.refresh_token = response.data.refresh_token;
          localStorage.setItem('access_token', this.access_token);
          localStorage.setItem('refresh_token', this.refresh_token);
          this.$router.push('/interview');
        } else {
          this.error = response.data.msg;
        }
      } catch (error) {
        console.error(error.response.data.msg);
      }
    },
    async register() {
      try {
        const response = await axios.post('http://localhost:8000/api/v1/user/',
          {email: this.user.email, password: this.user.password },
          {headers: {'Content-Type': 'application/json'}}
        );
        if (response.status === 201) {
          await this.login()
        } else {
          this.error = response.data.message;
        }
      } catch (error) {
        if (error.response.data.msg == "Ошибка создания объекта") {
          console.error("Пользователь с данным email уже существует");
        } else {
          console.error(error);
        }
      }
    },
  }
}
</script>

<style scoped>
.container {
  width: 500px;
  margin: 50px auto;
}

label {
  display: block;
  margin-bottom: 10px;
}

form {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
