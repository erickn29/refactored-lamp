import { createStore } from 'vuex';


const store = createStore({
  state() {
    return {
      user: {},
      showTechnologies: false,
      userChats: [],
      currentChat: null,
      showLeftSlider: false,
      // lastQuestion: null,
      // isUserMessage: null,
    }
  },
  mutations: {

  }
})

export default store
