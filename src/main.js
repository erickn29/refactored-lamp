import 'bootstrap/dist/css/bootstrap.css';
import './assets/dark.css'
import { createRouter, createWebHistory } from 'vue-router'
import { createApp } from 'vue'
import App from './App.vue'
import store from "@/store";
import VacancyList from './components/vacancy/VacancyList.vue'
import Chat from "./components/page/Chat.vue"
import Registration from './components/auth/Registration.vue'
import Login from './components/auth/Login.vue'
import ChatWindow from './components/interview/ChatWindow.vue'
import About from './components/page/About.vue';
import VerifyEmail from './components/auth/VerifyEmail.vue';
import Placeholder from './components/page/Placeholder.vue';
import User from './components/page/User.vue';

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
      component: User,
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
