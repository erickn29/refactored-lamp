// import './assets/main.css'
import { createRouter, createWebHistory } from 'vue-router'
import { createApp } from 'vue'
import App from './App.vue'
import VacancyList from './components/vacancy/VacancyList.vue'
import Interview from "./components/interview/Chat.vue"

import 'bootstrap/dist/css/bootstrap.css';

const router = createRouter({
    routes: [
        {
            path: '/',
            component: VacancyList,
        },
        {
            path: '/interview',
            component: Interview,
            // children: [
            //     {
            //         path: "/chat", 
            //         component: Chat,
            //     }
            // ],
        },
    ],
    history: createWebHistory()
})

const app = createApp(App)
app.use(router)
app.mount('#app')
