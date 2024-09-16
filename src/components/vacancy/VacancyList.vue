<script>
import axios from "axios";

export default {
  name: "list",
  data() {
    return {
      vacancies: [],
      pagination: {},
      isLoaded: false,
      languages: [],
      experiences: [],
      specialities: [],
    }
  },
  components: {},
  methods: {
    async resetSearch() {
      location.reload()
    },
    async fetchSelectors() {
      try {
        const response = await axios.get(
            'http://127.0.0.1:8000/api/v1/job/vacancy/selectors/'
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
    async fetchVacancies(pageNumber = 1) {
      const language = document.getElementById("language").value
      const speciality = document.getElementById("speciality").value
      const experience = document.getElementById("experience").value
      console.log(pageNumber)
      const params = {
        "language": language,
        "speciality": speciality,
        "experience": experience,
        "page": pageNumber ? pageNumber : 1,
      }
      try {
        const response = await axios.get(
            'http://127.0.0.1:8000/api/v1/job/vacancy/',
            {params: params}
        )
        if (response.status == 200) {
          this.vacancies = response.data.vacancies
          this.pagination = response.data.pagination
          this.isLoaded = true
          window.scroll(0, 0)
          console.log(this.vacancies)
          console.log(this.pagination)
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  async mounted() {
    await this.fetchSelectors()
    await this.fetchVacancies()
  }
}
</script>

<template>
  <section class="mt-4 row">
    <div class="col-lg-3 mb-4">
      <div class="counter mb-4">Уточнить поиск:</div>
      <div class="filter shadow-box">
        <div class="language selector mb-4">
          <select id="language" class="form-control">
            <option value="">Язык программирования</option>
            <option v-for="language in languages" :value="language">
              {{ language }}
            </option>
          </select>
        </div>
        <div class="speciality selector mb-4">
          <select id="speciality" class="form-control">
            <option value="">Специализация</option>
            <option v-for="speciality in specialities" :value="speciality">
              {{ speciality }}
            </option>
          </select>
        </div>
        <div class="experience selector mb-4">
          <select id="experience" class="form-control">
            <option value="">Опыт</option>
            <option v-for="experience in experiences" :value="experience">
              {{ experience }}
            </option>
          </select>
        </div>
        <div class="salary mb-4">
          <input
              type="number"
              name="salary"
              id="salary-filter"
              class="form-control"
              placeholder="Зарплата от"
          >
        </div>
        <div class="d-flex gap-2">
          <div class="button-accept shadow-box" @click="fetchVacancies(1)">Искать</div>
          <div class="button-warning shadow-box" @click="resetSearch">Сбросить</div>
        </div>
      </div>
    </div>

    <div v-if="vacancies" class="col-lg-9">
      <div class="counter mb-4">Найдено вакансий: {{ pagination.count }}</div>
      <div v-for="vacancy in vacancies" key="vacancy.id" class="vacancy shadow-box">
        <div class="vacancy-title mb-2">
          {{ vacancy.title }}
        </div>
        <div class="vacancy-company mb-2">
          {{ vacancy.company.name }} / {{ vacancy.company.city.name }}
        </div>
        <div class="vacancy-salary mb-2">
          <span v-if="vacancy.salary_from" class="vacancy-salary-from">
            от <span style="font-weight: 700; color: #28D1C5; font-size: 1.1rem">
            {{ vacancy.salary_from.toLocaleString('ru-RU') }}
          </span> руб.
          </span>
          <span v-if="vacancy.salary_to" class="vacancy-salary-to">
            до <span style="font-weight: 700; color: #28D1C5; font-size: 1.1rem">
            {{ vacancy.salary_to.toLocaleString('ru-RU') }}
          </span> руб.
          </span>
        </div>
        <div class="vacancy-experience mb-2">
          опыт: {{ vacancy.experience }}
        </div>
        <div v-if="vacancy.tool" class="d-flex flex-wrap">
          <div v-for="tool in vacancy.tool" key="tool.id" class="vacancy-tool">
            {{ tool.name }}
          </div>
        </div>
      </div>
      <div class="pagination d-flex mb-4 justify-content-center gap-2">
        <div v-if="pagination.currentPage > 1">
          <div
              class="next-page paginate-button button-accept-outline"
              @click="fetchVacancies(pagination.currentPage - 1)"
          >
            Назад
          </div>
        </div>
        <div v-if="pagination.currentPage < pagination.maxPage">
          <div
              class="next-page paginate-button button-accept-outline"
              @click="fetchVacancies(pagination.currentPage + 1)"
          >
            Вперед
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style>
.filter {
  padding: 20px;
  border-radius: 10px;
  margin: 20px 0px;
  position: sticky;
  top: 60px;
  font-size: .9rem;
  text-transform: lowercase;
}

.form-control {
  font-size: .9rem !important;
}

.vacancy {
  padding: 20px;
  border-radius: 10px;
  margin: 20px 0px;
}

.vacancy-title {
  font-size: 1.2rem;
  font-weight: 600;
}

.vacancy-tool {
  margin: 0 5px 5px 0;
  padding: 2px 5px;
  background: #8f73a717;
  border-radius: 3px;
  font-size: .9rem;
  font-weight: 500;
  color: #000000b0;
}

.vacancy-company {
  font-weight: 500;
}
</style>