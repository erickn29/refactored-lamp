<script>
import request from "@/requests";

export default {
  props: {
    type: String,
    text: String,
    requestData: Object
  },
  data() {

  },
  methods: {
    closePopup() {
      this.$emit("closePopup", true);
    },
    async sendRequest() {
      const response = await request(
        this.requestData.method,
        this.requestData.url,
        this.requestData.data,
        this.requestData.headers,
        this.requestData.params,
      )
      console.log(response)
      console.log(this.type)
      if (response.status >= 200 && response.status < 300) {
        if (this.type === "deleteUser") {
          localStorage.removeItem('access_token')
          localStorage.removeItem('refresh_token')
          this.$store.state.user = {}
        }
        location.reload();
      }
    }
  }
}

</script>

<template>
  <div class="popup-wrapper">
    <div class="popup">
      <div class="close" id="close-popup">
        <span class="buttn">
          <div class="close mb-2">
            <svg style="cursor: pointer;" @click="closePopup" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
              fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
              <path
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
            </svg>
          </div>
        </span>
      </div>
      <div v-html="text" class="popup-text p-2 mb-4">
      </div>
      <div class="buttons">
        <button @click="sendRequest" class="btn btn-success mx-1">Подтвердить</button>
        <button @click="closePopup" class="btn btn-danger mx-1">Отменить</button>
      </div>
    </div>
  </div>
</template>

<style>
.popup-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  backdrop-filter: blur(20px);
}

.popup {
  background-color: #121212;
  border: 1px solid #333;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  max-width: 666px;
  min-width: 300px;
  display: flex;
  flex-direction: column;
}
</style>