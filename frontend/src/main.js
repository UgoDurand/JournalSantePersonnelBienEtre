// src/main.js
import './style.css'    // <— ici on importe ton CSS Tailwind global
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App)
    .use(router)
    .mount('#app')
