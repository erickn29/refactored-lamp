<script>
import SelectTechnology from './AddChat.vue';
import request from "@/requests";

export default {
  data() {
    return {
      showTechnologies: true,
      text: "",
      isUserMessage: null,
    }
  },
  components: {
    SelectTechnology,
  },
  methods: {
    resizeTextarea() {
      const height = this.$refs.textarea.scrollHeight;
      this.$refs.textarea.style.height = `${height}px`;
    },
    async getNewQuestion() {
      const response = await request(
        "get",
        `/interview/q/${this.$store.state.currentChat.id}/`,
        {},
        { "Authorization": `Bearer ${localStorage.getItem("access_token")}` },
        {},
      )
      if (response.status == 200) {
        this.$store.state.lastQuestion = response.data
        await this.getChat()
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
        this.$store.state.isUserMessage = response.data.messages[-1].is_user_message
      } else {
        this.error = response.data.message;
      }
    },
  },
  async mounted() {
    this.resizeTextarea();
  }
}
</script>

<template>
  <div class="container">
    <div class="chat d-flex mb-4">
      <div class="messages p-4">
        <div v-for="msg in $store.state.currentChat.messages" :key="msg.id"
          :class="msg.is_user_message === true ? 'message p-2 mb-4 user-message' : 'message p-2 mb-4'">
          {{ msg.text }}
        </div>
      </div>
      <div class="controls">
        <div v-show="!$store.state.isUserMessage" class="user-message-area row">
          <div class="col-11">
            <textarea name="" id="" style="min-height: 55px; overflow: hidden;" ref="textarea" class="form-control"
              v-model="text" placeholder="Введите свой ответ..." @input="resizeTextarea">
          </textarea>
          </div>
          <div class="col-1 d-flex justify-content-center align-items-center" style="">
            <div class="d-flex justify-content-center align-items-center send-btn" style="">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff" class="bi bi-send-fill"
                viewBox="0 0 16 16">
                <path
                  d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
              </svg>
            </div>
          </div>
        </div>
        <div v-show="$store.state.isUserMessage" style="width: 100%;" class="btn btn-success" @click="getNewQuestion">
          следующий вопрос
        </div>
      </div>
    </div>
  </div>
</template>