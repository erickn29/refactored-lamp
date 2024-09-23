import { createStore } from 'vuex';


const store = createStore({
  state() {
    return {
      user: {},
      showTechnologies: false,
      userChats: [],
      currentChat: null,
    }
  },
  mutations: {

  }
})

export default store
