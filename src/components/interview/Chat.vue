<script>
import request from "@/requests";
import SelectTechnology from "./AddChat.vue";

export default {
  data() {
    return {
      user: {},
      isLoaded: false,
      userChats: [],
      showChatWindow: false,
      // showTechnologies: false,
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
    async getChats() {
      const response = await request(
        "get",
        "/interview/chat/",
        {},
        { "Authorization": `Bearer ${localStorage.getItem("access_token")}` },
        {},
      )
      if (
        response.status === 200
      ) {
        console.log(response.data)
        this.userChats = response.data.items
      } else {
        this.error = response.data.message;
      }
    },
    async showTechnologies() {
      this.$store.state.showTechnologies = true;
    },
  },
  async mounted() {
    await this.getUser()
    await this.getChats()
    // if (this.user.rooms.length > 0) {
    //   this.showChatWindow = true;
    // }
  }
}
</script>

<template>
  <div v-if="isLoaded" class="container mt-4">
    <div class="row">
      <div class="col-lg-3 mt-4">
        <div id="my-chats" class="p-4 section">
          <h6>Ваши собеседования</h6>
          <div class="btn btn-success mt-2" style="width: 100%;" @click="showTechnologies">
            + Новый чат
          </div>
        </div>
      </div>
      <div class="col-lg-9 p-4">
        <div v-if="$store.state.showTechnologies">
          <SelectTechnology />
        </div>
        <div v-else-if="userChats.length > 0">
          User Last Chat
        </div>
        <div v-else>
          <div class="d-flex justify-content-center align-items-center flex-column section" style="height: 50vh;">
            <div class="mb-4">
              <h6>У вас еще нет активных диалогов</h6>
            </div>
            <div class="btn btn-success" @click="showTechnologies">
              + Новый чат
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style>
.section {
  border: 1px solid #313131;
  border-radius: 7px;
}
</style>