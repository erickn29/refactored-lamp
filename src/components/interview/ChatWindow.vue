<script>
import SelectTechnology from './AddChat.vue';


export default {
  data () {
    return {
      showTechnologies: true,
    }
  },
  components: {
    SelectTechnology,
  },
}
</script>

<template>
  <div class="container">
    <h6>{{ $store.state.currentChat.title }}</h6>
    <div class="chat p-4 mt-4">

    </div>
  </div>
</template>