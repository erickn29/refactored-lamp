<script>
import axios from "axios";

export default {
  name: "filter",
  data() {
    return {
      languages: [],
      experiences: [],
      specialities: [],
    }
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get(
            'http://127.0.0.1:8000/api/v1/vacancy/selectors/'
        )
        if (response.status == 200) {
          this.languages = response.data.languages
          this.experiences = response.data.experiences
          this.specialities = response.data.specialities
          this.isLoaded = true
          console.log(response.data)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async sendRequest() {
      const language = document.getElementById("language").value
      const speciality = document.getElementById("speciality").value
      const experience = document.getElementById("experience").value
      const params = {
        "language": language,
        "speciality": speciality,
        "experience": experience,
      }
      try {
        const response = await axios.get(
        'http://127.0.0.1:8000/api/v1/vacancy/',
        {params: params}
        )
        console.log(response.data)
      } catch (error) {
        console.log(error)
      }
    }
  },
  async mounted() {
    await this.fetchData()
  }
}
</script>

<template>
  <section class="mt-4">
    <div class="filter sticky-top">
      <div class="language selector mb-2">
        <select id="language" class="form-control">
          <option value="">Язык программирования</option>
          <option v-for="language in languages" :value="language">
            {{ language }}
          </option>
        </select>
      </div>
      <div class="speciality selector mb-2">
        <select id="speciality" class="form-control">
          <option value="">Специализация</option>
          <option v-for="speciality in specialities" :value="speciality">
            {{ speciality }}
          </option>
        </select>
      </div>
      <div class="experience selector mb-2">
        <select id="experience" class="form-control">
          <option value="">Опыт</option>
          <option v-for="experience in experiences" :value="experience">
            {{ experience }}
          </option>
        </select>
      </div>
    </div>
    <div class="d-flex">
      <div class="button-accept" @click="sendRequest">Искать</div>
    </div>
  </section>
</template>

<style>
.selector {

}
</style>