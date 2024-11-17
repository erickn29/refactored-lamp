<script>
import meRequest from '@/endpoints/user/me';

export default {
  data() {
    return {
      user: {},
    }
  },
  methods: {
    async getUser() {
      const response = await meRequest(true)
      if (response) {
        if (
          response.status === 200
        ) {
          this.user = response.data
          this.$store.state.user = this.user
          console.log(this.user)
        } else {
          this.error = response.data.message;
        }
      }
    },
    async updateUser() {
      const response = await meRequest(true, {
        first_name: this.user.first_name,
        last_name: this.user.last_name
      })
      if (response) {
        if (
          response.status === 200
        ) {
          this.user = response.data
          this.$store.state.user = this.user
          console.log(this.user)
        } else {
          this.error = response.data.message;
        }
      }
    },
    async exit() {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      this.$store.state.user = {}
      this.$router.push('/login')
    }
  },
  async mounted() {
    await this.getUser()
  }
}
</script>

<template>
  <div style="min-height: 93vh;">
    <div class="user-form d-flex justify-content-center p-4 mb-0">
      <form style="min-width: 300px;">

        <label class="mb-2" for="user-first_name">Имя</label>
        <input :value="user.first_name" id="user-first_name" type="text" class="form-control mb-4"
          placeholder="Укажите имя">

        <label class="mb-2" for="user-last_name">Фамилия</label>
        <input :value="user.last_name" id="user-last_name" type="text" class="form-control mb-4"
          placeholder="Укажите фамилию">

        <label class="mb-2" for="user-email">Почта</label>
        <input :value="user.email" id="user-email" type="text" class="form-control mb-4"
          placeholder="Укажите фамилию">

        <label class="mb-2" for="user-password">Пароль</label>
        <input id="user-password" type="password" class="form-control mb-4" placeholder="***">

        <button class="btn btn-success">Сохранить</button>
      </form>
    </div>
    <div class="control mb-4">
      <div class="inner" style="min-width: 300px;">
        <div @click="exit" class="exit">Выйти из учетной записи</div><br>
        <div class="delete">Удалить учетную запись</div>
      </div>
    </div>
  </div>
</template>

<style>
form {
  background-color: #1a1a1a;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #333;
}

.control {
  display: flex;
  justify-content: center;
}

.exit {
  /* color: #ef8f28; */
  cursor: pointer;
}

.exit:hover {
  text-decoration: underline;
}

.delete {
  color: red;
  cursor: pointer;
}

.delete:hover {
  text-decoration: underline;
}
</style>
