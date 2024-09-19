<script>
import request from "@/requests";
import SelectTechnology from "./SelectTechnology.vue";

export default {
  data() {
    return {
      user: {},
      isLoaded: false,
      userRooms: [],
      showChatWindow: false,
      showSelectTechnology: false,
    }
  },
  components: {
    SelectTechnology,
  },
  methods: {
    async getUser() {
      const response = await request(
        "get",
        "/user/me/",
        {},
        { "Authorization": `Bearer ${localStorage.getItem("access_token")}` },
        {},
      )
      if (
        response.status === 200
      ) {
        this.isLoaded = true;
        this.user = response.data
        this.$store.state.user = this.user
      } else {
        this.error = response.data.message;
      }
    },
    async showTechnologies() {
      this.showSelectTechnology = true;
    },
  },
  async mounted() {
    await this.getUser()
    if (this.user.rooms.length > 0) {
      this.showChatWindow = true;
    }
  }
}
</script>

<template>
  <div v-if="isLoaded" class="container mt-4">
    <div class="row">
      <div class="col-lg-2">
        <div id="my-chats">
          <h6>Ваши собеседования</h6>
          <div class="btn btn-success mt-2" style="width: 100%;" @click="showTechnologies">
            + Новый чат
          </div>
        </div>
      </div>
      <div class="col-lg-10 px-4">
        <div v-if="showSelectTechnology">
          <SelectTechnology />
        </div>
        <div v-else-if="userRooms.length > 0">
          User Last Chat
        </div>
        <div v-else>
          <div class="d-flex justify-content-center align-items-center flex-column" style="height: 50vh;">
            <div class="mb-4">
              <h6>У вас еще нет активных диалогов</h6>
            </div>
            <div class="btn btn-success" @click="showTechnologies">
              Начать!
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>