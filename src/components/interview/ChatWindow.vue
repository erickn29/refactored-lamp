<script>
import SelectTechnology from './AddChat.vue';
import request from "@/requests";

export default {
  data() {
    return {
      showTechnologies: true,
      text: "",
      showTextArea: false,
      showLoader: false,
      chat: null,
      messages: [],
      questionId: null,
      disableControls: false,
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
    async getQuestion() {
      this.showLoader = true
      const response = await request(
        "get",
        `/interview/q/${this.$store.state.currentChat.id}/`,
        {},
        { "Authorization": `Bearer ${localStorage.getItem("access_token")}` },
        {},
      )
      if (response.status == 200) {
        await this.getChat()
        // this.messages = response.data.messages
        this.showLoader = false
      }
    },
    async sendAnswer() {
      this.showLoader = true
      this.disableControls = true
      const response = await request(
        "post",
        `/interview/a/${this.$store.state.currentChat.id}/`,
        {
          question_id: this.questionId,
          text: this.text,
        },
        { "Authorization": `Bearer ${localStorage.getItem("access_token")}` },
        {},
      )
      if (response.status == 201) {
        this.text = ""
        await this.getChat()
        // this.messages = response.data.messages
        this.disableControls = false
        this.showLoader = false
      }
    },
    async scrollToBottom() {
      let div = document.getElementById(this.$store.state.currentChat.id);
      // div.scrollTop = 9999999
      div.scrollTo({
        top: div.scrollHeight,
        left: 0,
        // behavior: "smooth",
      });
    },
    isDisabledControls () {
      return this.disableControls
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
        this.messages = response.data.messages
        if (this.messages.length > 0) {
          const lastMessage = this.messages[response.data.messages.length - 1]
          if (lastMessage.type == "question") {
            this.questionId = lastMessage.question_id
            this.showTextArea = true
          } else {
            this.showTextArea = false
          }
        } else {
          this.showTextArea = false
        }
        setTimeout(() => {
          this.scrollToBottom();
        }, "1 second");
        
        this.showLoader = false
      } else {
        this.error = response.data.message;
      }
    },
  },
  watch: {
    '$store.state.currentChat': async function () {
      await this.getChat();
    }
  },
  async mounted() {
    this.showLoader = true;
    await this.getChat();
    await this.scrollToBottom()
    if (this.showTextArea) {
      this.resizeTextarea();
    }
  }
}
</script>

<template>
  <div class="container" id="message-container">
    <div class="chat d-flex mb-4">
      <div v-if="showLoader" style="position: relative; width: 100%; height: 100%;">
        <div class="spinner-container">
          <span class="spinner"></span>
        </div>
      </div>
      <div class="messages p-4" :id="$store.state.currentChat.id" @change="scrollToBottom">
        <div v-for="msg in messages" :key="msg.id"
          :class="msg.type === 'answer' ? 'message p-3 mb-4 user-message' : 'message p-3 mb-4'">
          <div v-html="msg.text"></div>
        </div>
      </div>
      <div class="controls">
        <div v-if="showTextArea" class="user-message-area row">
          <div class="col-11" style="padding-right: 0;">
            <textarea
              style="min-height: 55px; overflow: hidden; resize: none; border-radius: 5px 0px 0px 5px;" ref="textarea"
              class="form-control" v-model="text" placeholder="Введите свой ответ..."
              @input="resizeTextarea"
            >
            </textarea>
          </div>
          <div class="col-1 d-flex justify-content-center align-items-center" style="padding-left: 0;">
            <div v-if="!disableControls"
              class="d-flex justify-content-center align-items-center send-btn" style="" @click="sendAnswer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff" class="bi bi-send-fill"
                viewBox="0 0 16 16">
                <path
                  d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
              </svg>
            </div>
          </div>
        </div>
        <div v-else style="width: 100%; padding: 15px;" class="btn btn-success" @click="getQuestion">
          следующий вопрос
        </div>
      </div>
    </div>
  </div>
</template>