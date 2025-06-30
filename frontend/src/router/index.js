import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import SleepDetails from '../pages/SleepDetails.vue'
import ActivityDetails from "@/pages/ActivityDetails.vue";
import Mood from "@/pages/Mood.vue";
import DietDetails from "@/pages/DietDetails.vue";
import Login from "@/pages/Login.vue";
import CallbackHandler from "@/pages/CallbackHandler.vue";
import { authService } from '@/services/auth'

const routes = [
    { 
        path: '/login', 
        name: 'Login', 
        component: Login,
        meta: { requiresGuest: true }
    },
    {
        path: '/oauth2/redirect',
        name: 'OAuthCallback',
        component: CallbackHandler,
        meta: { allowPublic: true } // Accessible même sans authentification
    },
    { 
        path: '/', 
        name: 'Home', 
        component: HomePage,
        meta: { requiresAuth: true }
    },
    { 
        path: '/sleep', 
        name: 'Sleep', 
        component: SleepDetails,
        meta: { requiresAuth: true }
    },
    { 
        path: '/activity', 
        name: 'Activity', 
        component: ActivityDetails,
        meta: { requiresAuth: true }
    },
    { 
        path: '/mood', 
        name: 'Mood', 
        component: Mood,
        meta: { requiresAuth: true }
    },
    { 
        path: '/diet', 
        name: 'Diet', 
        component: DietDetails,
        meta: { requiresAuth: true }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// Système anti-boucle simplifié
let lastRedirect = null
let redirectCount = 0
const MAX_REDIRECTS = 3

router.beforeEach((to, from, next) => {
    console.log(`Navigation: ${from.name || 'null'} -> ${to.name}`)
    
    // Laisser passer les callbacks OAuth2 sans vérification d'auth
    if (to.meta.allowPublic) {
        console.log('Route publique autorisée')
        next()
        return
    }
    
    // Protection anti-boucle : si même redirection répétée
    const currentRedirect = `${from.name}_to_${to.name}`
    if (lastRedirect === currentRedirect) {
        redirectCount++
        if (redirectCount >= MAX_REDIRECTS) {
            console.warn('BOUCLE DÉTECTÉE - Arrêt des redirections automatiques')
            redirectCount = 0
            lastRedirect = null
            next(false) // Stopper la navigation
            return
        }
    } else {
        redirectCount = 0
        lastRedirect = currentRedirect
    }
    
    const isAuthenticated = authService.isAuthenticated()
    console.log(`Authentifié: ${isAuthenticated}`)
    
    // Si route protégée et pas authentifié
    if (to.meta.requiresAuth && !isAuthenticated) {
        console.log('Redirection vers login (route protégée)')
        next('/login')
        return
    }
    
    // Si page login et déjà authentifié
    if (to.meta.requiresGuest && isAuthenticated) {
        console.log('Redirection vers home (déjà authentifié)')
        next('/')
        return
    }
    
    // Navigation normale
    redirectCount = 0
    lastRedirect = null
    next()
})

export default router
