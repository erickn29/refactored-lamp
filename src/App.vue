<script>
import VacancyList from "./components/vacancy/VacancyList.vue"
import Filter from "./components/vacancy/Filter.vue"
import Navbar from "./components/Navbar.vue"
import Footer from "./components/Footer.vue";
import LeftSlider from "./components/LeftSlider.vue";

import request from "@/requests";

export default {
  components: {
    VacancyList,
    Filter,
    Navbar,
    Footer,
    LeftSlider,
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
  },
  async mounted() {
    await this.getUser()
    this.isLoaded = true;
  }
}
</script>

<template>
  <Navbar />
  <LeftSlider />
  <div class="container">
    <main>
      <router-view />
    </main>
  </div>
  <footer>
    <Footer />
  </footer>
</template>

<style>
a {
  color: #212121;
  text-decoration: none;
}
.shadow-box {
  box-shadow: 0 0 20px #00000012 !important;
}
.button-accept {
  border-radius: 3px;
  cursor: pointer;
  width: 100%;
  text-align: center;
  padding: 5px 10px;
  background: #8328D1;
  color: white;
  transition: .2s;
  font-weight: 600;
}
.button-accept:hover {
  background: #7825bf;
  transition: .2s;
}
.button-accept-outline {
  border-radius: 3px;
  cursor: pointer;
  width: 100%;
  text-align: center;
  padding: 5px 10px;
  background: white;
  color: #8328D1;
  transition: .2s;
  font-weight: 600;
  border: 1px solid #8328D1;
}
.button-accept-outline:hover {
  color: white;
  background: #7825bf;
  transition: .2s;
}
.button-warning {
  border-radius: 3px;
  cursor: pointer;
  width: 100%;
  text-align: center;
  padding: 5px 10px;
  background: #ed601a;
  color: white;
  transition: .2s;
  font-weight: 600;
}
.button-warning:hover {
  background: #d75818;
  transition: .2s;
}
</style>
