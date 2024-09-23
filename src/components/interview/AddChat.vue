<script>
import request from "@/requests";

export default {
  data() {
    return {
      technologies: ['HTML', 'CSS', 'JavaScript', 'Vue.js', 'React', 'Angular'],
      grades: ['trainee', 'junior', 'middle', 'senior',],
      selectedTechnologies: [],
      selectedGrades: [],
      chatTitle: null,
    }
  },
  methods: {
    selectTechnology(technology) {
      if (this.selectedTechnologies.includes(technology)) {
        this.selectedTechnologies.splice(this.selectedTechnologies.indexOf(technology), 1);
        console.log(this.selectedTechnologies);
      } else {
        this.selectedTechnologies.push(technology);
        console.log(this.selectedTechnologies);
      }
    },
    isSelectedTech(technology) {
      return this.selectedTechnologies.includes(technology);
    },
    selectGrade(grade) {
      if (this.selectedGrades.includes(grade)) {
        this.selectedGrades.splice(this.selectedGrades.indexOf(grade), 1);
        console.log(this.selectedGrades);
      } else {
        this.selectedGrades.push(grade);
        console.log(this.selectedGrades);
      }
    },
    isSelectedGrade(grade) {
      return this.selectedGrades.includes(grade);
    },
    closeSelectTechnologies() {
      this.$store.state.showTechnologies = false;
    },
    async createChat() {
      let technologies = []
      for (var t = 0; t < this.selectedTechnologies.length; t++) {
        for (var g = 0; g < this.selectedGrades.length; g++) {
          technologies.push(
            {
              "technology": this.selectedTechnologies[t],
              "complexity": this.selectedGrades[g]
            }
          )
        }
      }
      let data = {
        "user_id": null,
        "title": this.chatTitle,
        "config": {
          "technologies": technologies
        }
      }
      const response = await request(
        "post",
        "/interview/chat/",
        data,
        { "Authorization": `Bearer ${localStorage.getItem("access_token")}` },
        {},
      )
      if (response.status === 201) {
        window.location.reload()
      }
    },
    handleVisibilityChange() {
      if (document.hidden) {
        // The tab has become inactive or the browser window is not focused
        alert("You have switched away from this page!");
      }
    },
    handleBlur() {
      alert("The window has lost focus!");
    },
    handleFocus() {
      console.log("The window has regained focus!");
    }
  },
  mounted() {
    // document.addEventListener('visibilitychange', this.handleVisibilityChange);
    // window.addEventListener('blur', this.handleBlur);
    // window.addEventListener('focus', this.handleFocus);
  },
  beforeDestroy() {
    // document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    // window.removeEventListener('blur', this.handleBlur);
    // window.removeEventListener('focus', this.handleFocus);
  }
}
</script>

<template>
  <div class="container-fluid p-4" style="border: 1px solid #333; border-radius: 7px;">
    <div class="close pb-2" id="close-technology" @click="closeSelectTechnologies">
      <span class="buttn py-2">
        [x]
      </span>
    </div>
    <h6>Введите название чата</h6>
    <input type="text" v-model="chatTitle" placeholder="Пример: Собеседование на фронтенд разработчика"
      class="form-control mt-3 mb-4" />
    <h6>Выберите ваш уровень</h6>
    <div class="mt-3 row">
      <div v-for="g in grades" :key="g" class="technology p-2 mb-2 mx-2 col" :class="{ selected: isSelectedGrade(g) }"
        @click="selectGrade(g)">
        {{ g }}
      </div>
    </div>
    <h6>Выберите технологии для интревью</h6>
    <div class="mt-3 row">
      <div v-for="t in technologies" :key="t" class="technology p-2 mb-2 mx-2 col"
        :class="{ selected: isSelectedTech(t) }" @click="selectTechnology(t)">
        {{ t }}
      </div>
    </div>
    <div class="d-flex mt-4 justify-content-center">
      <div class="buttons d-flex gap-3">
        <button class="btn btn-success p-2 mx-auto"
          :disabled="selectedTechnologies.length === 0 || !chatTitle || selectedGrades.length === 0"
          @click="createChat">
          создать чат
        </button>
        <button class="btn btn-warning p-2 mx-auto" @click="closeSelectTechnologies">
          отмена
        </button>
      </div>
    </div>
  </div>
</template>
