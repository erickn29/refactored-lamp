import 'bootstrap/dist/css/bootstrap.css';
import './assets/dark.css'
import { createRouter, createWebHistory } from 'vue-router'
import { createApp } from 'vue'
import App from './App.vue'
import store from "@/store";
import VacancyList from './components/vacancy/VacancyList.vue'
import Chat from "./components/interview/Chat.vue"
import Registration from './components/Registration.vue'
import Login from './components/Login.vue'
import ChatWindow from './components/interview/ChatWindow.vue'

const router = createRouter({
  routes: [
    {
      path: '/',
      component: VacancyList,
    },
    {
      path: '/interview',
      component: Chat,
      children: [
        {
          path: "/chat/:id",
          component: ChatWindow,
        }
      ],
    },
    {
      path: '/registration',
      component: Registration,
    },
    {
      path: '/login',
      component: Login,
    },
  ],
  history: createWebHistory(),
  scrollBehavior() { },
  autoResetScroll: true,
})

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')

export default {
  $router: router,
};
