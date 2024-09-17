<script>
import request from "@/requests";

export default {
  data() {
    return {
      user: {},
    }
  },
  components: {

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
        console.log(this.user)
      } else {
        this.error = response.data.message;
      }
    },
  },
  async mounted() {
    await this.getUser()
  }
}
</script>

<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-lg-3">
        <div id="my-chats">
          <h6>Ваши собеседования</h6>
        </div>
        <div id="question-categories">
          <h6>Ваши собеседования</h6>
        </div>
      </div>
      <div class="col-lg-9">
        {{ user.email }}
      </div>
    </div>
  </div>

</template>