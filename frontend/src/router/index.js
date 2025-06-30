import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import SleepDetails from '../pages/SleepDetails.vue'
import ActivityDetails from "@/pages/ActivityDetails.vue";
import Mood from "@/pages/Mood.vue";

const routes = [
    { path: '/',      name: 'Home',  component: HomePage },
    { path: '/sleep', name: 'Sleep', component: SleepDetails },
    { path: '/activity', name: 'Activity', component: ActivityDetails },
    { path: '/mood', name: 'Mood', component: Mood },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
