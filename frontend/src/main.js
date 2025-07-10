// src/main.js
import './style.css'    // <— ici on importe ton CSS Tailwind global
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import { authService } from '@/services/auth'

const app = createApp(App)
app.use(router)
app.use(Toast)

// Rendre authService accessible depuis la console pour le debug
if (process.env.NODE_ENV === 'development') {
  window.authService = authService
  console.log('🛠️ AuthService disponible via window.authService pour le debug')
}

app.mount('#app')
