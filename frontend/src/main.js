// src/main.js
import './style.css'    // <— ici on importe ton CSS Tailwind global
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { AuthPlugin } from '@/services/auth'

createApp(App)
    .use(router)
    .use(AuthPlugin)
    .mount('#app')
