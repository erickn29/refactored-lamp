<script>

export default {
  data() {
    return {
      technologies: ['HTML', 'CSS', 'JavaScript', 'Vue.js', 'React', 'Angular'],
      selectedTechnologies: [],
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
    isSelected(technology) {
      return this.selectedTechnologies.includes(technology);
    },
    closeSelectTechnologies() {
      this.$store.state.showTechnologies = false;
    },
    async createChat() {
      let data = {
        "user_id": null,
        "title": this.chatTitle,
        "config": {
          "technologies": [
            {
              "technology": "string",
              "complexity": "string"
            }
          ]
        }
      }
      const response = await request(
        "post",
        "/interview/chat/",
        {

        },
        { "Authorization": `Bearer ${localStorage.getItem("access_token")}` },
        {},
      )
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
    <input 
      type="text" 
      v-model="chatTitle" 
      placeholder="Пример: Собеседование на фронтенд разработчика" 
      class="form-control mt-3 mb-4" 
    />
    <h6>Выберите технологии для интревью</h6>
    <div class="mt-3 row">
      <div v-for="t in technologies" :key="t" class="technology p-2 mb-2 mx-2 col" :class="{ selected: isSelected(t) }"
        @click="selectTechnology(t)">
        {{ t }}
      </div>
    </div>
    <div class="d-flex mt-4">
      <button 
        class="btn btn-success p-2 mx-auto" 
        :disabled="selectedTechnologies.length === 0 || !chatTitle" 
        @click="createChat"
      >
        создать чат
      </button>
    </div>
  </div>
</template>