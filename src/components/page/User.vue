<script>
import meRequest from '@/endpoints/user/me';
import updateUser from '@/endpoints/user/update';
import exitUser from '@/endpoints/user/exit';
import deleteUser from '@/endpoints/user/delete';
import Popup from '@/components/interface/Popup.vue';

export default {
  data() {
    return {
      user: {},
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      deleteUserRequestObject: {},
      showPopupWindow: false,
      popupMessage: "",
      typePopUp: "deleteUser",
    }
  },
  components: {
    Popup,
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
      const userFirstName = document.getElementById("user-first_name").value
      const userLastName = document.getElementById("user-last_name").value
      const userEmail = document.getElementById("user-email").value
      const userPassword = document.getElementById("user-password").value

      if (userEmail === "") {
        alert("Email обязателен к заполнению")
        return
      }

      const response = await updateUser(
        userFirstName,
        userLastName,
        userEmail,
        userPassword ? userPassword : null,
      )

      if (response) {
        if (
          response.status === 201
        ) {
          this.user = response.data
          this.$store.state.user = this.user
          console.log(this.user)
        } else {
          this.error = response.data.message;
        }
      }
    },

    async exitUser() {
      const response = await exitUser()
      if (response) {
        if (response.status == 200) {
          localStorage.removeItem('access_token')
          localStorage.removeItem('refresh_token')
          this.$store.state.user = {}
          this.$router.push('/login')
        }
      }
    },

    // async deleteUser() {
    //   const response = await deleteUser()

    //   if (response) {
    //     if (
    //       response.status === 204
    //     ) {
    //       this.user = response.data
    //       this.$store.state.user = this.user
    //       console.log(this.user)
    //     } else {
    //       this.error = response.data.message;
    //     }
    //   }
    //   localStorage.removeItem('access_token')
    //   localStorage.removeItem('refresh_token')
    //   this.$store.state.user = {}
    //   this.$router.push('/login')
    // },

    showPopup() {
      this.popupMessage = `Удалить 
      пользователя "${this.$store.state.user.email}"?<br><br>
      Данные удалятся безвозвратно.
      `
      this.deleteUserRequestObject = {
        method: "delete",
        url: `/user/`,
        data: {},
        headers: { "Authorization": `Bearer ${localStorage.getItem("access_token")}` },
        params: {},
      }
      this.showPopupWindow = true
    }

  },
  async mounted() {
    await this.getUser()
  }
}
</script>

<template>
  <div v-if="showPopupWindow">
    <Popup @close-popup="showPopupWindow = false" :text=popupMessage :requestData=deleteUserRequestObject
      :type=typePopUp />
  </div>
  <div style="min-height: 93vh;">
    <div class="user-form d-flex justify-content-center p-4 mb-0">
      <form style="min-width: 300px;" @submit.prevent="onSubmit">

        <label class="mb-2" for="user-first_name">Имя</label>
        <input :value="user.first_name" id="user-first_name" type="text" class="form-control mb-4"
          placeholder="Укажите имя">

        <label class="mb-2" for="user-last_name">Фамилия</label>
        <input :value="user.last_name" id="user-last_name" type="text" class="form-control mb-4"
          placeholder="Укажите фамилию">

        <label class="mb-2" for="user-email">Почта</label>
        <input :value="user.email" id="user-email" type="email" class="form-control mb-4" placeholder="Укажите фамилию">

        <label class="mb-2" for="user-password">Пароль</label>
        <input :value="user.password" id="user-password" type="password" class="form-control mb-4"
          placeholder="Введите, чтобы изменить">

        <button @click="updateUser" class="btn btn-success">Сохранить</button>
      </form>
    </div>
    <div class="control mb-4">
      <div class="inner" style="min-width: 300px;">
        <div @click="exitUser" class="exit">Выйти из учетной записи</div><br>
        <div @click="showPopup" class="delete">Удалить учетную запись</div>
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
