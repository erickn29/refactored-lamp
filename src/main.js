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
import About from './components/About.vue';
import VerifyEmail from './components/VerifyEmail.vue';
import Placeholder from './components/Placeholder.vue';
import UserRetrive from './components/UserRetrive.vue';

const router = createRouter({
  routes: [
    {
      path: '/',
      component: About,
      meta: { transition: 'fade' },
    },
    {
      path: '/progress',
      component: Placeholder,
      meta: { transition: 'fade' },
    },
    {
      path: '/questions',
      component: Placeholder,
      meta: { transition: 'fade' },
    },
    {
      path: '/verify-email/:token',
      component: VerifyEmail,
      meta: { transition: 'fade' },
    },
    {
      path: '/me',
      component: UserRetrive,
      meta: { transition: 'fade' },
    },
    {
      path: '/interview',
      component: Chat,
      meta: { transition: 'fade' },
      children: [
        {
          path: "/chat/:id",
          component: ChatWindow,
          meta: { transition: 'fade' },
        }
      ],
    },
    {
      path: '/registration',
      component: Registration,
      meta: { transition: 'fade' },
    },
    {
      path: '/login',
      component: Login,
      meta: { transition: 'slide-left' },
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
