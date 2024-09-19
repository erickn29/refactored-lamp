<script>

export default {
  data() {
    return {
      technologies: ['HTML', 'CSS', 'JavaScript', 'Vue.js', 'React', 'Angular'],
      selectedTechnologies: []
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
    }
  }
}


</script>

<template>
  <div class="container-fluid p-4" style="border: 1px solid #333; border-radius: 7px;">
    <div class="close pb-2">
      <span class="buttn p-2">
        x
      </span>
    </div>
    <h6>Выберите технологии для интревью</h6>
    <div class="mt-3 row">
      <div v-for="t in technologies" :key="t" class="technology p-2 mb-2 mx-2 col" :class="{ selected: isSelected(t) }"
        @click="selectTechnology(t)">
        {{ t }}
      </div>
    </div>
  </div>
</template>