<script>
import request from "@/requests";

export default {
  data() {
    return {
      technologies: ["Python", "SQL", "Linux"],
      // grades: ['trainee', 'junior', 'middle', 'senior',],
      selectedTechnologies: [],
      // selectedGrades: [],
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
    // selectGrade(grade) {
    //   if (this.selectedGrades.includes(grade)) {
    //     this.selectedGrades.splice(this.selectedGrades.indexOf(grade), 1);
    //     console.log(this.selectedGrades);
    //   } else {
    //     this.selectedGrades.push(grade);
    //     console.log(this.selectedGrades);
    //   }
    // },
    // isSelectedGrade(grade) {
    //   return this.selectedGrades.includes(grade);
    // },
    closeSelectTechnologies() {
      this.$store.state.showTechnologies = false;
    },
    async createChat() {
      let technologies = []
      for (var t = 0; t < this.selectedTechnologies.length; t++) {
        technologies.push(
          {
            "technology": this.selectedTechnologies[t],
            "complexity": "medium"
          }
        )
        // for (var g = 0; g < this.selectedGrades.length; g++) {
        //   technologies.push(
        //     {
        //       "technology": this.selectedTechnologies[t],
        //       "complexity": "medium"
        //     }
        //   )
        // }
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
  <div class="container-fluid mt-2 p-4" style="border: 1px solid #333; border-radius: 7px;">
    <div class="close pb-2" id="close-technology">
      <span class="buttn py-2">
        <div class="close mb-2">
          <svg style="cursor: pointer;" @click="closeSelectTechnologies" xmlns="http://www.w3.org/2000/svg" width="24"
            height="24" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
            <path
              d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
          </svg>
        </div>
      </span>
    </div>
    <h6>Введите название чата</h6>
    <input type="text" v-model="chatTitle" placeholder="Пример: Собеседование на фронтенд разработчика"
      class="form-control mt-3 mb-4" />
    <!-- <h6>Выберите ваш уровень</h6>
    <div class="mt-3 row">
      <div v-for="g in grades" :key="g" class="technology p-2 mb-2 mx-2 col" :class="{ selected: isSelectedGrade(g) }"
        @click="selectGrade(g)">
        {{ g }}
      </div>
    </div> -->
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
          :disabled="selectedTechnologies.length === 0 || !chatTitle"
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
