import { createStore } from 'vuex';


const store = createStore({
  state() {
    return {
      user: {},
      showTechnologies: false,
      userChats: []
    }
  },
  mutations: {

  }
})

export default store
