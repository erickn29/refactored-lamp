<script>
import SelectTechnology from './AddChat.vue';
import request from "@/requests";
import Popup from '@/components/Popup.vue';

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
      showPopupWindow: false,
      popupMessage: "",
      deleteChatRequestObject: {}
    }
  },
  components: {
    SelectTechnology,
    Popup,
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
    isDisabledControls() {
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
        console.log(response.data)
        // this.messages = response.data.messages.reverse()
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
    showPopup(action) {
      // if (action === "edit") {
      //   this.popupMessage = "Edit"
      //   this.showPopupWindow = true
      // }
      if (action === "delete") {
        this.popupMessage = `Удалить 
        чат "${this.$store.state.currentChat.title}"?<br><br>
        Данные удалятся безвозвратно.
        `
        this.deleteChatRequestObject = {
          method: "delete",
          url: `/interview/chat/${this.$store.state.currentChat.id}/`,
          data: {},
          headers: { "Authorization": `Bearer ${localStorage.getItem("access_token")}` },
          params: {},
        }
        this.showPopupWindow = true
      }
    }
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
  <div v-if="showPopupWindow">
    <Popup 
      @close-popup="showPopupWindow = false" 
      :text=popupMessage 
      :requestData=deleteChatRequestObject
    />
  </div>
  <div class="container" id="message-container">
    <div class="chat-control">
      <h6 class="mb-3">
        <span class="p-1" style="cursor: default;">
          <strong>
            {{ $store.state.currentChat.title }}
          </strong>
        </span>
        <span style="cursor: default;">
          [{{ $store.state.currentChat.config.technologies.map(tech =>
            tech.technology).join(', ') }}]
        </span>
        <span class="mx-2 trash" @click="showPopup('delete')">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill"
            viewBox="0 0 16 16">
            <path
              d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
          </svg>
        </span>
      </h6>
    </div>
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
          <div class="col-xl-11 col-10" style="padding-right: 0;">
            <textarea style="min-height: 55px; overflow: hidden; resize: none; border-radius: 5px 0px 0px 5px;"
              ref="textarea" class="form-control" v-model="text" placeholder="Введите свой ответ..."
              @input="resizeTextarea">
            </textarea>
          </div>
          <div class="col-xl-1 col-2 d-flex justify-content-center align-items-center" style="padding-left: 0;">
            <div v-if="!disableControls" class="d-flex justify-content-center align-items-center send-btn" style=""
              @click="sendAnswer">
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

<style>
.chat-control span svg {
  cursor: pointer;
  transition: .2s;
  margin-bottom: 3px;
}

.chat-control span svg:hover {
  fill: #008074;
  transition: .2s;
}

.trash svg {
  fill: #f52067;
}

.trash svg:hover {
  fill: #d31b58 !important;
}
</style>