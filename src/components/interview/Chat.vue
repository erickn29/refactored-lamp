<script>
import request from "@/requests";
import SelectTechnology from "./AddChat.vue";
import ChatWindow from "./ChatWindow.vue";

export default {
  data() {
    return {
      user: {},
      isLoaded: false,
      userChats: [],
      showChatWindow: false,
      selectedChat: null,
    }
  },
  components: {
    SelectTechnology,
    ChatWindow,
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
      if (
        response.status === 200
      ) {
        this.$store.state.currentChat = response.data.items[0]
        this.selectedChat = response.data.items[0].id
        this.userChats = response.data.items
      } else {
        this.error = response.data.message;
      }
    },
    async getChat() {
      const response = await request(
        "get",
        `/interview/chat/${this.$store.state.currentChat.id}/`,
        {},
        { "Authorization": `Bearer ${localStorage.getItem("access_token")}` },
        {},
      )
      if (
        response.status === 200
      ) {
        this.$store.state.currentChat.messages = response.data.messages
        const lastMessage = response.data.messages[response.data.messages.length - 1]
        if (lastMessage) {
          this.$store.state.isUserMessage = lastMessage.is_user_message
        } else {
          this.$store.state.isUserMessage = true;
        }
        
        console.log(this.$store.state.isUserMessage)
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
  <div v-if="isLoaded" class="container mt-4">
    <div class="row">
      <div class="col-lg-3 mt-4">
        <h6>Ваши собеседования [{{ userChats.length }}/10]</h6>
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
      </div>
      <div class="col-lg-9 px-4">
        <div v-if="$store.state.showTechnologies">
          <SelectTechnology />
        </div>
        <div v-else-if="$store.state.currentChat">
          <ChatWindow />
        </div>
        <div v-else-if="userChats.length > 0">
          {{ userChats[0].id }}
          {{ userChats[0].title }}
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