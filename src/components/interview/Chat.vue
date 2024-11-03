<script>
import request from "@/requests";
import SelectTechnology from "./AddChat.vue";
import ChatWindow from "./ChatWindow.vue";
import ForbiddenEmail from "../ForbiddenEmail.vue";

export default {
  data() {
    return {
      user: {},
      isLoaded: false,
      userChats: [],
      showChatWindow: false,
      selectedChat: null,
      isForbiddenEmail: true,
    }
  },
  components: {
    SelectTechnology,
    ChatWindow,
    ForbiddenEmail,
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
      console.log(response)
      if (
        response.status === 200
      ) {
        this.isForbiddenEmail = false
        this.$store.state.currentChat = response.data.items[0]
        this.selectedChat = response.data.items[0].id
        this.userChats = response.data.items
      } else {
        this.error = response.data.message;
      }
    },
    async selectChat(chatId) {
      const chat = this.userChats.find(chat => chat.id === chatId);
      if (chat) {
        this.selectedChat = chat.id;
        this.$store.state.currentChat = chat;
        this.$store.state.showTechnologies = false;
        // await this.getChat()
      } else {
        console.error(`Чат с id ${chatId} не найден.`);
      }
    },
    isSelectedChat(chatId) {
      return this.selectedChat == chatId;
    },
    async showTechnologies() {
      this.$store.state.showTechnologies = true;
    },
    truncateTitle(title, length = 22) {
      if (title.length > length) {
        return title.substring(0, length) + '...';
      }
      return title;
    },
  },
  async mounted() {
    await this.getUser()
    await this.getChats()
    // await this.getChat()
    this.isLoaded = true;
    // if (this.user.rooms.length > 0) {
    //   this.showChatWindow = true;
    // }
  }
}
</script>

<template>
  <div v-if="isLoaded" class="container mt-4 chat-container">
    <div v-if="isForbiddenEmail">
      <ForbiddenEmail />
    </div>
    <div v-else>
      <div class="row">
        <div class="col-xl-3 mt-4 chats-wrapper">
          <div class="chats-header">
            <h6>Ваши собеседования [{{ userChats.length }}/10]</h6>
          </div>
          <div class="my-chats p-4 section my-4">
            <div v-if="userChats.length < 10 || user.is_admin == true" class="btn btn-success mt-2" style="width: 100%;"
              @click="showTechnologies">
              + Новое собеседование
            </div>
            <div class="user-chats mt-4">
              <div class="user-chat mb-3" v-for="chat in userChats" :key="chat.id" @click="selectChat(chat.id)"
                :class="{ selected: isSelectedChat(chat.id) }">
                {{ truncateTitle(chat.title) }}
              </div>
            </div>
          </div>
          <div class="my-chats-mob p-4 section my-4">
            <details>
              <summary>
                {{ $store.state.currentChat.title }}
              </summary>
              <div v-if="userChats.length < 10 || user.is_admin == true" class="btn btn-success mt-4 p-2"
                style="width: 100%;" @click="showTechnologies">
                + Новое собеседование
              </div>
              <div class="user-chats mt-4">
                <div class="user-chat mb-3" v-for="chat in userChats" :key="chat.id" @click="selectChat(chat.id)"
                  :class="{ selected: isSelectedChat(chat.id) }">
                  {{ truncateTitle(chat.title) }}
                </div>
              </div>
            </details>

          </div>
        </div>
        <div class="col-xl-9 px-4" id="message-container-wrapper">
          <div v-if="$store.state.showTechnologies">
            <SelectTechnology />
          </div>
          <div v-else-if="$store.state.currentChat">
            <ChatWindow />
          </div>
          <div v-else>
            <div class="d-flex justify-content-center align-items-center flex-column section" style="height: 50vh;">
              <div class="mb-4">
                <h6>У вас еще нет активных диалогов</h6>
              </div>
              <div class="btn btn-success" @click="showTechnologies">
                + Новое собеседование
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="loader">

    </div>
  </div>

</template>

<style>
.section {
  border: 1px solid #313131;
  border-radius: 7px;
}
</style>